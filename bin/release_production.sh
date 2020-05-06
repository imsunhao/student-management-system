#!/bin/bash
# 此脚本会被 web-steps release 调用

git add *

# git commit

# restart_script_path='/workspace/student-management-system/scripts/restart.sh'

# ssh root@aliyun -t "$restart_script_path $1 $2"