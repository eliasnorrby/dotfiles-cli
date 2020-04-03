import fs from 'fs'
import { mocked } from 'ts-jest/utils'
import loadSettings from './loadSettings'
import requireFile from './requireFile'
import { defaultSettings } from './defaultSettings'
jest.mock('./requireFile')

describe('loadSettings', () => {
  it('should return a config', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true)
    mocked(requireFile).mockReturnValueOnce({ playbook: 'Hello World!' })

    const settings = loadSettings(['mock-location'])
    expect(settings).toBeDefined()
    expect(settings.playbook).toBe('Hello World!')
  })

  it('should use default settings if no file is found', () => {
    const settings = loadSettings(['one location', 'another'])
    expect(settings).toBeDefined()
    expect(settings).toEqual(defaultSettings)
  })

  it('should overwrite only specified settings', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true)
    mocked(requireFile).mockReturnValueOnce({ playbook: 'Hello World!' })

    const settings = loadSettings(['one location', 'another'])
    expect(settings).toBeDefined()
    expect(settings).toEqual({ ...defaultSettings, playbook: 'Hello World!' })
  })
})
