#!/bin/bash
echo '---------- docker container update -------------'

echo '-----------------------'
container='student-management-system_mongo_1'
echo "update $container"

workspace="$container:"

docker cp ./mongodb/mongod.conf $workspace/etc/
docker cp ./mongodb/initdb.d/* $workspace/docker-entrypoint-initdb.d/

docker container restart $container
echo "success"

echo '-----------------------'
container='student-management-system_web-steps_1'
echo "update $container"
workdir='/student-management-system'

workspace="$container:$workdir"

docker cp ./docker-bin $workspace/
docker cp ./dist $workspace/
docker cp ./src/index.template.html $workspace/src/
docker cp ./package*.json $workspace/
docker cp ./mongodb/mongo.env $workspace/mongodb/

docker container restart $container
echo "success"
