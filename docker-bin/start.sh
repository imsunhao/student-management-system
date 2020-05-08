#!/bin/bash

workdir='/student-management-system'

cd $workdir

yarn install --prod --registry=https://registry.npm.taobao.org

rgs=("$@")
cmd=$(echo ${rgs[@]})

node node_modules/@web-steps/cli/bin/web-steps start $cmd
