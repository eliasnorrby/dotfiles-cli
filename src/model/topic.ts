export interface Topic {
  name: string
  state: 'present' | 'disabled' | 'absent'
  config: string | TopicConfig
}

export interface TopicGroupList {
  [group: string]: Topic[]
}

export interface TopicConfig {
  path: string
  links?: Link[]
  become?: boolean
  brew_formulas: string[]
  brew_casks: string[]
  brew_taps: string[]
  pacman_packages: string[]
  osx_defaults: string[]
  npm_packages: string[]
  pip_packages: string[]
  gem_packages: string[]
  mas_apps: string[]
}

export type Link = string | LinkObject

export interface LinkObject {
  src: string
  dest?: string
  rename?: string
}
