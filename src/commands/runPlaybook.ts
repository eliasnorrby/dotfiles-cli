import execa from 'execa'
import ora from 'ora'
import Settings from '../settings/iSettings'
import { log } from '@eliasnorrby/log-util'
import { selectTopics, cleanSelected, readTopicConfig, readConfig } from '../io'
import { buildTags } from '../util/ansibleTags'

export default async function runPlaybook(settings: Settings, argv: any) {
  const { provisionDir, deployScript } = settings
  let ansibleTags = buildTags(argv.operations)
  let ansibleFlags = argv.become ? ' --ask-become-pass' : ''
  if (argv.become) argv.verbose = true
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

function printSummary(stdout: string) {
  if (!stdout) return
  const lines = stdout.split('\n')
  try {
    const changes: { key: string; value: string }[] = lines[lines.length - 3]
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
    log.info(changelist)
  } catch (err) {
    console.log(err)
    log.warn('Could not print summary falling back to simpler method')
    const summary = lines.slice(lines.length - 4).join('\n')
    log.info('Summary')
    console.log(summary)
  }
}

function warnIfSudoNeeded(settings: Settings, argv: any) {
  let warningWasRaised = false
  if (argv.topics) {
    warningWasRaised = checkSelectedTopics(settings, argv.topics)
  } else {
    warningWasRaised = checkAllTopics(settings, argv)
  }
  if (warningWasRaised) {
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
