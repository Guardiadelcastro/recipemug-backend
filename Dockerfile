FROM node:11-slim

# create app directory in container
RUN mkdir -p /api

# set /api directory as default working directory
WORKDIR /api

# copy package*.json (wildcard) to WORKDIR
COPY package*.json ./

RUN npm install --quiet

# copy all files to WORKDIR
COPY . ./

EXPOSE 3000

CMD [ "npm", "start" ]