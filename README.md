# Node on Docker

This is a demo project that will accomplish the following...

1.  Create a virtual machine using [Vagrant](https://www.vagrantup.com/).
2.  Install [Docker](https://www.docker.com/).
3.  Set up a docker container running a [CouchDB](http://couchdb.apache.org/) database.
4.  Set up a [NodeJS](https://nodejs.org/) API.
5.  Run a client web application.
    
## Usage

First, make sure you have installed the latest version of Vagrant.

```
$ vagrant up
$ ./start_app.sh
```

## Notes

### Getting Docker containers to talk to each other

Docker containers need to be [linked](https://docs.docker.com/userguide/dockerlinks/) to allow them to expose ports to
each other. This is required because **localhost** inside the Docker container is not the same as **localhost** outside
the Docker container.

This is only required because the two Docker containers are on the same (virtual) machine. If the two containers were on
two different machines, this extra step would not be necessary.
