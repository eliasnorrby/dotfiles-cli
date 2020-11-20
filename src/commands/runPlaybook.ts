import execa from 'execa'
import ora from 'ora'
import Settings from '../settings/iSettings'
import { log } from '@eliasnorrby/log-util'
import { selectTopics, cleanSelected } from '../io'
import { buildTags } from '../util/ansibleTags'

export default async function runPlaybook(settings: Settings, argv: any) {
  const { provisionDir, deployScript } = settings
  let ansibleTags = buildTags(argv.operations)
  let ansibleFlags = argv.become ? ' --ask-become-pass' : ''
  if (argv.become) argv.verbose = true
  ansibleFlags += ` --extra-vars \"{is_interactive: ${
    argv.verbose ? 'yes' : 'no'
  }}\"`
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
      log.info('Cleaning up')
      cleanSelected(settings)
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
