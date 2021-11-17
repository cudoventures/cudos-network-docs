# Public testnet upgrade v0.3

This section describes in detail all steps that need to be executed for the v0.3 upgrade of the public testnet. The upgrade is planned for 18th November 2021.

First of all, in order to upgrade your node(s) to the new version of the network, you need to have running nodes.
If you do not have any nodes running in the network at the moment, please follow [these instructions](/build/validator.html#validator-setup) to deploy a validator into the network, or [these other ones](/build/developers-setup.html) to simply deploy a full node.

These aim to be self-contained instructions, so let us give first an overview of all the steps needed, and then describe each one with the exact commands.

## Disclaimer

The commands below are tested under Linux OS. They could work under Windows/WSl as well.

If you are using MacOS then please pay attention to the **sed** command. You MUST add an empty string just after with <em>-i</em> parameter.

**For example:**

<em>Linux version:</em> <code>sudo sed -i "s/....."</code>

<em>MacOS version:</em> <code>sudo sed -i "" "s/....."</code>

## Overview

1. Accept the upgrade proposal
2. Wait for the network to stop at the specified height
3. Stop all running nodes/orchestrators (do not stop the Ethereum full node)
4. Export the current state
5. Migrate the exported state
6. Run the upgraded binary
7. Start the orchestrator

## Accept the upgrade proposal

As mentioned above, this needs to be done by the Validators, either through the CLI or through the explorer.

To vote using the explorer, connect your Validator wallet into it and then vote "Yes" on the upgrade proposal.
Proposals in the explorer can be found at [https://explorer.cudos.org/proposals](https://explorer.cudos.org/proposals).

To vote from the command line, first export the variable names.
Namely, start setting a couple of variables,

```bash
export CHAIN_ID="cudos-testnet-public"
export ACCOUNT="validator" # The name of your validator account, which by default is "validator"
```

and then vote on the actual proposal,

```bash
cudos-noded tx gov vote N yes --from $ACCOUNT --keyring-backend os --chain-id $CHAIN_ID -y
```

where `N` is the proposal number that we want to vote `yes` to.

## Wait for the network to stop

There is no particular task on this section other than waiting.
This is however a crucial step.
The rest of the instructions after this section should only be followed after the network has stopped at the specified height.

## Stop all running nodes/orchestrators

It is very important to keep the Ethereum node running, as we want it to stay synced with the Ethereum network.
All other nodes will need to be stopped and updated though, as they are Cudos Network ones.

In order to stop all running Cudos nodes, log into the physical or virtual machines where your Docker instances are running, and stop them.
Namely, for each different machine, first list all running containers

```bash
sudo docker container ls
```

and then stop the relevant containers,

```bash
sudo docker stop <CONTAINER NAME>
```

This needs to be done for each node of the network.
For a Validator running public testnet, the expected container names are:

- cudos-start-full-node-client-testnet-public-01
- cudos-orchestrator-client-testnet-public-01

OR

- cudos-start-seed-node-client-testnet-public-01

OR

- cudos-start-sentry-node-client-testnet-public-01


for full, orchestrator, seed and sentry nodes respectively.

## Export the current network state

**This process needs to be repeated for every node** type, full-node, seed and sentry, in the machine where they are running.
To export the state first we define environment variables to make our life easier, and then we do the actual export of the state.

### Define env variables

For **full nodes**,
```bash
export WORKING_DIR="" # Absolute path to the parent folder of CudosBuilders, CudosNode and CudosGravityBridge
export NODE_NAME="full-node" 
export START_CONTAINER_NAME="cudos-start-full-node-client-testnet-public-01"
export DATA_FOLDER="cudos-data-full-node-client-testnet-public-01"
export CHAIN_ID="cudos-testnet-public"
```

For **seed nodes**,
```bash
export WORKING_DIR="" # Absolute path to the parent folder of CudosBuilders, CudosNode and CudosGravityBridge
export NODE_NAME="seed-node" 
export START_CONTAINER_NAME="cudos-start-seed-node-client-testnet-public-01"
export DATA_FOLDER="cudos-data-seed-node-client-testnet-public-01"
export CHAIN_ID="cudos-testnet-public"
```

For **sentry nodes**,
```bash
export WORKING_DIR="" # Absolute path to the parent folder of CudosBuilders, CudosNode and CudosGravityBridge
export NODE_NAME="sentry-node" 
export START_CONTAINER_NAME="cudos-start-sentry-node-client-testnet-public-01"
export DATA_FOLDER="cudos-data-sentry-node-client-testnet-public-01"
export CHAIN_ID="cudos-testnet-public"
```

### Exporting the state

First we need to prepare the binary-builder, so navigate to its folder
```bash
cd "$WORKING_DIR/CudosBuilders/docker/binary-builder"
```
and then prepare the binary,
```bash
sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build
```

Then you need to start the node in "sleep" mode.
To do so, navigate to the relevant folder,
```bash
cd "$WORKING_DIR/CudosBuilders/docker/$NODE_NAME"
```
modify the Docker files (the second command is only relevant for seed and sentry nodes),
```bash
sudo sed -i "s/cudos-noded start/sleep infinity/g" "./start-$NODE_NAME.dockerfile"
sudo sed -i "s/ --state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2//g" "./start-$NODE_NAME.dockerfile"
```
remove stopped containers
```bash
sudo docker container prune -f
```
and then finally start the node in the desired state,
```bash
sudo docker-compose --env-file "./$NODE_NAME.client.testnet.public01.arg"  -f "./start-$NODE_NAME.yml" -p "cudos-start-$NODE_NAME-client-testnet-public-01" up --build -d
```

After that's done, first remove any existing backups,
```bash
sudo docker container exec "$START_CONTAINER_NAME" /bin/bash -c "rm -rf \"\$CUDOS_HOME/backup\""
```
then create the backup folder,
```bash
sudo docker container exec "$START_CONTAINER_NAME" /bin/bash -c "mkdir -p \"\$CUDOS_HOME/backup\""
```
and finally export the state,
```bash
sudo docker container exec "$START_CONTAINER_NAME" /bin/bash -c "cudos-noded export |& tee \"\$CUDOS_HOME/backup/genesis.exported.json\""
```

Now you can stop the sleeping container,
```bash
sudo docker stop "$START_CONTAINER_NAME"
```

The last step of this export is saving a backup of the data as a security measure, in case something goes wrong.
To do that, first remove any previous backups,
```bash
sudo rm -rf "$WORKING_DIR/CudosData/$DATA_FOLDER-backup"
```
and then copy the `CudosData` folder to create the backup,
```bash
sudo cp -r "$WORKING_DIR/CudosData/$DATA_FOLDER" "$WORKING_DIR/CudosData/$DATA_FOLDER-backup"
```

Now we are ready for the state migration.

## Migrate the exported state

**This step needs to be repeated for every node that we are upgrading, just like the previous ones.**

As a security measure again, the first step is to back up the old source code, in the odd chance something goes wrong.
```bash
cd "$WORKING_DIR"

sudo mv ./CudosNode ./CudosNode-backup
sudo mv ./CudosGravityBridge ./CudosGravityBridge-backup
sudo mv ./CudosBuilders ./CudosBuilders-backup
```

Then, we need to pull the new versions from the Github repositories.
For this version 0.3 upgrade,
```bash
git clone --depth 1 --branch v0.3 https://github.com/CudoVentures/cudos-node.git CudosNode
git clone --depth 1 --branch v0.3.1  https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone --depth 1 --branch v0.3 https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
```

Now we can prepare the binary-builder,
```bash
cd "$WORKING_DIR/CudosBuilders"
cd ./docker/binary-builder
sudo docker-compose --env-file ./binary-builder.arg -f ./binary-builder.yml -p cudos-binary-builder build
```

copy the old .env file,

```bash
cd "$WORKING_DIR"
cp "./CudosBuilders-backup/docker/$NODE_NAME/$NODE_NAME.client.testnet.public01.env" "./CudosBuilders/docker/$NODE_NAME/$NODE_NAME.client.testnet.public01.env"
```

and start the node in sleep mode, just like we did before

```bash
cd "$WORKING_DIR/CudosBuilders"
cd "./docker/$NODE_NAME"
sed -i "s/cudos-noded start/sleep infinity/g" "./start-$NODE_NAME.dockerfile"
sed -i "s/ --state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2//g" "./start-$NODE_NAME.dockerfile"
sudo docker-compose --env-file "./$NODE_NAME.client.testnet.public01.arg"  -f "./start-$NODE_NAME.yml" -p "cudos-start-$NODE_NAME-client-testnet-public-01" up --build -d
```

We are now ready to migrate the genesis,
```bash
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cudos-noded migrate v0.43 \"\$CUDOS_HOME/backup/genesis.exported.json\" --chain-id $CHAIN_ID |& tee \"\$CUDOS_HOME/backup/genesis.migrated.json\""

sudo docker container exec $START_CONTAINER_NAME apt-get update

sudo docker container exec $START_CONTAINER_NAME apt-get install jq -y

sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cp \"\$CUDOS_HOME/backup/genesis.migrated.json\" \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\""

sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cat \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\" | jq '.app_state.gravity.params.signed_batches_window = \"10000\"' > \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\""
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "mv \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\" \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\""

sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cat \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\" | jq '.app_state.gravity.last_tx_pool_id = \"78\"' > \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\""
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "mv \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\" \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\""

sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cat \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\" | jq '.app_state.gravity.last_outgoing_batch_id = \"75\"' > \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\""
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "mv \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\" \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\""

sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cat \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\" | jq '.app_state.slashing.params.signed_blocks_window = \"19200\"' > \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\""
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "mv \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\" \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\""

sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cat \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\" | jq '.app_state.gov.deposit_params.max_deposit_period = \"86400s\"' > \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\""
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "mv \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\" \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\""

sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cat \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\" | jq '.app_state.gov.voting_params.voting_period = \"86400s\"' > \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\""
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "mv \"\$CUDOS_HOME/backup/genesis.migrated-modified.json.tmp\" \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\""
```

reset the old state,

```bash
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cudos-noded unsafe-reset-all"
```

and copy the new genesis file,

```bash
sudo docker container exec $START_CONTAINER_NAME /bin/bash -c "cp \"\$CUDOS_HOME/backup/genesis.migrated-modified.json\" \"\$CUDOS_HOME/config/genesis.json\""
```

## Run the upgraded binary

**This step needs to be repeated for every node that we are upgrading, just like the previous ones.**
The first step is to undo one of our previous changes, to get the node ready for normal operation.
```bash
cd "$WORKING_DIR/CudosBuilders"
cd "./docker/$NODE_NAME"
sed -i "s/sleep infinity/cudos-noded start/g" "./start-$NODE_NAME.dockerfile"
```

For seed and sentry nodes, we also need to add back an extra line,
```bash
sed -i "s/sleep infinity/cudos-noded start --state-sync.snapshot-interval 2000 --state-sync.snapshot-keep-recent 2/g" "./start-$NODE_NAME.dockerfile"
```

We can now start the node normally,
```bash
sudo docker-compose --env-file "./$NODE_NAME.client.testnet.public01.arg"  -f "./start-$NODE_NAME.yml" -p "cudos-start-$NODE_NAME-client-testnet-public-01" up --build -d
```

The last step we are missing is starting the orchestrator.

## Start the orchestrator

Please note that this step assumes that the orchestrator runs on the same machine as the validator, as explained in our [recommended Validator setup](/build/validator.html#validator-setup).
In that machine, copy the old .env file
```bash
cd "$WORKING_DIR"
cp "./CudosBuilders-backup/docker/orchestrator/orchestrator.client.testnet.public01.env" "./CudosBuilders/docker/orchestrator/orchestrator.client.testnet.public01.env"
```

and then start the orchestrator,
```bash
cd "$WORKING_DIR"
cd "./CudosBuilders/docker/orchestrator"
sudo docker-compose --env-file orchestrator.client.testnet.public01.arg -f orchestrator.release.yml -p cudos-orchestrator-client-testnet-public-01-release up --build --detach
```

After this, all the nodes and the orchestrator should have upgraded to the new network.
As a last step, now that all nodes and the orchestrator have been successfully updated, we can delete and backups that we did in previous steps as a security measure in case things went wrong.

## Clean up

We would recommend waiting a few hours or a couple of days before cleaning up the backups, in case something breaks down in the hours following the upgrade.
If all has gone well, then we can now delete the data backup,
```bash
sudo rm -rf "$WORKING_DIR/CudosData/$DATA_FOLDER-backup"
```
and also the source code backup,
```bash
cd "$WORKING_DIR"

sudo rm -rf ./CudosNode-backup
sudo rm -rf ./CudosGravityBridge-backup
sudo rm -rf ./CudosBuilders-backup
```
