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
  })
  !argv.verbose && spinner.start()
  try {
    const res = await execa.command(command, {
      stdio: argv.verbose ? 'inherit' : 'pipe',
      cwd: provisionDir,
      shell: true,
    })
    !argv.verbose && spinner.succeed('Playbook run succeeded')
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
