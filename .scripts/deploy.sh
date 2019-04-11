#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then

mkdir deploy
cp -R * deploy/
cd deploy
rm -rf .vscode docs node_modules
tar -czf package.tgz deploy
scp package.tgz $REMOTE_USER@$REMOTE_HOST:$REMOTE_PROD_DIR

ssh $REMOTE_USER@$REMOTE_HOST 'bash -s' < ./.scripts/start.sh

else
  echo "Not deploying, since this branch isn't master."

fi

set -x
