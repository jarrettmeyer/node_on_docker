#!/usr/bin/env bash

vagrant ssh -c /home/vagrant/docker_demo/couchdb/build.sh
vagrant ssh -c /home/vagrant/docker_demo/couchdb/run.sh
vagrant ssh -c /home/vagrant/docker_demo/node_api/build.sh
vagrant ssh -c /home/vagrant/docker_demo/node_api/run.sh
vagrant ssh -c /home/vagrant/docker_demo/client_app/build.sh
vagrant ssh -c /home/vagrant/docker_demo/client_app/run.sh
