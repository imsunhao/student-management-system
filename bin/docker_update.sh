#!/bin/bash
echo '---------- docker container update -------------'

echo '-----------------------'
container='student-management-system_mongo_1'
echo "update $container"

docker cp ./mongodb/mongod.conf /etc/
docker cp ./mongodb/initdb.d/ /docker-entrypoint-initdb.d/

docker container restart $container
echo "success"

echo '-----------------------'
container='student-management-system_web-steps_1'
echo "update $container"
workdir='/student-management-system'

workspace="$container:$workdir"

docker cp ./docker-bin/ $workspace/docker-bin/
docker cp ./dist $workspace/
docker cp ./src/index.template.html $workspace/src/
docker cp ./package*.json $workspace/
docker cp ./yarn.lock $workspace/
docker cp ./mongodb/mongo.env $workspace/mongodb/

docker exec -t $container /bin/sh $workdir/docker-bin/yarn_install.sh
docker container restart $container
echo "success"
