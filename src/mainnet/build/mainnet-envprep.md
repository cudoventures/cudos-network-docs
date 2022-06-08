---
title: Node Environment Preparation
---

# Node Environment Preparation


This section will take you through preparing the environment on your nodes in preparation for running the Cudos software. You must complete the following two steps on every node that will take part in the Cudos network:

- Install required packages
- Build the node images

 
## Install required packages
You must ensure that you have the following installed:

**Docker 20.10.6 or above (latest version recommended)**
Refer to the [Docker installation and upgrade guide](https://docs.docker.com/engine/install/) for your OS.
 
**Docker Compose 1.29.1 or above (latest version recommended)**
Refer to steps 3 and 4 of the [Docker Compose Installation and Upgrade guide](https://www.devopsroles.com/how-to-install-docker-compose-on-ubuntu/) for your OS.
 
**Git**
Refer to the [Git installation guide](https://github.com/git-guides/install-git) for your OS.
 
**JQ**
JQ is a command line JSON processor that you will use to extract data from JSON documents. Refer to the [JQ installation guide](https://stedolan.github.io/jq/download/) for your OS.

## Build the node images
After installing all prerequisites, you can build the Cudos node images. 

::: tip
This document describes installing the platform as root. It is also possible to install the platform as a non-root user using sudo.
:::

1. Change to root user and create a directory to use as your workspace (we will assume you call the directory `cudos`)

```
sudo -i
mkdir /var/lib/cudos
```
 
2. Make sure that you are in the correct directory 
```
cd /var/lib/cudos
```

Clone the correct branches from the [CudosNode](https://github.com/CudoVentures/cudos-node) , [CudosBuilders](https://github.com/CudoVentures/cudos-builders), and [CudosGravityBridge](https://github.com/CudoVentures/cosmos-gravity-bridge) repositories, renaming the folders *CudosNode*, *CudosBuilders*, and *CudosGravityBridge*:

```
git clone --branch 1.0.0 https://github.com/CudoVentures/cudos-node.git CudosNode
git clone --branch 1.0.0 https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone --branch 1.0.0 https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
```

Navigate to the `CudosBuilders/docker/binary-builder` directory
```
cd CudosBuilders/docker/binary-builder 
```

Build the docker image of the binary by running the command:
```
docker-compose --env-file binary-builder.arg -f binary-builder.yml -p cudos-binary-builder up --build --detach
```

You have now prepared your node environment. If you are going to build a standalone Node, please continue to [Standalone Node Build](/mainnet/build/mainnet-standalone.html). If you are building a Validator Cluster, please repeat the above steps for every node that is going to be in your cluster, then continue to [Validator Cluster Build](/mainnet/build/mainnet-cluster.html).










