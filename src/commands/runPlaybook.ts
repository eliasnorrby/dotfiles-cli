import execa from 'execa'
import ora from 'ora'
import Settings from '../settings/iSettings'
import { log } from '@eliasnorrby/log-util'
import { selectTopics, cleanSelected, readTopicConfig, readConfig } from '../io'
import { buildTags, addSudo } from '../util/ansibleTags'
import { pacmanEntry } from '../constants/flagToTagMap'

export default async function runPlaybook(settings: Settings, argv: any) {
  const { provisionDir, deployScript } = settings
  let ansibleTags = buildTags(argv.operations)
  if (pacmanWillBeCalled(argv)) argv.become = true
  let ansibleFlags = ''
  if (argv.become) {
    argv.verbose = true
    ansibleFlags = ' --ask-become-pass'
    ansibleTags = addSudo(ansibleTags)
  }
  ansibleFlags += ` --extra-vars \"{is_interactive: ${
    argv.verbose ? 'yes' : 'no'
  }}\"`
  !argv.quiet && warnIfSudoNeeded(settings, argv)
  const command =
    deployScript +
    (ansibleTags ? ` --tags '${ansibleTags}'` : '') +
    ansibleFlags
  if (argv.topic) {
    log.info(`Deploying topic(s): ${argv.topic}`)
    selectTopics(settings, argv, argv.topic)
  }
  const cleanup = () => {
    if (argv.topic) {
      !argv.quiet && log.info('Cleaning up')
      cleanSelected(settings, argv.quiet)
    }
  }
  const spinner = ora({
    text: 'Running playbook...',
    spinner: 'pipe',
    color: 'yellow',
    prefixText: ' •••• ',
  })
  !argv.verbose && spinner.start()
  try {
    const res = await execa.command(command, {
      stdio: argv.verbose ? 'inherit' : 'pipe',
      cwd: provisionDir,
      shell: true,
    })
    !argv.verbose && spinner.succeed('Playbook run succeeded')
    !argv.verbose && printSummary(res.stdout)
    cleanup()
    log.ok('Done! ✨')
  } catch (err) {
    !argv.verbose && console.log(err.stdout)
    !argv.verbose && spinner.fail('Playbook run failed')
    cleanup()
    log.fail(
      'The playbook did not run successfully. Check the output above for details.'
    )
  }
}

function pacmanWillBeCalled(argv: any) {
  return (
    argv.operations?.includes(pacmanEntry.flag) ||
    argv.operations?.includes(pacmanEntry.shortflag)
  )
}

export function formatChangelist(line: string) {
  const changes: { key: string; value: string }[] = line
    .split(':')[1]
    .trim()
    .split(/ +/)
    .map((item) => item.split('='))
    .map((keyvalue) => ({ key: keyvalue[0], value: keyvalue[1] }))
  let changelist = ''
  changes.forEach((kv, idx) => {
    changelist +=
      kv.key.toUpperCase() +
      ': ' +
      kv.value +
      (idx < changes.length - 1 ? ', ' : '')
  })
  return changelist
}

export function findPlayRecap(lines: string[]) {
  const range = 15
  const subset = lines.slice(lines.length - range)
  const recap = subset.find((l) => l.includes('PLAY RECAP'))
  if (!recap) return undefined
  const index = subset.indexOf(recap) + 1 + (lines.length - range)
  return lines[index]
}

function simpleSummary(lines: string[]) {
  const summary = lines.slice(lines.length - 4).join('\n')
  log.info('Summary')
  console.log(summary)
}

export function printSummary(stdout: string) {
  if (!stdout) return
  const lines = stdout.split('\n')
  const line = findPlayRecap(lines)
  if (!line) {
    log.warn('Could not find PLAY RECAP, printing simple summary')
    simpleSummary(lines)
    return
  }
  try {
    const changelist = formatChangelist(line)
    log.info(changelist)
  } catch (err) {
    console.log(err)
    log.warn('Could not print summary, falling back to simpler method')
    simpleSummary(lines)
  }
}

function warnIfSudoNeeded(settings: Settings, argv: any) {
  let warningWasRaised = false
  if (argv.topic) {
    warningWasRaised = checkSelectedTopics(settings, argv.topic)
  } else {
    warningWasRaised = checkAllTopics(settings, argv)
  }
  if (warningWasRaised && !argv.verbose) {
    log.warn('Tasks requiring sudo may be ignored during this run')
    log.warn(
      'Run the command again with the -b or -v flag to be prompted for your password'
    )
  }
}

function printSudoWarningFor(topicName: string) {
  log.warn(`Topic ${topicName} may require sudo`)
}

function checkSelectedTopics(settings: Settings, topicPaths: string) {
  let warningWasRaised = false
  const pathList = topicPaths.split(',')
  for (const topicPath of pathList) {
    const topicConfig = readTopicConfig(settings, topicPath)
    if (topicConfig.become) {
      printSudoWarningFor(topicPath)
      warningWasRaised = true
    }
  }
  return warningWasRaised
}

function checkAllTopics(settings: Settings, argv: any) {
  let warningWasRaised = false
  const topicGroups = readConfig(settings, argv)
  const groups = Object.keys(topicGroups)
  groups.forEach((group) =>
    topicGroups[group].forEach((topic) => {
      const topicPath = `${group}/${topic.name}`
      const topicConfig = readTopicConfig(settings, topicPath)
      if (topicConfig.become) {
        printSudoWarningFor(topicPath)
        warningWasRaised = true
      }
    })
  )
  return warningWasRaised
}
