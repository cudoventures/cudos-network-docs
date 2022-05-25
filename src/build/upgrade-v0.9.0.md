# Public testnet upgrade v0.9.0

The following instructions will guide you through the process of updade for v0.9.0 of the Cudos Testnet. The process is the same per node and should be executed as described for every node.


## Prepare the environment

1. Clone the repo: https://github.com/CudoVentures/cudos-network-upgrade
```bash
git clone --branch v0.9.0 https://github.com/CudoVentures/cudos-builders.git CudosBuilders
```
2. Navigate to ./CudosBuilders/tools-bash/upgrade/config
3. Make a copy of .env.example and name it ".env"
```bash
cp ./CudosBuilders/tools-bash/upgrade/config/node.env.example /CudosBuilders/tools-bash/upgrade/config/node.env
```
4. Open the .env and define the 3 variables.  <p><em>**"PARAM_SOURCE_DIR"**</em> must point to the folder that contains <em>"CudosNode"</em>, <em>"CudosBuilders"</em>, <em>"CudosGravityBridge"</em> and <em>"CudosData"</em>. </p> <p>Set <em>**"PARAM_NODE_NAME"**</em> to the type of node you are updating. Possible values are: root-node, seed-node, sentry-node or full-node. Example: PARAM_NODE_NAME="sentry-node"</p> <p><em>**"PARAM_HAS_ORCHESTRATOR"**</em> should be set to true if you have an orchestrator. </p>

Example content of a configuration file by node: 

**For full-node:**
```bash
PARAM_SOURCE_DIR="/usr/cudos"
PARAM_NODE_NAME="full-node"
PARAM_HAS_ORCHESTRATOR=""
```

**For seed-node:**
```bash
PARAM_SOURCE_DIR="/usr/cudos"
PARAM_NODE_NAME="seed-node"
PARAM_HAS_ORCHESTRATOR=""
```

**For sentry-node:**
```bash
PARAM_SOURCE_DIR="/usr/cudos"
PARAM_NODE_NAME="sentry-node"
PARAM_HAS_ORCHESTRATOR=""
```

## Launch sequence

1. Create a backup
    
    <em>Note:</em> Creating of a backup could take a lot of time. It is very important to do it ONCE upgrade hight has been reached NOT before that. Make sure there is no error messages in the console. If something went wrong you can always re-create the backup. Make sure that the backup is correct (You can check it using <em>Validate a backup</em>) before proceeding to the next step.

2. Validate

    <em>Note:</em> The validate command will print the information about current node. Read it carefully and proceed with the next step only if this information is valid. If it is not valid, please contact CUDOS and make the appropriate changes. If the changes invole any of the previously backup-ed files, you must re-create the backup.

3. Upgrade

    <em>Note: </em> The upgrade could take up to 20min. If there is any error message during the upgrade you must restore a backup (using <em>Restore a backup</em>) and start over.



## Backup
The backup script has four usages:

### Create a backup
The command below creates a backup of current source files and data files.
``` bash
sudo ./src/backup.sh create
``` 

### Restore a backup
The command restores a backup that has been created using Create a backup
``` bash
sudo ./src/backup.sh restore
```

### Validate a backup
The command validates whether a created backup using Create a backup is valid
``` bash
sudo ./src/backup.sh validate
``` 

### Clean a backup
The command deletes previously created backup using [Create a backup](##Create-a-backup)
``` bash
sudo ./src/backup.sh clean
```

## Upgrade the network

## Node

Node script has following usages:

### Validate the config/setup
The command check for installed binaries, config files, repos, etc.
```
sudo ./src/node.sh validate
```

### Perform an upgrade
The command upgrades a node
```
sudo ./src/node.sh upgrade
```

### Perform an upgrade bypassing the exporting and migrating of the genesis
The command upgrades a node by using an external genesis. This option cannot be used unless the upgraded network has started producing blocks
```
sudo ./src/node.sh upgrade-with-predefined-genesis
```


# Run the upgrade

**UPGRADE PROCEDURE**

1. Create a backup
2. Upgrade the network
3. If everything runs successfully then clean the backups, otherwise get in touch with us.


**EXAMPLE Command sequence**

```
sudo ./src/backup.sh create 
sudo ./src/backup.sh validate

sudo ./src/node.sh validate
sudo ./src/node.sh upgrade

sudo ./src/backup.sh clean
```



Please be aware that a necessary part of this upgrade is a change to the Chain ID from `cudos-testnet-public-2` to `cudos-testnet-public-3`, this is common practice for Cosmos-based chains. Note that some old docs may refer to the old Chain ID.
