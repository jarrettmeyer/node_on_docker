#!/usr/bin/env bash
#
# Helpful script when making changes to the API layer. It stops the running docker container,
# removes it from the index, builds the container, and runs the container.
#
sudo docker stop client_app
sudo docker rm client_app
./build.sh
./run.sh
