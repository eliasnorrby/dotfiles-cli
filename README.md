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

### `deploy [-vb] [-t <topic(s)>] [-o <operation(s)>]`

Run the configured ansible playbook to deploy the dotfile configuration,
optionally with verbose output.

Use the `-t` (`--topic`) flag to limit which topics to deploy. Pass a single
topic name or a comma separated list:

```bash
# Deploy all topics
boom deploy

# Deploy a single topic
boom deploy -t shell/zsh

# Deploy multiple topics
boom deploy -t shell/zsh,shell/git,editor/vscode

# Deploy with escalated priveleges (tell ansible to prompt for sudo password)
boom deploy -b
```

#### Operations

Deploying a topic completely involves many operations:

1. Ensure configuration files are symlinked
2. Ensure homebrew dependencies are installed
3. Ensure App Store dependencies are installed
4. Ensure npm/pip/gem dependencies are installed
5. Ensure MacOS defaults are applied

The default behaviour of `boom deploy` is to only make sure configuration files
are symlinked. This is the most important part of the underlying playbook, so it
is always run. It is also fast. The other operations are more time consuming.
They can be performed using the `-o` (`--operations`) flag. Pass a single
operation or a comma separated list:

```bash
# Make sure all brew formulae and casks are installed for all topics
boom deploy -o homebrew # (This takes a while)

# Combined with the topic flag
boom deploy -t editor/vscode -o homebrew

# Enable multiple operations
boom deploy -o apps,packages

# Using shorthand notation
boom deploy -t shell/zsh -o h,a,p
```

The available operations can be listed using
`boom deploy --list-operations`.

<details>
  <summary>Available operations</summary>

```
operation: homebrew
shorthand: h
description: install homebrew formulae & casks
```

```
operation: pacman
shorthand: m
description: install packages with pacman
```

```
operation: apps
shorthand: a
description: install app store apps
```

```
operation: packages
shorthand: p
description: install global packages (npm/pip/gem)
```

```
operation: defaults
shorthand: d
description: apply MacOS defaults
```

</details>

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
