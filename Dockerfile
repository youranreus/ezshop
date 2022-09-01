FROM node:16-alpine

# 容器中应用程序的路径。将Web目录作为工作目录
WORKDIR /work

# 将package.json 复制到 Docker 环境
COPY ./package.json /work/package.json
COPY ./build.sh /build.sh

# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org
RUN rm /work/package.json && rm /work/package-lock.json

CMD ["sleep", "infinity"]