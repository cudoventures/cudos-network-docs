# Phase 4 instructions Step 1

This section describes the first steps needed for validator setup as part of the Phase 4 testnet launch.


## Prerequisites
 

You need to have a local copy of our build tools.

Setup your environment

Create your main Cudos directory. On the first row you can define where all Cudos data will be stored.

```
CUDOS_DIR = "/usr/cudos"
mkrid $CUDOS_DIR

git clone --branch cudos-master https://github.com/CudoVentures/cudos-builders.git CudosBuilders
```

## Nodes initialization

### Initialize the Validator
Go into the newly created CudosBuilders directory and make sure the init.sh can be executed.
```
cd CudosBuilders
sudo chmod +x ./tools-bash/constructor/src/init.sh
```
Copy the ${$CUDOS_DIR}/cudos-builders/tools-bash/constructor/config/init.env.example and rename it to init.env. Example content of the file: 

```
PARAM_SOURCE_DIR="${CUDOS_DIR}}" // is where the repos will be cloned and the binary compiled. It should be an existing and empty folder. The same you created above
PARAM_VALIDATOR_MNEMONIC="<KEY>" // the private key of the account you want to use for your validator.
PARAM_KEYRING_OS_PASS="<PASS>" // the password of your keyring
```

// TODO describe the process for ledger use


Now it's time to init your node. 


You can ether initialize validator standalone node or a validator cluster:

Standalone validator
```
cd ${WORKING_DIR}/cudos-builders/tools-bash/constructor
./src/init.sh standalone-validator-node
```
or validator cluster
```
cd ${WORKING_DIR}/cudos-builders/tools-bash/constructor
./src/init.sh clustered-validator-node
```

The command will use the configuration you have setup in the previous step and build the needed binaries. Successfull run should print someting like: 
<img src="./init-full.png" width="500">


If you see any additional messages or error please reffer to the troubleshooting section.


## Genesis submition

Once your validator is running you should get it's genesis. It is located under /usr/cudos/CudosBuilders/tools-bash/constructor/exports on your machine. To get the file of the you can use 

```
GENESIS=$(ls /usr/cudos/CudosBuilders/tools-bash/constructor/exports)
cat $GENESIS

```
Once you get the file contents submit them as a json file in https://github.com/CudoVentures/cudos-gentx. The name of the file should match the moniker of your validator node.

# Things to keep in mind
1. The folder you use for a node needs to be created and empty. You will get errors otherwise.
2. If you are running more than one node on a same server, you might not be able to create the docker, because they will try to ppen the same ports.


# Troubleshooting
