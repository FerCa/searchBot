#/usr/bin/env bash

set -e
set -x

istanbul cover _mocha -- -R spec --ui tdd && cat ./coverage/lcov.info | ./node_modules/.bin/codecov