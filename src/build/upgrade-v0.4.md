# Public testnet upgrade v0.4

## Validate the environment

1. Clone the repo: https://github.com/CudoVentures/cudos-network-upgrade
```bash
git clone https://github.com/CudoVentures/cudos-network-upgrade.git
```
2. Navigate to ./cudos-network-upgrade/config
3. Make a copy of .env.example and name it ".env"
```bash
cp ./cudos-network-upgrade/config/.env.example ./cudos-network-upgrade/config/.env
```
4. Open the .env and define the 2 variables. <em>**"WORKING_DIR"**</em> must point to the folder that contains <em>"CudosNode"</em>, <em>"CudosBuilders"</em>, <em>"CudosGravityBridge"</em> and <em>"CudosData"</em>. Set <em>**"SHOULD_USE_PREDEFINED_GENESIS"**</em> to "true".
5. Execute the following script based on node-type (full/seed/sentry) from the <em>cudos-network-upgrade</em> directory

**For full-node:**
```bash
sudo ./validate.sh testnet-public full-node client
```

**For seed-node:**
```bash
sudo ./validate.sh testnet-public seed-node client
```

**For sentry-node:**
```bash
sudo ./validate.sh testnet-public sentry-node client
```

6. Let us know of the outcome of the script above. The expected result is "OK: Verification was successful".

## Upgrade the network

### Prepare the repo

1. Clone the repo: https://github.com/CudoVentures/cudos-network-upgrade
```bash
git clone https://github.com/CudoVentures/cudos-network-upgrade.git
```
2. Navigate to ./cudos-network-upgrade/config
3. Make a copy of .env.example and name it ".env"
```bash
cp ./cudos-network-upgrade/config/.env.example ./cudos-network-upgrade/config/.env
```
4. Open the .env and define the 2 variables. <em>**"WORKING_DIR"**</em> must point to the folder that contains <em>"CudosNode"</em>, <em>"CudosBuilders"</em>, <em>"CudosGravityBridge"</em> and <em>"CudosData"</em>. Set <em>**"SHOULD_USE_PREDEFINED_GENESIS"**</em> to "true".

### Run the upgrade

**AVAILABLE COMMANDS**

There are 4 commands to help us perform the upgrade

1. create-backup.sh - Creates a copy of all blockchain related date
2. restore-backup.sh - Restores the data from the prevously made backup (using create-back.sh)
3. clean-backup.sh - Removes all backup related files
4. upgrade.sh - Upgrades the network.

**PARAMETERS**

The above commands have the same parameters in the following format:

<em>< command > < network > < node > < mode ></em>

**command** could be one of the following 4 - <em>create-backup.sh, restore-backup.sh, clean-backup.sh, upgrade.sh</em>

**network** is <em>testnet-public</em>

**node** could be one of the following 3 - <em>full-node, seed-node, sentry-node</em>

**mode** is <em>client</em>

**UPGRADE PROCEDURE**

1. Create a backup
2. Upgrade the network
3. If everything runs successfully then clean the backups, otherwise get in touch with us.

**EXAMPLES**

<em>Full-node:</em>
```
./create-backup.sh testnet-public full-node client

./upgrade.sh testnet-public full-node client

./clean-backup.sh testnet-public full-node client [If everything is successfull and your node is producing blocks] 
```

<em>Seed-node:</em>
```
./create-backup.sh testnet-public seed-node client

./upgrade.sh testnet-public seed-node client

./clean-backup.sh testnet-public seed-node client [If everything is successfull and your node is producing blocks] 
```
<em>Sentry-node:</em>
```
./create-backup.sh testnet-public sentry-node client

./upgrade.sh testnet-public sentry-node client

./clean-backup.sh testnet-public sentry-node client [If everything is successfull and your node is producing blocks] 
```
## If the Upgrade Fails
**If you already started the upgrade process and the upgrade.sh phase has failed:**
1. Delete the `cudos-network-upgrade` directory
2. Reclone the repo
3. The `validate.sh` script is not required at this point.
4. You should already have a clean backup, please keep this.
- <em>  **Do not rerun the backup!** </em>
5. Instead of running `./upgrade.sh`, run `./fix.sh` with the same parameters.
(The changes to the script include changes to the directory names and a change to the `validate.sh` script to handle a partial upgrade)
6. You should now see validator activity in the log

**If you haven’t started the upgrade process yet:**
1. Delete the `cudos-network-upgrade` directory
2. Reclone the upgrade repo
3. Run through the process according to the previous docs!

Please be aware that a necessary part of this upgrade is a change to the Chain ID from `cudos-testnet-public` to `cudos-testnet-public-2`, this is common practice for Cosmos-based chains. Note that some old docs may refer to the old Chain ID.

## If the `./fix.sh` script fails due to no container running:
Simply add `--force` to the `./fix.sh` command, this passes over the check for the running container.
