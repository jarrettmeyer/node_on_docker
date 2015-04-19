#!/usr/bin/env sh

rm /etc/nginx/nginx.conf
ln -s /home/vagrant/docker_demo/vagrant/nginx.conf /etc/nginx/nginx.conf
service nginx restart
