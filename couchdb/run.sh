#!/usr/bin/env bash
sudo docker run -d -p 5984:5984 \
    -v /var/log/couchdb:/usr/local/var/log/couchdb \
    -v /var/lib/couchdb:/usr/local/var/lib/couchdb \
    --name couchdb klaemo/couchdb
