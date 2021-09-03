---
title: Run a Seed Node
---

# ﻿Run a Seed node

Before running a node, make sure that you have followed the guide for [setting up your prerequisites and environment](/docs/build-and-earn/testnet-guides/prerequisites.md).

To run a seed node, you need to complete the following steps:

- Initialize the node
- Configure and start the node

## Initialize and start the node without being a validator

1. Navigate to the directory *CudosBuilders/docker/seed-node*
2. Find the file **seed-node.env.example** and create a copy of it
3. Rename the copied file to **seed-node.client.testnet.public01.env**
4. Open the file, which you renamed, **seed-node.client.testnet.public01.env** in any editor
5. Find  the **"MONIKER"** attribute and set a name to it as the following:
```
MONIKER=MySeedNodeName
```
6. Initiliaze the node by running this command:
```
sudo docker-compose --env-file ./seed-node.client.testnet.public01.arg -f ./init-seed-node.yml -p cudos-init-seed-node-client-testnet-public-01 up --build
```
7. Start the node by running this command:
```
sudo docker-compose --env-file ./seed-node.client.testnet.public01.arg -f ./start-seed-node.yml -p cudos-start-seed-node-client-testnet-public-01 up --build
```

## Configure and start the node as a validator

This step is valid only if you are running the seed node as a validator. Note that if you are not a validator, you do not need to follow this step.

1. Navigate to the directory *CudosBuilders/docker/seed-node*
2. Find the file **seed-node.env.example** and create a copy of it
3. Rename the copied file to **seed-node.client.testnet.public01.env**
4. Open the file, which you renamed, **seed-node.client.testnet.public01.env** in any editor
5. Find  the **"MONIKER"** attribute and set a name to it as the following:
```
MONIKER=MyseedNodeName
```
6. Paste the full node's nodeId in the **PRIVATE_PEERS** line. If there are multiple full nodes ids, separate them by a comma such as:
```
PERSISTENT_PEERS=<full-node1-id>@<full-node1-ip>:26656,<full-node2-id>@<full-node2-ip>:26656
```
7. Make sure that you are still in the correct directory **CudosBuilders/docker/seed-node**
8. Initialize the node by running this command:
```
sudo docker-compose --env-file ./seed-node.client.testnet.public01.arg -f ./init-seed-node.yml -p cudos-init-seed-node-client-testnet-public-01 up --build
```
9. Start the node by running this command:
```
sudo docker-compose --env-file ./seed-node.client.testnet.public01.arg -f ./start-seed-node.yml -p cudos-start-seed-node-client-testnet-public-01 up --build --detach
```

Note that you can see the logs by running the command:
```
sudo docker logs -f cudos-start-seed-node-client-testnet-public-01
```
