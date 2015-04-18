#!/usr/bin/env bash
sudo docker build -t client_app .
sudo docker run --name client_app -d -p 8080:80 client_app
