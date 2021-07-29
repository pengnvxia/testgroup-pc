#!/bin/bash

#删除存活的镜像
docker rm -f `docker ps -a |grep testgroup-pc|awk '{print $1}'`
time=`date +%F-%H-%M-%S`

#进入命令构建镜像
cd /testgroup-pc
docker build -t testgroup-pc:$time ./

#启动镜像
docker run -d -p 18080:18080 -v /etc/localtime:/etc/localtime:ro -v /web/testgroup-pc/log:/opt/openresty/nginx/logs -m 512M testgroup-pc:$time

#删除文件内容
rm -rf /testgroup-pc/*
