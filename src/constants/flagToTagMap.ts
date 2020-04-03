type MapEntry = {
  tag: string
  flag: string
  shortflag: string
  description: string
}

export const flagToTagMap: MapEntry[] = [
  {
    tag: 'do_homebrew',
    flag: 'homebrew',
    shortflag: 'h',
    description: 'install homebrew formulae & casks',
  },
  {
    tag: 'do_mas',
    flag: 'apps',
    shortflag: 'a',
    description: 'install app store apps',
  },
  {
    tag: 'do_packages',
    flag: 'packages',
    shortflag: 'p',
    description: 'install global packages (npm/pip/gem)',
  },
  {
    tag: 'do_defaults',
    flag: 'defaults',
    shortflag: 'd',
    description: 'apply MacOS defaults',
  },
]
