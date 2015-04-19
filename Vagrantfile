Vagrant.configure(2) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.provision :shell, path: "./provision.sh"
    config.vm.provision :shell, path: "./setup_nodejs.sh"
    config.vm.provision :shell, path: "./setup_nginx.sh"
    config.vm.network :forwarded_port, host: 3000, guest: 3000
    config.vm.network :forwarded_port, host: 5984, guest: 5984
    config.vm.network :forwarded_port, host: 8080, guest: 8080
    config.vm.synced_folder ".", "/home/vagrant/docker_demo"
end
