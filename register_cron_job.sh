#/usr/bin/env bash

set -e
set -x

SEARCHBOTDIR=$(pwd)

(crontab -l ; echo "30 2 * * * ${SEARCHBOTDIR}/check.sh >> /tmp/searchbot.log") | sort - | uniq - | crontab -