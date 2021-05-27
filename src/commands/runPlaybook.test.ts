import { printSummary, findPlayRecap } from './runPlaybook'
import { log } from '@eliasnorrby/log-util'

const linesWithPlayAtMinus3 = [
  ...new Array(100).map(() => ''),
  'PLAY RECAP ************',
  'localhost                  : ok=204  changed=0    unreachable=0    failed=0    skipped=82   rescued=0    ignored=0',
  '',
].join('\n')

const linesWithPlayAtMinus4 = [linesWithPlayAtMinus3, ''].join('\n')

const correctSummary =
  'OK: 204, CHANGED: 0, UNREACHABLE: 0, FAILED: 0, SKIPPED: 82, RESCUED: 0, IGNORED: 0'

beforeEach(() => {
  jest.clearAllMocks()
  log.warn = jest.fn()
  log.info = jest.fn()
  console.log = jest.fn()
})

describe('findPlayRecap', () => {
  it('should find matching line', () => {
    const line = findPlayRecap(linesWithPlayAtMinus3.split('\n'))
    expect(line).toContain('ok=204')
  })
})

describe('printSummary', () => {
  it('should warn when play recap is not found', () => {
    const lines = ['Summary', 'without', 'any', 'mention', 'of recap'].join(
      '\n'
    )
    printSummary(lines)
    expect(log.warn).toHaveBeenCalledWith(
      'Could not find PLAY RECAP, printing simple summary'
    )
  })

  it('should find play recap at minus 3', () => {
    printSummary(linesWithPlayAtMinus3)

    expect(log.warn).not.toHaveBeenCalled()
    expect(log.info).toHaveBeenCalledWith(correctSummary)
  })

  it('should find play recap at minus 4', () => {
    printSummary(linesWithPlayAtMinus4)

    expect(log.warn).not.toHaveBeenCalled()
    expect(log.info).toHaveBeenCalledWith(correctSummary)
  })
})
