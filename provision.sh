#!/usr/bin/env sh

apt-get update -y
apt-get dist-upgrade -y
apt-get install -y nginx wget

#
# Install Docker.
# http://docs.docker.com/installation/ubuntulinux/
#
wget -qO- https://get.docker.com/ | sh
