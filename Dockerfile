FROM node:10

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm install --quiet

# copy all file from current dir to /app in container
COPY . /app/

EXPOSE 3000 
EXPOSE 27017


