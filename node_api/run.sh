#!/usr/bin/env bash
sudo docker run -d -p 3000:3000 --link couchdb:couchdb --name node_api node_api
