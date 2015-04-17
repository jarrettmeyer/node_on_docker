Vagrant.configure(2) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.provision :shell, path: "./provision.sh"
    config.vm.provision :shell, path: "./setup_nginx.sh"
    config.vm.network :forwarded_port, host: 8080, guest: 8080
    config.vm.synced_folder ".", "/home/vagrant/node_on_docker"
end
