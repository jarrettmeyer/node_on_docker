# Node on Docker

This is a demo project that will accomplish the following...

1.  Create a virtual machine using [Vagrant](https://www.vagrantup.com/).
2.  Install [Docker](https://www.docker.com/).
3.  Set up a docker container running a [CouchDB](http://couchdb.apache.org/) database.
4.  Set up a [NodeJS](https://nodejs.org/) API.
5.  Run a client web application.
    
## Usage

First, make sure you have installed the latest version of Vagrant. Clone this repository, and run these two commands 
from your host machine. They take a while. Go make a sandwich.

```
$ vagrant up
$ vagrant ssh
```

You are now inside your VM and ready to start your application. Change to your application directory (this gets mounted
as `/home/vagrant/docker_demo`) and start up this application. This will build your Docker containers and run them. This
will take a while to run - longer than the `vagrant up` step took.

```
$ cd /home/vagrant/docker_demo
$ ./start_app.sh
```

Now, point your host's browser to [http://localhost:8080](http://localhost:8080) to see the running application.

### How it works

Let's start with the `Vagrantfile`. This provisions an [Ubuntu](http://www.ubuntu.com/) virtual machine running v14.04
64-bit server. Onto this VM, we install Docker, [nginx](http://nginx.org/), and NodeJS.

On this machine, nginx serves as a reverse proxy. It does not serve any web pages. It does, however, forward requests
from the VM to the appropriate ports. See the `vagrant/nginx.conf` file for more details.

There are three Docker containers in our application &mdash; once each for the database, the API, and the client 
application. We will discuss these containers in their own sections.

### Ports

The following ports are exposed by the Vagrant VM.

+   5984 - Exposes CouchDB to the host. This is not necessary for running the application. However it is required if 
    you want to browse your CouchDB data from your host machine.
+   8080 - Exposes the web client and API to the host. This port is required.

### CouchDB Docker container

The [CouchDB container](https://registry.hub.docker.com/u/klaemo/couchdb/) is a ready-to-run container with CouchDB
installed in the container. Port 5984 is forwarded from the VM, and the data volumes are mounted in the Vagrant VM.

### nginx Docker container

The [nginx container](https://registry.hub.docker.com/u/library/nginx/) is a ready-to-run container that mounts your
web application and runs it internally on port 80. Our `docker run` is setup to forward requests from port 8000 to the
container port 80.

### NodeJS Docker container

The NodeJS container is a simple ExpressJS application. It is built on top of NodeJS 0.12.2. Inside the container, the
API application runs on port 3000. This port is forwarded from the VM.

## Testing

### Testing CouchDB from the host

Point your browser to [http://localhost:5984](http://localhost:5984). The CouchDB installation we are using has 
[Futon](http://docs.couchdb.org/en/latest/intro/futon.html) installed.

![Futon](https://raw.githubusercontent.com/jarrettmeyer/node_on_docker/master/images/futon.png)

### Testing the NodeJS API from the host

You can test the API from your host machine by making a `curl` request.

```
$ curl -X GET http://localhost:8080/api/
{"message":"Hello World!","timestamp":"2015-04-19T15:16:19.705Z"}
```

Or, you can do the same thing from your browser by going to [http://localhost:8080/api/](http://localhost:8080/api/).

![GET /api](https://raw.githubusercontent.com/jarrettmeyer/node_on_docker/master/images/GET_api.png)

### Testing the NodeJS API from the Vagrant VM

The following tests can be run from inside the Vagrant VM. You will first need to `vagrant ssh` into the virtual 
machine.

```
$ cd ./docker_demo/node_api
```

If you have never run the application before, you will first need to create the database and the views. If you have a
running application, you can safely skip this step.

```
$ node ./examples/test_onStartup.js
Database docker_demo does not exist.
Successfully created database docker_demo.
Successfully created view _design/app.
```

To create a few simple 'Hello World!' documents, run the `test_save.js` script. This will add 5 new documents to the
database. You will notice that the saved messages have `_id` and `_rev` values set by CouchDB.

```
$ node ./examples/test_save.js
```

Test fetching all documents with the `test_getAll.js` script.

```
$ node ./examples/test_getAll.js
[ { _id: '31c26d78f752cc82c70020e94a00777f',
    _rev: '1-b1e52219ef5171742bf0adc011826b7b',
    message: 'Hello World!',
    timestamp: '2015-04-19T14:26:18.894Z' },
  { _id: '31c26d78f752cc82c70020e94a006b4b',
    _rev: '1-3b83af07be6bc365c7a24ec0417d9e70',
    message: 'Hello World!',
    timestamp: '2015-04-19T14:26:18.892Z' },
  { _id: '31c26d78f752cc82c70020e94a0060a7',
    _rev: '1-cb03ced6f353ec01984f108229cdd047',
    message: 'Hello World!',
    timestamp: '2015-04-19T14:26:18.890Z' },
  { _id: '31c26d78f752cc82c70020e94a005eb1',
    _rev: '1-331f13d0c4bd55dd1289f72545fa635f',
    message: 'Hello World!',
    timestamp: '2015-04-19T14:26:18.886Z' },
  { _id: '31c26d78f752cc82c70020e94a005559',
    _rev: '1-8b0505f7579ae8d025c9385fc5b4e6b7',
    message: 'Hello World!',
    timestamp: '2015-04-19T14:26:18.875Z' } ]
```

Test fetching a single document with the `test_getOne.js` script. Be sure to use one of the `_id` values that was 
returned when you fetched all documents in your previous step.

```
$ node ./examples/test_getOne.js 31c26d78f752cc82c70020e94a005eb1
{ _id: '31c26d78f752cc82c70020e94a005eb1',
  _rev: '1-331f13d0c4bd55dd1289f72545fa635f',
  message: 'Hello World!',
  timestamp: '2015-04-19T14:26:18.886Z' }
```

## Notes and Issues

### Getting Docker containers to talk to each other

Docker containers need to be [linked](https://docs.docker.com/userguide/dockerlinks/) to allow them to expose ports to
each other. This is required because **localhost** inside the Docker container is not the same as **localhost** outside
the Docker container.

This is only required because the two Docker containers are on the same (virtual) machine. If the two containers were on
two different machines, this extra step would not be necessary.

### Nothing opens in host

Make sure that nginx is running in the VM.

```
$ sudo service nginx status
 * nginx is running
```

Make sure that all of your docker containers are running. You should see three running containers. *Note: You will have 
different container IDs, but that does not matter.*

```
$ sudo docker ps
CONTAINER ID        IMAGE                   COMMAND                CREATED             STATUS              PORTS                           NAMES
ce47d59a4124        client_app:latest       "nginx -g 'daemon of   3 minutes ago       Up 3 minutes        443/tcp, 0.0.0.0:8000->80/tcp   client_app
d8036029d53b        node_api:latest         "node /src/app.js"     14 minutes ago      Up 14 minutes       0.0.0.0:3000->3000/tcp          node_api
97577f40ff49        klaemo/couchdb:latest   "/entrypoint.sh couc   25 minutes ago      Up 25 minutes       0.0.0.0:5984->5984/tcp          couchdb
```

### Running on a Windows host

Trying starting with [MinGW](http://www.mingw.org/), instead of cmd.

### Why are the data volumes mounted on the CouchDB container?

**Docker is not to be trusted with data. If you stop the container, you will lose your data!** The power of Docker is 
that is always started from when the container was last built. Changes that occur inside the container over the 
container's lifetime are lost when the container is stopped and restarted. You should **always** store your data 
outside of your Docker container.

The CouchDB `Dockerfile` creates mountable volumes available at  `/usr/local/var/log/couchdb` and 
`/var/lib/couchdb:/usr/local/var/lib/couchdb`. In our `run.sh` file, we mount those volumes locally with the `-v` 
command line switch. 
