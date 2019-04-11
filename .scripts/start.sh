#!/usr/bin/env sh
set -x

cd /var/backend/express-api
npm i
npm add .
npm commit -m 'deploy'
docker stop api-recipes
docker-compose up
