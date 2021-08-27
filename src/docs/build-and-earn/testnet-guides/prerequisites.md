---
title: Prerequisites and Operating Systems
---

# ﻿Prerequisites and Operating Systems

You can run your node in different operating systems such as Debian 10, Ubuntu, WSL, and macOS Catalina version 10.15.4 or above. If you are installing docker for the first time, please check the next section, “Notes for Installing Docker for the First Time”.

The first step is to ensure that you have set up all requirements and prerequisites as the following:

- Install [Docker](https://docs.docker.com/engine/install/) 20.10.6 or above
- Install [Docker Compose](https://docs.docker.com/compose/install/) 1.29.1 or above
- Install [Git](https://github.com/git-guides/install-git)
- Install a code editor such as Nano, Atom, etc.

Missing any of the prerequisites above can lead to errors and being unable to run your node. It is recommended to have the latest version of Docker and Docker compose installed. If you already installed them, you can check the version by running the following commands in your terminal:
```
docker -v
docker-compose -v
```

## Notes for installing docker for the first time

Before installing the Docker Engine for the first time on a new host machine, you need to set up the Docker repository. Afterwards, you can install and update Docker from the repository.

1. Set up the repository, update the apt package index, and install packages to allow apt to use a repository over HTTPS:
```
apt-get update
apt-get install \
   apt-transport-https \
   ca-certificates \
   curl \
   gnupg \
   lsb-release
```
2. Add Docker’s official GPG key:
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
3. Set up the stable repository:
```
echo \
 "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
 ```
4. Install the Docker Engine
```
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io
```
5. Verify that the Docker Engine is installed
```
docker run hello-world
```
6. Install Docker Compose:
```
### For alpine, the following dependency packages are needed: py-pip, python3-dev, libffi-dev, openssl-dev, gcc, libc-dev, rust, cargo and make ###

apt install py-pip python3-dev libffi-dev openssl-dev gcc libc-dev rust cargo make

# apt install py-pip python3-dev libffi-dev openssl-dev gcc libc-dev rust cargo make
```
7. Download the current stable release of Docker Compose:
```
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
8. Apply executable permissions to the binary:
```
chmod +x /usr/local/bin/docker-compose
```
Note that if you can not connect to the Docker daemon, you can automatically start the docker daemon at boot by running this command:systemctl enable --now docker and then check the status:  systemctl status docker
