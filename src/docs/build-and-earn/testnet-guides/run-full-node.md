---
title: Run a Full Node
---

# ﻿Run a Full node

Before running a node, make sure that you have followed the guide for [setting up your prerequisites and environment](/docs/build-and-earn/testnet-guides/prerequisites.md).

To run a full node, you need to complete the following steps:

- Initialize the node
- Configure and start the node

## Initialize the node as a validator

When you run a validator node, you play an important role in the security of a network. A validator must be secure and fault-tolerant. So it is recommended to run your validator with a layer of 2 or more sentry nodes and to isolate the validator node behind that layer. Also, you will need an IP-address per node that is connected to the network. For example, if you have 10 validator nodes and only one Sentry node then only the Sentry node will be connected to the network where you will need a single IP-address.

In total, Cudos has [three types of nodes](/docs/learn-cudos/overview/types-of-nodes.md) and as a validator, you need to have at least:
* one Sentry node
* one Full node

You can initialize the full node as the following:

1. Navigate to the directory *CudosBuilders/docker/full-node*
2. Find the file **full-node.env.example** and create a copy of it
3. Rename the copied file to **full-node.client.testnet.public01.env**
4. Open the file, which you renamed, **full-node.client.testnet.public01.env** in any editor
5. Find both the **"MONIKER"** attribute and the flag **"SHOULD_USE_GLOBAL_PEERS"** and set them as the following :
```
MONIKER=MyFullNodeName
SHOULD_USE_GLOBAL_PEERS=false
```
6. Leave other variables such as "PERSISTENT_PEERS" and "SEEDS" empty and save the changes that you made to the file.
7. Make sure that you are still in the correct directory **CudosBuilders/docker/full-node**
8. Initialize the node by running this command:
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f init-full-node.yml -p cudos-init-full-node-client-testnet-public-01 up --build
```

If all steps are completed successfully, you should see a newly generated folder called **CudosData** at the same directory where you placed *CudosBuilders* and *CudosNode*. The subdirectory *cudos-data-full-node-client-testnet-public-01* of **CudosData"** folder has a file called **tendermint.nodeid**. This file contains your node **Id,** to see your node id you can open this file in any code editor and you will get one line that represents your node id such as 13f359c90582b12e291311980a855854668d80pc.

### Configure and start the node

This step is valid only if you are running the full node as a validator. Note that if you are not a validator, you do not need to follow this step.

Now you need to configure and start the full node. So far the full node is set to be isolated and to connect the full node to the network, it needs Sentry peers. The full node should run behind the layer of running a Seed node and a Sentry node with all necessary configuration and starting the node as a validator.

The full node must communicate only through the created layer of peers. To achieve that, you will need to apply the following steps:

1. [Run a Sentry node](/docs/build-and-earn/testnet-guides/run-sentry-node.md), configure, and start it as a validator
2. [Run a Seed node](/docs/build-and-earn/testnet-guides/run-seed-node.md), configure, and start it as a validator. This is an optional recommended step.
3. Get the Sentry and Seed **node ids** and add them inside the file **full-node.client.testnet.public01.env**. Leave the variable _SEEDS_ empty if you do not have seed nodes. If you have more than one Sentry or Seed node, you can separate them by a comma within the variable _PERSISTENT_PEERS_:
```
PRIVATE_PEERS=<sentry-node1-id>,<seed-node2-id>
```
4. Open the terminal and navigate to **CudosBuilders/docker/full-node**
5. Configure your node:
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f config-full-node.yml -p cudos-config-full-node-client-testnet-public-01 up --build
```
6. Start your node
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f start-full-node.yml -p cudos-start-full-node-client-testnet-public-01 up --build --detach
```

Note that you can see the logs by running the command:
```
sudo docker logs -f cudos-start-full-node-client-testnet-public-01
```
## Initialize and start the node without being a validator

If you are not a validator and you want to initialize a full node, all you need to do is to follow the same steps for [Initialize the node as a validator](/docs/build-and-earn/testnet-guides/run-full-node#initialize-the-node-as-a-validator) but make sure that you set the flag **"SHOULD_USE_GLOBAL_PEERS"** to true. To do that, open the file **full-node.client.testnet.public01.env.** in any editor then set the flag to true:
```
SHOULD_USE_GLOBAL_PEERS=true
```

You can start your Full node by running the command:
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f start-full-node.yml -p cudos-start-full-node-client-testnet-public-01 up --build --detach
```
