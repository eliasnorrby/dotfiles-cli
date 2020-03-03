[![Travis][travis-badge]][travis-link]
[![npm][npm-badge]][npm-link]
[![Dependabot Status][dependabot-badge]][dependabot-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]

# dotfiles-cli

CLI for [my dotfiles][dotfiles-link].

## Installation

```bash
npm install -g @eliasnorrby/dotfiles-cli
```

The CLI is available under the name `boom` :boom:. It's just a placeholder for
now. Hello there, [doom](doom-link). :wave:

## Commands

### `list`

List available topics and their states.

### `enable <topic>`

Enable a topic (i.e. set its state to `present` in `.dotfiles/root.config.yml`).

### `disable <topic>`

Disable a topic (i.e. set its state to `disabled` in `.dotfiles/root.config.yml`).

### `remove <topic>`

Remove a topic (i.e. set its state to `absent` in `.dotfiles/root.config.yml`).

### `update [-v]`

Run the configured update script (eg. for `zplug`, `vim-plug`, `brew`),
optionally with verbose output.

### `deploy [-v] [-t topic(s)]`

Run the configured ansible playbook to deploy the dotfile configuration,
optionally with verbose output.

Use the `-t` (`--topic`) flag to limit which topics to deploy. Pass a single
topic name or a comma separated list:

``` bash
# Single topic deployment
boom deploy -t shell/zsh

# Multiple topic deployment
boom deploy -t shell/zsh,shell/git,editor/vscode
```

[travis-badge]: https://img.shields.io/travis/com/eliasnorrby/dotfiles-cli?style=flat
[travis-link]: https://travis-ci.com/eliasnorrby/dotfiles-cli
[npm-badge]: https://img.shields.io/npm/v/@eliasnorrby/dotfiles-cli?style=flat
[npm-link]: https://www.npmjs.com/package/@eliasnorrby/dotfiles-cli
[dependabot-badge]: https://api.dependabot.com/badges/status?host=github&repo=eliasnorrby/dotfiles-cli
[dependabot-link]: https://dependabot.com
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-link]: https://github.com/semantic-release/semantic-release
[dotfiles-link]: https://github.com/eliasnorrby/dotfiles
[doom-link]: https://github.com/hlissner/doom-emacs
