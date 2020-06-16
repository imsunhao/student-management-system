#!/bin/bash
# 此脚本会被 web-steps release 调用

tag=$1
workdir='/workspace/student-management-system'
workspace="root@aliyun:$workdir"

echo "操作 git"
git add *

git commit -m "release:$tag"

git tag $tag

git push origin master
git push origin refs/tags/$tag

echo "同步配置文件"
rsync -r ./docker-compose.yml $workspace/
rsync -r ./bin $workspace/

echo "操作 docker"

cross-env DOCKER_TAG=$tag docker-compose build
cross-env DOCKER_TAG=$tag docker-compose push

echo "运行远程重启服务脚本"
restart_script_path="$workdir/bin/restart.sh"
ssh root@aliyun -t "$restart_script_path $tag"

npx ts-node ./scripts/dingding.ts --version=$tag