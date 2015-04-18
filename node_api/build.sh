#!/usr/bin/env bash
sudo docker build -t node_api .
sudo docker run -d -p 3000:3000 --name node_api node_api
