import { tagsFromFlags, addSudo } from './ansibleTags'

const ONE_FLAG = 'homebrew'

const TWO_FLAGS = 'apps,packages'

const DUPLICATE_FLAGS = 'apps,packages,apps'

const SHORT_FLAGS = 'a,p'

const SHORT_AND_LONG_FLAGS = 'a,p,apps'

const INVALID_FLAG = 'apps,packages,imnnotavalidflag'

const EMPTY_FLAG = ''

describe('tagsFromFlags', () => {
  it('should handle a single flag', () => {
    const expected = 'do_homebrew'
    expect(tagsFromFlags(ONE_FLAG)).toBe(expected)
  })

  it('should handle two flags', () => {
    const expected = 'do_mas,do_packages'
    expect(tagsFromFlags(TWO_FLAGS)).toBe(expected)
  })

  it('should handle duplicate flags', () => {
    const expected = 'do_mas,do_packages'
    expect(tagsFromFlags(DUPLICATE_FLAGS)).toBe(expected)
  })

  it('should handle short flags', () => {
    const expected = 'do_mas,do_packages'
    expect(tagsFromFlags(SHORT_FLAGS)).toBe(expected)
  })

  it('should handle short and long flags', () => {
    const expected = 'do_mas,do_packages'
    expect(tagsFromFlags(SHORT_AND_LONG_FLAGS)).toBe(expected)
  })

  it('should handle invalid flags', () => {
    const expected = 'do_mas,do_packages'
    expect(tagsFromFlags(INVALID_FLAG)).toBe(expected)
  })

  it('should handle empty flags', () => {
    const expected = ''
    expect(tagsFromFlags(EMPTY_FLAG)).toBe(expected)
  })
})

describe('addSudo', () => {
  it('should handle empty tags', () => {
    const expected = 'all,sudo_enabled'
    expect(addSudo(null)).toBe(expected)
  })

  it('should handle existing tags', () => {
    const expected = 'all,do_homebrew,sudo_enabled'
    expect(addSudo('all,do_homebrew')).toBe(expected)
  })
})
