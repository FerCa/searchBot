FROM fedora:21

MAINTAINER “Ferran Caellas” <ferca23@gmail.com>

RUN yum update -y && \
 yum install -y \
 nodejs \
 mongodb-server \
 mongodb \
 npm \
 crontabs && \
 crontab /etc/crontab && \
 mkdir -p /data/db

ENTRYPOINT "/usr/bin/mongod"

ENV InstallationDir /var/searchBot/

WORKDIR ${InstallationDir}

COPY . ${InstallationDir}

RUN npm install && npm cache clean && ./register_cron_job.sh
