## [2.0.12](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.11...v2.0.12) (2020-05-25)


### Bug Fixes

* **deps:** bump execa from 4.0.1 to 4.0.2 ([80dab49](https://github.com/eliasnorrby/dotfiles-cli/commit/80dab4973f378be52c668bcbfbba52f76060c11a))

## [2.0.11](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.10...v2.0.11) (2020-05-11)


### Bug Fixes

* **deps:** bump execa from 4.0.0 to 4.0.1 ([ed077f4](https://github.com/eliasnorrby/dotfiles-cli/commit/ed077f435a9d583856cb83bfcd6dec9106733a95))

## [2.0.10](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.9...v2.0.10) (2020-04-22)


### Bug Fixes

* **deps:** bump ora from 4.0.3 to 4.0.4 ([18eaf33](https://github.com/eliasnorrby/dotfiles-cli/commit/18eaf333ee883b899bda4d0fd627cbf0ba9a9dd2))
* **deps:** bump prettier from 2.0.4 to 2.0.5 ([4d70957](https://github.com/eliasnorrby/dotfiles-cli/commit/4d709578a5704a683b05b4754e0500aeed953def))

## [2.0.9](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.8...v2.0.9) (2020-04-08)


### Bug Fixes

* **deps:** bump @eliasnorrby/log-util from 1.1.1 to 1.1.2 ([7d1b8cc](https://github.com/eliasnorrby/dotfiles-cli/commit/7d1b8cccc6cf4ca8e17191792599fc9f9518de35))

## [2.0.8](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.7...v2.0.8) (2020-04-07)


### Bug Fixes

* **deps:** bump prettier from 2.0.3 to 2.0.4 ([d83d485](https://github.com/eliasnorrby/dotfiles-cli/commit/d83d485af4cc535bf643501f14067e6cd757a3c2))

## [2.0.7](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.6...v2.0.7) (2020-04-06)


### Bug Fixes

* **deps:** bump prettier from 2.0.2 to 2.0.3 ([8cc5482](https://github.com/eliasnorrby/dotfiles-cli/commit/8cc548205eee7c3be0467c6afd7414fc5512f2f5))

## [2.0.6](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.5...v2.0.6) (2020-04-03)


### Bug Fixes

* **deps:** bump chalk from 3.0.0 to 4.0.0 ([6742ae0](https://github.com/eliasnorrby/dotfiles-cli/commit/6742ae0b740c35f50d399e952e3446fd942e4179))

## [2.0.5](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.4...v2.0.5) (2020-04-03)


### Bug Fixes

* npm audit fix ([f7b909a](https://github.com/eliasnorrby/dotfiles-cli/commit/f7b909af41d5b3e24eae521bb662daa97eb1cdfb))

## [2.0.4](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.3...v2.0.4) (2020-04-03)


### Bug Fixes

* **deps:** bump prettier and @eliasnorrby/prettier-config ([485c6e8](https://github.com/eliasnorrby/dotfiles-cli/commit/485c6e80c731ebb0dfbb3626e7aff535242be094))

## [2.0.3](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.2...v2.0.3) (2020-03-17)


### Bug Fixes

* **deps:** bump yargs from 15.3.0 to 15.3.1 ([c45dc37](https://github.com/eliasnorrby/dotfiles-cli/commit/c45dc371e3e27287ef05ad9beab4dba9b1d7f29a))

## [2.0.2](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.1...v2.0.2) (2020-03-13)


### Bug Fixes

* **deps:** bump @eliasnorrby/log-util from 1.1.0 to 1.1.1 ([5d4646c](https://github.com/eliasnorrby/dotfiles-cli/commit/5d4646cffaedbe8aa3f608d7a3023e61c97462b4))
* **deps:** bump yargs from 15.1.0 to 15.3.0 ([fec232e](https://github.com/eliasnorrby/dotfiles-cli/commit/fec232ed1f169f7bb5d996ac26e16ee17540f2f5))

## [2.0.1](https://github.com/eliasnorrby/dotfiles-cli/compare/v2.0.0...v2.0.1) (2020-03-13)


### Bug Fixes

* **deps:** [security] bump acorn from 5.7.3 to 5.7.4 ([18ad087](https://github.com/eliasnorrby/dotfiles-cli/commit/18ad08726f6dbd14316955a89df8301a64baf949))

# [2.0.0](https://github.com/eliasnorrby/dotfiles-cli/compare/v1.3.0...v2.0.0) (2020-03-06)


### Reverts

* remove post operation ([78a9fec](https://github.com/eliasnorrby/dotfiles-cli/commit/78a9fec9b1ea654391ae8be4bc9d5aafc164ff7b))


### BREAKING CHANGES

* removes the 'post' ('pp') flag.

The post_provision ansible tag was removed in
eliasnorrby/dotfiles@22dc142c

# [1.3.0](https://github.com/eliasnorrby/dotfiles-cli/compare/v1.2.0...v1.3.0) (2020-03-05)


### Features

* add 'list-operations' option to deploy ([a98a4d9](https://github.com/eliasnorrby/dotfiles-cli/commit/a98a4d9f4c54aa3e618f63c81e705937ac069f97))
* add 'operations' option to deploy command ([dc48cbc](https://github.com/eliasnorrby/dotfiles-cli/commit/dc48cbce7dd67d160634b93123ccc89c29ee6ba3))
* add tagsFromArgv util ([8c33660](https://github.com/eliasnorrby/dotfiles-cli/commit/8c336600dce0bd38fd27feb126e3fcfd61d5ebce))
* add the describeFlags util ([1230a71](https://github.com/eliasnorrby/dotfiles-cli/commit/1230a7149770a0bd0303a7f1183eea078882c388))

# [1.2.0](https://github.com/eliasnorrby/dotfiles-cli/compare/v1.1.3...v1.2.0) (2020-03-03)


### Bug Fixes

* typos in runUpdate ([bca52c1](https://github.com/eliasnorrby/dotfiles-cli/commit/bca52c1aacff79881511d16d990a8b5723868dc5))


### Features

* **deploy:** add topic flag ([df88386](https://github.com/eliasnorrby/dotfiles-cli/commit/df88386775624f56969d4d31d6261b0e85511700))
* **deploy:** allow selecting multiple targets ([9fa6d10](https://github.com/eliasnorrby/dotfiles-cli/commit/9fa6d10b5d67a9a8ca4b15fd7f1ee04bb31f9b09))

## [1.1.3](https://github.com/eliasnorrby/dotfiles-cli/compare/v1.1.2...v1.1.3) (2020-01-13)


### Bug Fixes

* **deps:** move ts-node to devDependencies ([ff844fa](https://github.com/eliasnorrby/dotfiles-cli/commit/ff844fa8568206d19ca97cacfd5de5a64012c35c)), closes [#28](https://github.com/eliasnorrby/dotfiles-cli/issues/28)

## [1.1.2](https://github.com/eliasnorrby/dotfiles-cli/compare/v1.1.1...v1.1.2) (2020-01-02)


### Bug Fixes

* **deps:** bump yargs from 15.0.2 to 15.1.0 ([a1bb3ef](https://github.com/eliasnorrby/dotfiles-cli/commit/a1bb3ef9371d1986fd6b6013d6613385ef7a0cba))

## [1.1.1](https://github.com/eliasnorrby/dotfiles-cli/compare/v1.1.0...v1.1.1) (2019-12-22)


### Bug Fixes

* **deps:** bump execa from 3.4.0 to 4.0.0 ([839caf6](https://github.com/eliasnorrby/dotfiles-cli/commit/839caf6ab2fc3c6dc5aa72cc276fb3e777d3c2ea))

# [1.1.0](https://github.com/eliasnorrby/dotfiles-cli/compare/v1.0.1...v1.1.0) (2019-12-20)


### Features

* add update command ([f093f36](https://github.com/eliasnorrby/dotfiles-cli/commit/f093f365fe2368af57ec785c61f407729f4c208f))

## [1.0.1](https://github.com/eliasnorrby/dotfiles-cli/compare/v1.0.0...v1.0.1) (2019-12-20)


### Bug Fixes

* publish only lib directory ([1ff58f1](https://github.com/eliasnorrby/dotfiles-cli/commit/1ff58f1cf10b05bc1755fbfce89582128a76a3c5))

# 1.0.0 (2019-12-19)


### Bug Fixes

* add --verbose flag ([6cb901c](https://github.com/eliasnorrby/dotfiles-cli/commit/6cb901c139d328a270191a9668ffbd1f2ad77c6e))
* get deploy command working ([3accf21](https://github.com/eliasnorrby/dotfiles-cli/commit/3accf21e0619fe7536c7f6ed08a9431559ce1234))


### Features

* add configLoader ([5916b92](https://github.com/eliasnorrby/dotfiles-cli/commit/5916b9299cd92284dc6112a12795de8b94b63237))
* add describe command ([7692a65](https://github.com/eliasnorrby/dotfiles-cli/commit/7692a65a7c8f727251e7ea07fecc1738dbe47876))
* add disable and remove commands ([242a7e7](https://github.com/eliasnorrby/dotfiles-cli/commit/242a7e70d15f4db57352a92b5ad2f32c69042920))
* add state types ([49db920](https://github.com/eliasnorrby/dotfiles-cli/commit/49db9209b7c73efe476c4809055df890d431dac5))
* add syntax highlighting to describe output ([a76ded2](https://github.com/eliasnorrby/dotfiles-cli/commit/a76ded25a2a622c63ec7a9fad08fe889e1cc19e0))
* use ora and log-util ([15dd432](https://github.com/eliasnorrby/dotfiles-cli/commit/15dd432a9ed4adff489c5449b893237c861ace8e))
