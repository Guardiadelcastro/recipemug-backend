#!/bin/bash
set -xe

if [ $TRAVIS_BRANCH == 'master' ] ; then

rm -rf .vscode docs node_modules
rsync -rauz * $REMOTE_USER@$REMOTE_HOST:$REMOTE_PROD_DIR

ssh $REMOTE_USER@$REMOTE_HOST 'bash -s' < ./.scripts/start.sh

else
  echo "Not deploying, since this branch isn't master."

fi

set -x
