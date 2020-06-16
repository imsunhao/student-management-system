#!/bin/bash

tag=$1

workdir='/workspace/student-management-system'

cd $workdir

export DOCKER_TAG=$tag

docker-compose pull
docker-compose stop
docker-compose rm -f
docker-compose -f docker-compose.yml up -d
