FROM node:14.17.4
WORKDIR /usr/src/app
# ToDo:パス検討
#COPY ["./teamx/package.json", "./teamx/yarn.lock", "./"]
RUN yarn install
COPY ./teamx .
ENTRYPOINT [ "yarn", "start" ]