#!/usr/bin/env sh

rm /etc/nginx/nginx.conf
ln -s /home/vagrant/node_on_docker/vagrant/nginx.conf /etc/nginx/nginx.conf
service nginx restart
