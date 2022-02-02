# Phase 4 instructions

This section describes the steps needed for validator setup as part of the Phase 4 testnet launch.


## Prerequisites

// TODO add the exact tags 

You need to have a local copy of our build tools.
```
git clone --branch phase-4  https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone --depth 1 --branch phase-4 https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
git clone --depth 1 --branch phase-4 https://github.com/CudoVentures/cudos-node.git CudosNode
```
Make sure you have set the proper rights for the scripts

```
sudo chmod +x ${WORKING_DIR}/cudos-builders/tools-bash/constructor/src/start.sh
sudo chmod +x ${WORKING_DIR}/cudos-builders/tools-bash/constructor/src/init.sh
```

## Nodes inicialization

Validators should run at least 3 nodes - Seed, Sentry and Validator node. For more details you can check the Validator Setup docs - https://docs.cudos.org/build/validator.html#validator-setup.

This document will walk you through the automated process for validator setup. You won't need to execute anything other than the instructions listed bellow.

### Initialize the Full Node as a Validator
Setup your environment

Create your main Cudos directory. Note this step for the next

```
mkrid /usr/cudos
```

Copy the ${WORKING_DIR}/cudos-builders/tools-bash/constructor/config/init.env.example and rename it to init.env. Example content of the file: 

```
PARAM_SOURCE_DIR="${CUDOS_DIR}}" // is where the repos will be cloned and the binary compiled. It should be an existing and empty folder. The same you created above
PARAM_VALIDATOR_MNEMONIC="<KEY>" // the private key of the account you want to use for your validator.
PARAM_KEYRING_OS_PASS="<PASS>" // the password of your keyring
```
Copy the ${WORKING_DIR}/cudos-builders/tools-bash/constructor/config/node.env.example and rename it to node.env. Example content of the file: 

```
MONIKER=<NAME_OF_THE_NODE>
CHAIN_ID=phase-4
MONITORING_ENABLED=true
PORT26656=60101
PORT26660=60102
START_CONTAINER_NAME=cudos-start-root-node
```

// TODO describe the process for ledger use

### Sentry node setup

### Seed node setup

### Validator node setup

## Gentx submition



# Things to keep in mind
1. The folder you use for a node needs to be created and empty. You will get errors otherwise.
2. If you are running more than one node on a same server, you might not be able to create the docker, because they will try to ppen the same ports.
