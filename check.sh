#/usr/bin/env bash

set -e
set -x

cd "$(dirname "$0")"
node ./searchbot.js
