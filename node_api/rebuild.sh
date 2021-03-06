#!/usr/bin/env bash
#
# Helpful script when making changes to the API layer. It stops the running docker container,
# removes it from the index, builds the container, and runs the container.
#
sudo docker stop node_api
sudo docker rm node_api
./build.sh
./run.sh
