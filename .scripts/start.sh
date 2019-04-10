#!/usr/bin/env sh
set -x

cd /var/backend
rm -rf recipemug-backend/* recipemug-backend/.*
tar zxvf package.tgz -C .
mv deploy/* recipemug-backend/
cd recipemug-backend
npm i
docker stop api-recipes
docker-compose up

rm -rf package.tgz deploy