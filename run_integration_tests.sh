#/usr/bin/env bash

set -e
set -x

mocha --ui tdd integration_test
