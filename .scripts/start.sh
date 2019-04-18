#!/usr/bin/env sh
set -x

cd /var/backend/express-api
npm i
pm2 stop all
npm run prod
