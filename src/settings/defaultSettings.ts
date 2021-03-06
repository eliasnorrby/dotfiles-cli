import path from 'path'
import os from 'os'
import Settings from './iSettings'

export const defaultSettings: Settings = {
  dotfiles: path.resolve(os.homedir(), '.dotfiles'),
  rootfile: 'macos.config.yml',
  tempfile: 'root.config.temp.yml',
  playbook: 'playbook.yml',
  provisionDir: path.resolve(os.homedir(), '.dotfiles', '_provision'),
  deployScript: './run-playbook.zsh',
  updateScript: './update-all.zsh',
  // updateScript: "./sleep-3.zsh",
  // deployScript: "./sleep-3.zsh",
}
