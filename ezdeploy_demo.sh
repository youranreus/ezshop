tmpPath=/data/script/ezshop_demo_tmp
deployPath=/data/wwwroot/default

echo "-------创建临时文件夹-------"
sudo mkdir -p ${tmpPath}
cd ${tmpPath}

echo "-------拉取最新源码-------"

sudo git clone https://ghproxy.com/https://github.com/youranreus/ezshop

echo "-------开始构建-------"

sudo docker container run -it --rm -e REACT_APP_API=http://10.108.2.168:50070 -v ${tmpPath}/ezshop:/data youranreus/ezdeploy:v3 /bin/sh -c "/bin/sh /build.sh"

echo "-------部署-------"

sudo rm -rf ${deployPath}/static
sudo mv ${tmpPath}/ezshop/build/* ${deployPath}
sudo rm -rf ${tmpPath}

echo "-------部署完成-------"