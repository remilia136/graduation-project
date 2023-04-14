# graduation-project
## 1.docker安装

```
curl -fsSL https://test.docker.com -o test-docker.sh
sudo sh test-docker.sh
```



## 2.docker启动SRS

```
docker run --rm -it -p 1935:1935 -p 1985:1985 -p 8080:8080 \
    registry.cn-hangzhou.aliyuncs.com/ossrs/srs:4 ./objs/srs -c conf/docker.conf
```

nginx安装

```
apt-get install nginx   #安装

nginx -v  #查看安装版本
启动: 直接使用命令: nginx

nginx


关闭1: 快速停止

nginx -s stop


关闭2: 完整有序停止

nginx -s quit


重启: 如下

nginx -s reload
```

