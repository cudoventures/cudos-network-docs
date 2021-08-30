---
title: Run a Full Node
---

## ﻿Run a Full Node

Before running a node, make sure that you have followed the guide for [setting up your prerequisites and environment](/docs/build-and-earn/testnet-guides/prerequisites.md).

To run a full node, you need to complete the following steps:

- Initialize the node
- Configure and start the node

## Initialize the node as a validator

1. Navigate to the directory *CudosBuilders/docker/full-node*
2. Find the file **full-node.env.example** and create a copy of it
3. Rename the copied file to **full-node.client.testnet.public01.env**
4. Open the file, which you renamed, **full-node.client.testnet.public01.env** in any editor
5. Find both the **"MONIKER"** attribute and the flag **"SHOULD_USE_GLOBAL_PEERS"** and set them as the following (if you are not a validator set the flag to true):
```
MONIKER = MyFullNodeName
SHOULD_USE_GLOBAL_PEERS = false
```
6. Leave other variables such as "PERSISTENT_PEERS" and "SEEDS" empty and save the changes that you made to the file.
7. Make sure that you are still in the correct directory **CudosBuilders/docker/full-node**
8. Initialize the node by running this command:
```
sudo docker-compose --env-file ./full-node.client.testnet.public01.arg -f ./init-full-node.yml -p cudos-init-full-node-client-testnet-public-01 up --build
```

If all steps are completed successfully, you should see a newly generated folder called **CudosData** at the same directory where you placed *CudosBuilders* and *CudosNode*. The **CudosData** folder has a file called **tendermint.nodeid**. This file contains your **nodeId,** to see your nodeId you can open this file in any code editor and you will get one line that represents your nodeId such as 13f359c90582b12e291311980a855854668d80pc.

## Initialize the node without being a validator

If you are not a validator and you want to initialize a full node, all you need to do is to follow all previous steps but make sure that you set the flag **"SHOULD_USE_GLOBAL_PEERS"** to true. To do that, open the file **full-node.client.testnet.public01.env.** in any editor then set the flag to true:
```
SHOULD_USE_GLOBAL_PEERS = true
```

## Configure and start the node

This step is valid only if you are running the full node as a validator. Note that if you are not a validator, you do not need to follow this step.

Now you need to configure and start the full node. So far the full node is set to be isolated and to connect the full node to the network, it needs persistent peers. The full node should run behind the layer that was created in the previous step. So the full node must communicate only through the created layer of peers. To achieve that, you will need to apply the following steps:

1. Locate the **ids** of the seed (Run seed node - 2. Initialize the node in docker) and persistent nodes (Run sentry node - 2. Initialize the node in docker) in their respective directories under the *CudosData* directory
2. Place the **ids** of the seed and persistent nodes inside the file **full-node.client.testnet.public01.env**
3. Leave SEEDS empty if you do not have seed nodes
4. If you have more than one sentry/seed, you can separate them by a comma:
```
PERSISTENT_PEERS=<persistent-peer-node-id>@<persistent-peer-ip>:26656,<persistent-peer-node-id>@<persistent-peer-ip>:26656
SEEDS=<seed-node-id>@<seed-ip>:26656,<seed-node-id>@<seed-ip>:26656
```
5. Open the terminal and navigate to **CudosBuilders/docker/full-node**
6. Configure your node:
```
sudo docker-compose --env-file ./full-node.client.testnet.public01.arg -f ./config-full-node.yml -p cudos-config-full-node-client-testnet-public-01 up --build
```
7. Start your node
```
sudo docker-compose --env-file ./full-node.client.testnet.public01.arg -f ./start-full-node.yml -p cudos-start-full-node-client-testnet-public-01 up --build
```
