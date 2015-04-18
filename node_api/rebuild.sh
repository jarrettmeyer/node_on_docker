#!/usr/bin/env bash
#
# Helpful script when making changes to the API layer. It stops the running docker container,
# removes it from the index, and builds it.
#
sudo docker stop node_api
sudo docker rm node_api
./build.sh
