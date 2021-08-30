---
title: Start the pre-built Binaries
---

## Start and Build Binaries

You can build and start the docker image that has already been built and contains the Cudos binary by following these steps:
1. Create a directory to use as your workspace (skip this step if you have created the main directory before):
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
7. Navigate to _CudosBuilders/docker/binary-builder_ directory
8. Build and start the binaries by running this command:
```
sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder up --build
```
9. If you would like to start the docker image that has already been built and contains the cudos binary then run the following command:
```
sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder up
```
