#!/usr/bin/env zsh

# echo $DOTFILES
# source $(cd ${${(%):-%x}:A:h} && pwd -P)/env

cd $DOTFILES/_provision

ANSIBLE_STDOUT_CALLBACK=dense ansible-playbook playbook.yml "$@"
