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

## Setup the environment before running a node

After installing all prerequisites, you can start to set up the environment:
1. Create a directory to use as your workspace:
```
mkdir ~/cudos
cd ~/cudos
```
2. Make sure that you are in the correct directory (cudos directory in this example)
3. Clone the correct branches from the [CudosNode](https://github.com/CudoVentures/cudos-node), [CudosBuilders](https://github.com/CudoVentures/cudos-builders), and [CudosGravityBridge](https://github.com/CudoVentures/cosmos-gravity-bridge) repositories:
```
git clone --depth 1 -b testnet https://github.com/CudoVentures/cudos-node.git CudosNode
git clone --depth 1 -b master  https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone --depth 1 -b master https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
```
4. Change to the root of each local repository and check out the following branches:
```
cd CudosNode
git checkout gravity/sdk-0.43

cd..
cd CudosBuilders
git checkout sdk-0.43

cd..
cd CudosGravityBridge
git checkout cosmos-sdk-0.43
```
5. Put all cloned repositories in the same directory
6. Rename the folders accordingly to exactly _CudosNode_, _CudosBuilders_, and _CudosGravityBridge_
7. Navigate to the _CudosBuilders_ directory
8. Build the docker image of the binary by running the command:
```
cd ./docker/binary-builder&& sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build
```

Note that you need to repeat the same steps for each node that you want to create.

## Create an account and set up a Keplr wallet

1. You can use the docker terminal to locate the containers' ID:
```
docker container ls
```
2. Copy the CONTAINER_ID and run the command:
```
docker exec -it <container_id> bash
```
3. Create an account by running the command (write the mnemonic phrase in a safe place):
```
cudos-noded keys add <myKeyName>
```
4. Follow the guide [Set up a Keplr wallet and link it to your account on the Cudos testnet network](/docs/build-and-earn/getting-started/creating-a-keplr-wallet.md)

Note that the **cudos-noded** is a command-line interface. It is the same command-line interface used for deploying smart contracts. You can get the list of all commands by running:
```
--help
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
 $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
> /dev/null
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
