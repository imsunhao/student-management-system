#!/bin/bash
# 此脚本会被 web-steps release 调用

tag=$1
workdir='/workspace/student-management-system'
workspace="root@aliyun:$workdir"

git add *

git commit -m "release:$tag"

git tag $tag

git push origin master
git push origin refs/tags/$tag

echo "同步配置文件"
rsync -r ./docker-compose.yml $workspace/
rsync -r ./Dockerfile-project $workspace/
rsync -r ./.dockerignore $workspace/
rsync -r ./package.json $workspace/
rsync -r ./production.manifest.json $workspace/
rsync -r ./bin $workspace/
rsync -r ./docker-bin $workspace/
rsync -r ./mongodb/initdb.d $workspace/mongodb/
rsync -r ./mongodb/mongo.env $workspace/mongodb/
rsync -r ./mongodb/mongod.conf $workspace/mongodb/
rsync -r ./mongodb/Dockerfile-mongo $workspace/mongodb/

echo "运行远程重启服务脚本"
restart_script_path="$workdir/bin/restart.sh"

ssh root@aliyun -t "$restart_script_path"

npx ts-node ./scripts/dingding.ts --version=$tag