# Phase 4 Step 2
It's time to proceed with the launch of the Cudos Phase 4 test network. If you've seen the greenlight anouncement from the Cudos team it means you need to execute the following instructions.

If you see any additional messages or error please reffer to the troubleshooting section.

## Sentry node setup

### Initialise the sentry node
Create your main Cudos directory. Note this step for the next
```
CUDOS_DIR = "/usr/cudos"
mkrid $CUDOS_DIR
```
Copy the ${WORKING_DIR}/cudos-builders/tools-bash/constructor/config/init.env.example and rename it to init.env. Example content of the file:
```
MONIKER="cudos-sentry-node-mainnet-01"
PERSISTENT_PEERS=""
PRIVATE_PEERS=<tendermintId>:26656
SEEDS=""

SHOULD_USE_GLOBAL_PEERS="false"
SHOULD_USE_STATE_SYNC="false"

TLS_ENABLED="false"

MONITORING_ENABLED="false"

EXTERNAL_ADDRESS=""
ADDR_BOOK_STRICT="true"
```


The most important step here is to setup the id of the full node in PRIVATE_PEERS
```
PRIVATE_PEERS=<tendermintId>:26656
```

To initialise the sentry node you need to execute the following

```
./src/init.sh sentry-node
```

### Start the sentry node

```
PARAM_PERSISTENT_PEERS=""
PARAM_SEED=""
PARAM_PRIVATE_PEER_IDS=""
PARAM_ORCHESTRATOR_ENV_PATH=""
PARAM_ORCH_ETH_ADDRESS=""
PARAM_EXPOSE_IP="0.0.0.0"
```
```
./src/start.sh sentry-node
```

## Seed node setup

### Initialise the seed node
Create your main Cudos directory. Note this step for the next
```
CUDOS_DIR = "/usr/cudos"
mkrid $CUDOS_DIR

```
Copy the ${WORKING_DIR}/cudos-builders/tools-bash/constructor/config/init.env.example and rename it to init.env. Example content of the file:
```
PARAM_PERSISTENT_PEERS=""
PARAM_SEED=""
PARAM_PRIVATE_PEER_IDS=""
PARAM_ORCHESTRATOR_ENV_PATH=""
PARAM_ORCH_ETH_ADDRESS=""
PARAM_EXPOSE_IP="0.0.0.0"
```


The most important step here is to setup the id of the full node in PRIVATE_PEERS
```
PRIVATE_PEERS=<tendermintId>:26656
```

To initialise the sentry node you need to execute the following

```
./src/init.sh seed-node
```

### Start the seed node
```
./src/start.sh seed-node
```

### Start the Validator node
Once again connect to the machine you've setup for the Step 1 of the Phase 4 testnet launch. If you've followed the inctructions step by step you should have your Cudos data stored in //TODO

Copy the ${WORKING_DIR}/cudos-builders/tools-bash/constructor/config/start.env.example and rename it to start.env. Example content of the file: 
//TODO add persistent peers once we have the CUDOS Nodes Running

```
PARAM_PERSISTENT_PEERS=""
PARAM_SEED=""
PARAM_PRIVATE_PEER_IDS=""
```

Once everything is configured we can start the node

```
cd ${WORKING_DIR}/cudos-builders/tools-bash/constructor
./src/init.sh full-node
```
