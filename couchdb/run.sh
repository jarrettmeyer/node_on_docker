#!/usr/bin/env bash
sudo docker run -d -p 5984:5984 --name couchdb klaemo/couchdb
sleep 5
curl -X DELETE http://localhost:5984/docker_demo
curl -X PUT http://localhost:5984/docker_demo
