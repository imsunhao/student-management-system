#!/bin/bash

tag=$1

workdir='/workspace/student-management-system'

cd $workdir

cross-env DOCKER_TAG=$tag docker-compose pull
cross-env DOCKER_TAG=$tag docker-compose restart
