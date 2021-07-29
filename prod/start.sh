#!/bin/bash

#删除存活的镜像
docker rm -f `docker ps -a |grep testgroup-pc|awk '{print $1}'`
time=`date +%F-%H-%M-%S`

#进入命令构建镜像
cd /testgroup-pc
docker build -t testgroup-pc:$time ./

#启动镜像
docker run -d -p 80:80 -v /etc/localtime:/etc/localtime:ro -v /web/studycenter/log:/opt/openresty/nginx/logs testgroup-pc:$time

#删除目录内容
rm -rf /testgroup-pc/*
