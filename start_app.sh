#!/usr/bin/env bash

cd ./couchdb
./build.sh
./run.sh

cd ../node_api
./build.sh
./run.sh

cd ../client_app
./build.sh
./run.sh

sudo docker ps
