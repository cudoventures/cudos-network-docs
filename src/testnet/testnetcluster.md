---
title: Validator Cluster Build
---

# Validator Cluster Build



The Validator Cluster is a cluster of Cudos nodes that can be configured as *Validator*, *Seed*, or *Sentry* nodes. Refer to the [Validator Cluster Nodes](/learn/validators.html#validator-cluster-nodes) section for an overview of the validator cluster roles.
 
## Cluster Build summary
::: warning Note
In this build document, the terms _**Initialise**_ and _**Configure**_ refer to running specific scripts that apply the values in the .env settings file to your node.The _**Initialise**_ script should only be used the first time you start your node, as it will change your node ID. 
:::

The following section will take you through these steps in detail:

**1. Initialize your Validator Node**

- Apply basic values to the `.env` file, and **Initialise** BUT DO NOT START your Validator Node, taking a note of its Node ID. 

**2. Initialise and Start your Sentry and Seed nodes**

- Apply values to your nodes’ .env files, including adding the Validator’s ID as the `PRIVATE_PEERS` value.
- **Initialise** and **Start** your Seed and Sentry Nodes, taking a note of their Node IDs

**3. Apply peer values to your Validator and start it**

Enter the Seed’s ID as the SEEDS value, and the Sentry’s ID as the `PERSISTENT PEER` value in your Validator node’s .env file.
**Configure**your node 
**Start** your validator Node


## Cluster Build procedure

### 1. Initialize your Validator Node

**Please ensure you have completed everything in [Node Environment Preparation](/testnet/testnetenvprep.html) before you continue to create your node.**

To create a validator node you will build a full node, then in a later step stake CUDOS on it, at which point the node will become a validator. 

You will apply basic values to your Validator’s .env file and initialise it, however you will not start your validator yet:



#### 1. As root, navigate to the directory `/var/lib/cudos/CudosBuilders/docker/full-node`:
```
sudo -i
cd /var/lib/cudos/CudosBuilders/docker/full-node
```

#### 2. Create a copy of `full-node.env.example`, naming the copy `full-node.client.testnet.public01.env `
```
cp full-node.env.example full-node.client.testnet.public01.env
```

#### 3. Open the file `full-node.client.testnet.public01.env`.
- Set the `MONIKER` attribute to your desired name:
```
MONIKER=<your-sentry-node-moniker>
```
- Set the flag `SHOULD_USE_GLOBAL_PEERS` to `false`:
```
SHOULD_USE_GLOBAL_PEERS=false
```

#### 4. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/full-node`, and *Initialize* the node by running this command:
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f init-full-node.yml -p cudos-init-full-node-client-testnet-public-01 up --build
```
**DO NOT START YOUR VALIDATOR NODE YET**

If all steps are completed successfully, you should see a newly generated file: 
`/var/lib/cudos/CudosData/cudos-data-full-node-client-testnet-public-01/tendermint.nodeid`
that contains your **node ID**, consisting of a long string of random characters.
 
### 2. Initialise and start your Sentry and Seed nodes

### Sentry

**Please ensure you have completed everything in [Node Environment Preparation](/testnet/testnetenvprep.html) before you continue to create your node.**

#### 1. As root, navigate to the directory `/var/lib/cudos/CudosBuilders/docker/sentry-node`
```
sudo -i
cd /var/lib/cudos/CudosBuilders/docker/sentry-node
```

#### 2. Create a copy of `sentry-node.env.example`, naming the copy `sentry-node.client.testnet.public01.env`

```
cp sentry-node.env.example sentry-node.client.testnet.public01.env
```

#### 3. Open the file, `sentry-node.client.testnet.public01.env`. 

- Set the `MONIKER` (your node’s name on the blockchain) attribute to your desired name:

```
MONIKER=<your-sentry-node-moniker>
```
- Set `SHOULD_USE_GLOBAL_PEERS` to `true` :

``` 
SHOULD_USE_GLOBAL_PEERS=true
```

- Configure the `PRIVATE_PEERS` list with the node ID of any validator nodes on your private network.

```
PRIVATE_PEERS=<validator1-id>,<validator2-id>
```
Save and Exit
 
#### 4. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/sentry-node`, and *Initialize* the node by running this command:
```
docker-compose --env-file sentry-node.client.testnet.public01.arg -f init-sentry-node.yml -p cudos-init-sentry-node-client-testnet-public-01 up --build
```

#### 5. *Start* your node
```
docker-compose --env-file sentry-node.client.testnet.public01.arg -f start-sentry-node.yml -p cudos-start-sentry-node-client-testnet-public-01 up --build --detach
```

If all steps are completed successfully, you should see a newly generated file: `/var/lib/cudos/CudosData/cudos-data-sentry-node-client-testnet-public-01/tendermint.nodeid` that contains your **node ID**, consisting of a long string of random characters.

::: tip
Syncing may take several hours. Refer to [Checking sync status](/build/sync-troubleshooting.html#checking-sync-status) to verify your node is syncing. 
::: 

### Seed

**Please ensure you have completed everything in [Node Environment Preparation](/testnet/testnetenvprep.html) before you continue to create your node.**

#### 1. As root, navigate to the directory `/var/lib/cudos/CudosBuilders/docker/seed-node`
```
sudo -i
cd /var/lib/cudos/CudosBuilders/docker/seed-node
```

#### 2. Create a copy of seed-node.env.example, naming the copy seed-node.client.testnet.public01.env 
```
cp seed-node.env.example seed-node.client.testnet.public01.env
```
#### 3. Open the file `full-node.client.testnet.public01.env.` 

- Set the `"MONIKER"` attribute to your desired name:
```
MONIKER=<your-sentry-node-moniker>
```
- Set the flag `"SHOULD_USE_GLOBAL_PEERS"` to `true` :
```
SHOULD_USE_GLOBAL_PEERS=true
```
- Configure the `PRIVATE_PEERS` list with the node ID of any validator nodes on your private network.
``` 
PRIVATE_PEERS=<validator1-id>,<validator2-id>
```
#### 4. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/seed-node`, and *Initialize* the node by running this command:
```
sudo docker-compose --env-file seed-node.client.testnet.public01.arg -f init-seed-node.yml -p cudos-init-seed-node-client-testnet-public-01 up --build
```
#### 5. *Start* your node
```
sudo docker-compose --env-file seed-node.client.testnet.public01.arg -f start-seed-node.yml -p cudos-start-seed-node-client-testnet-public-01 up --build --detach
```

If all steps are completed successfully, you should see a newly generated file: 
`/var/lib/cudos/CudosData/cudos-data-seed-node-client-testnet-public-01/tendermint.nodeid`
that contains your **node ID**, consisting of a long string of random characters.
 
::: tip
Syncing may take several hours. Refer to [Checking sync status](/build/sync-troubleshooting.html#checking-sync-status) to verify your node is syncing. 
::: 
 
### 3. Configure peer values on your Validator and Start it

#### 1. On your Validator Node, open the file `/var/lib/cudos/CudosBuilders/docker/full-node/full-node.client.testnet.public01.env`
- Add the node ID and IP address+port of any **Sentry** nodes on your private network to `PERSISTENT_PEERS`:
```
PERSISTENT_PEERS=<sentry-node1-id>@<sentry-node1-ip>:26656,<sentry-node2-id>@<sentry-node2-ip>:26656
```
- Add the node ID and IP address+port of any Seed nodes on your private network to `SEEDS`:
```
SEEDS=<seed-node1-id>@<seed-node1-ip>:26656,<seed-node2-id>@<seed-node2-ip>:26656
```
#### 2. Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/seed-node`, and *Configure* the peer values you have just defined on the validator:
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f config-full-node.yml -p cudos-config-full-node-client-testnet-public-01 up --build
```

#### 3. *Start* your Validator
Make sure that you are still in the correct directory `/var/lib/cudos/CudosBuilders/docker/full-node`, and **Start** the node by running this command:
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f start-full-node.yml -p cudos-start-full-node-client-testnet-public-01 up --build --detach
```

::: tip
Syncing may take several hours. Refer to [Checking sync status](/build/sync-troubleshooting.html#checking-sync-status) to verify your node is syncing. 
::: 

**Once your node has synced you can stake CUDOS on it, at which point your node will become operational as a validator**. 

### Staking
A full node becomes a validator when it has successfully staked CUDOS.

Before staking, you must create and fund your wallet, and stash it on your node by following the process described in [Setting up your nodes wallet](/build/fundnodes.html#setting-up-your-nodes-wallet), making sure to use the Testnet `cudos-testnet-public-2` instead of mainnet.

Once this is completed, you can go ahead and stake CUDOS, which will make your node a validator, as described in [Staking your Validator](/build/fundnodes.html#staking-your-validator), making sure to use the Testnet `cudos-testnet-public-2` instead of mainnet.
