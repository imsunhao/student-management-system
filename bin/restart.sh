#!/bin/bash

tag=$1

workdir='/workspace/student-management-system'

cd $workdir

docker-compose pull
docker-compose restart
