#!/bin/bash

workdir='/workspace/student-management-system'
manifest='./production.manifest.json'

cd $workdir

echo "下载文件 --download-manifest-path=$manifest"
download=$(node node_modules/@web-steps/cli/bin/web-steps download --download-manifest-path=$manifest)
echo "download 结果: $download"

echo "docker 重启"

$workdir/bin/docker_update.sh
