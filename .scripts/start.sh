#!/usr/bin/env sh
set -x

cd /var/backend/express-api
npm i
docker stop api-recipes mongodb
docker-compose up
