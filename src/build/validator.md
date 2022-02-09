---
title: Validator Setup Instructions
---

::: warning Note
This page has been depreciated, please refer to the new docs by browsing the navigation menu bar to the left.
:::

# Validator Setup Instructions (v0.3)

# Updates 21/10/2021

Find the full list of latest updates:
- Validator mechanics outlined in full
- Unjail a Validator command added
- Validator account types described

# Updates 14/10/2021

Find the full list of latest updates:

Update the section [Cudos Validator node and Orchestrator](/build/validator.html#cudos-validator-node-and-orchestrator)

# Updates 22/09/2021
<!---
Find the full list of latest updates:
1. Add new section [How to separate your running nodes](/build/validator.html#how-to-separate-your-running-nodes)
2. Update the parameter **PRIVATE_PEERS** in the step 6 within the section [Configure and start the Sentry node as a validator](/build/validator.html#configure-and-start-the-sentry-node-as-a-validator)
3. Update the parameter **PRIVATE_PEERS** in the step 6 within the section [Configure and start the Seed node as a validator](/build/validator.html#configure-and-start-the-seed-node-as-a-validator)
4. Update the [Ethereum full-node](/build/validator.html#ethereum-full-node) section with the [standard recommendation and specification](https://ethereum.org/en/developers/docs/nodes-and-clients/#recommended-specifications)
5. Add new section [How to delete a current running node](/build/validator.html#how-to-delete-a-current-running-node)
6. Update the section [hardware requirements](/build/validator.html#hardware-requirements)

## Validator Setup

### How to separate your running nodes

As explained in the article [Types of Nodes](/learn/validators.html#types-of-nodes) there are three types of nodes: Full, Sentry, and Seed node.

In order to have a secure and running network, you will need to run each of the following nodes on a separate and different machine:

1. Validator Full node
2. Sentry node on a separate local machine
3. Seed node on a separate local machine

For one or more Validator nodes it is recommended to launch a layer of Sentry nodes (at least 1 Sentry node) and optionally Seed nodes with isolating the Validator node behind that layer.

You need an IP-address per node which is directly connected to the network. For example, If you have **N** validator nodes and only one Sentry node then only the Sentry node is directly connected to the network. In this case you will need a single IP-address.

The picture below shows the diagram of Validator topology:

![img](./validator-topology.jpg)

Note that if you are running the setup not for the first time, then you will need to read the section [How to delete a current running node](/build/validator.html#how-to-delete-a-current-running-node).

This article guides you through the instruction for running each one of those nodes.

### Run a Full node

Before running a node, make sure that you have followed the guide for [setting up your prerequisites and environment](/build/prerequisites.html).

To run a full node, you need to complete the following steps:

- Initialize the node
- Configure and start the node

#### Initialize the Full Node as a Validator

When you run a validator node, you play an important role in the security of a network. A validator must be secure and fault-tolerant. So it is recommended to run your validator with a layer of 1 or more sentry nodes and to isolate the validator node behind that layer. Also, you will need an IP-address per node that is connected to the network. For example, if you have 10 validator nodes and only one Sentry node then only the Sentry node will be connected to the network where you will need a single IP-address.

In total, Cudos has [three types of nodes](/learn/validators.html#types-of-nodes) and as a validator, you need to have at least:
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

#### Configure and start the Full node

Now you need to configure and start the full node. So far the full node is set to be isolated and to connect the full node to the network, it needs Sentry peers. The full node should run behind the layer of running a Seed node and a Sentry node with all necessary configuration and starting the node as a validator.

There are two different parameters for selecting the way to connect peers:

* **PERSISTENT_PEERS** are list of peers that your current node is ALWAYS connected to (usually it is the list of all sentry nodes). It contains a list of comma separated peers that you will always want to be connected to.
* **PRIVATE_PEERS** are list of peers that your current node does not share and it is totally private. For example - the Sentry/Seed node MUST set its validator (if available) as a private peer in order to avoid sharing your validator's id/ip to the rest of the network. So it is a comma-separated list of node ids that will not be exposed to other peers which can be filled with a validator’s node id.

The full node must communicate only through the created layer of peers. To achieve that, you will need to apply the following steps:

1. [Run a Sentry node](#run-a-sentry-node), configure, and start it as a validator
2. [Run a Seed node](#run-a-seed-node), configure, and start it as a validator. This is an optional recommended step.
3. Get the Sentry and Seed **node ids** and add them inside the file **full-node.client.testnet.public01.env**. Leave the variable _SEEDS_ empty if you do not have seed nodes. If you have more than one Sentry or Seed node, you can separate them by a comma within the variable _PERSISTENT_PEERS_:
```
PERSISTENT_PEERS=<sentry-node1-id>@<sentry-node1-ip>:26656,<sentry-node2-id>@<sentry-node2-ip>:26656
SEEDS=<seed-node1-id>@<seed-node1-ip>:26656,<seed-node2-id>@<seed-node2-ip>:26656
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

### Run a Sentry node

Before running a node, make sure that you have followed the guide for [setting up your prerequisites and environment](/build/prerequisites.html).

To run a sentry node, you need to configure and start the node.

#### Configure and start the Sentry node as a validator

1. Navigate to the directory *CudosBuilders/docker/sentry-node*
2. Find the file **sentry-node.env.example** and create a copy of it
3. Rename the copied file to **sentry-node.client.testnet.public01.env**
4. Open the file, which you renamed, **sentry-node.client.testnet.public01.env** in any editor
5. Find  the **"MONIKER"** attribute and set a name to it as the following:
```
MONIKER=MySentryNodeName
```
6. Paste the full node's nodeId in the **PRIVATE_PEERS** line. If there are multiple full nodes ids, separate them by a comma such as:
```
PRIVATE_PEERS=<full-node1-id>@<full-node1-ip>:26656,<full-node2-id>@<full-node2-ip>:26656
```
7. Make sure that you are still in the correct directory **CudosBuilders/docker/sentry-node**
8. Initialize the node by running this command:
```
sudo docker-compose --env-file sentry-node.client.testnet.public01.arg -f init-sentry-node.yml -p cudos-init-sentry-node-client-testnet-public-01 up --build
```
9. Start the node by running this command:
```
sudo docker-compose --env-file sentry-node.client.testnet.public01.arg -f start-sentry-node.yml -p cudos-start-sentry-node-client-testnet-public-01 up --build --detach
```

Note that you can see the logs by running the command:
```
sudo docker logs -f cudos-start-sentry-node-client-testnet-public-01
```

### Run a Seed node

Before running a node, make sure that you have followed the guide for [setting up your prerequisites and environment](/build/prerequisites.html).

To run a seed node, you need to configure and start the node.

#### Configure and start the Seed node as a validator

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
PRIVATE_PEERS=<full-node1-id>@<full-node1-ip>:26656,<full-node2-id>@<full-node2-ip>:26656
```
7. Make sure that you are still in the correct directory **CudosBuilders/docker/seed-node**
8. Initialize the node by running this command:
```
sudo docker-compose --env-file seed-node.client.testnet.public01.arg -f init-seed-node.yml -p cudos-init-seed-node-client-testnet-public-01 up --build
```
9. Start the node by running this command:
```
sudo docker-compose --env-file seed-node.client.testnet.public01.arg -f start-seed-node.yml -p cudos-start-seed-node-client-testnet-public-01 up --build --detach
```

Note that you can see the logs by running the command:
```
sudo docker logs -f cudos-start-seed-node-client-testnet-public-01
```

## Create a Validator

In order for your cudos node to act in the role of Validator, it will need bring together the Validator server with the 3 wallets identified above. It will require:

1. A running Cudos Full node, which has the validator configuration.

Only after finalising previous steps, you can start the process of staking to the node, making it a fully functional validator node. this section explains how to achieve each step in detail.

#### Accounts

There are 3 types of accounts and addresses inherited from Cosmos SDK:
1. Account address: Starting with the `cudos` prefix. These are standard address types seen across the network and used by anyone.
2. Validator address: Starting with the `cudosvaloper` prefix. These are Validator addresses which are generated when a new Validator is created. They can be queried using the `cudos-noded q staking validators` command.
3. Consensus node address: Starting with `cudosvalcons`. These addresses are used by Tendermint. They are created when a node is initialized.

Cosmos SDK does not allow you to create more than 1 validator address from a single account address. So you cannot make either a double-signing error nor can you share a single account address to different Validator nodes.

### Cudos Validator node

#### Executing "cudos-noded" commands

The cudos-noded service is a single binary running inside a docker container. It cannot be called directly from the main operating system. To do so requires either running the "docker" command with the command at issue on the end eg:

```
sudo docker exec -it cudos-start-full-node-client-testnet-public-01 <My Command>
```

The above will run the command "<My Command>" in the docker context, ie inside the container. Or an interactive prompt can be produced by calling:

```
# Access the container, that is needed to connect to its bash, directly with its name This will run the command "bash" inside the docker container "cudos-start-full-node-client-testnet-public-01". Note that the "-it" flags ensure that the bash prompt that will then be visible is usable in the normal way. In order to script the above, different choices would be needed.

sudo docker exec -it cudos-start-full-node-client-testnet-public-01 bash
```

#### Checking the state of the seed and sentry nodes

This section requires that the section [running Cudos full-node as a validator](#validator-setup) has already been completed.

After starting the validator and ethereum nodes, the chain will begin to sync to the network. The time to sync to the network will vary depending on your setup and the current size of the blockchain, but could take a very long time (up to 12 hours or more). To query the status of your node, run the command:

```
# To determine the value of the status variable "catching_up"

sudo docker exec -ti cudos-start-full-node-client-testnet-public-01 cudos-noded status | jq '.SyncInfo.catching_up'

# To determine the "block height". For reference, the current block height is in excess of 663000 If "catching_up" is "**true"**, then the machine is not ready and will need a period of 12 hours or more before it will be ready for staking.

sudo docker exec -ti cudos-start-full-node-client-testnet-public-01 cudos-noded status | jq '.SyncInfo.latest_block_height'
```

#### Stashing the wallet keys

The next step is to stash the wallet address (mnemonic) in the validator node's internal keychain.

For this the following information is required:

- The mnemonic of the Keplr wallet designated for use with the validator

The "mnemonic" of the keplr wallet is the long string of random words that is generated when the wallet was first created, and that is used subsequently open the wallet. This string is both the password to get the wallet open and the location of the wallet, it is both the address and the password combined. Use of copy/paste is advised to enter this value.

- The validator's keychain passphrase

The validator has an internal keychain used to hold such things as, in this case, the mnemonic of the wallet it should use. If this is the first time the validator's internal keychain has been used it will not have a passphrase set and will require one when the command is run. If this is the second or subsequent time, the wallet is already locked and will require the same passphrase that was previously used to create the keychain.

In the case where the keychain has not previously been used, the passphrase will be requested twice as a precaution. On subsequent occasions it only requires the user to enter this value once to open the existing wallet.

It is advised that the user generate this ahead of time and note it down with the keplr mneminics (one each for the validator). The use of such tools as "pwgen" is advised along with copy/pasting to enter the passphrase, as it should be a long random string.

The command itself should be executed as is. The "wallet name", in this case "validator" (the 3rd option below) can be any name, the name is reused further on in this process, so it is advised to stick to the name "validator" for this wallet link.

Run the command:
```
# Add the wallet in your nodes' keyring:
cudos-noded keys add validator --recover --keyring-backend="os"
```

If the command returns without error and produces something like the following, then the process is complete and the keychain is now loaded with the validator wallet address:
```
- name: validator
  type: local
  address: cudos17g4kjshkjhuhfvihhns9e36epgs9yxpz8k
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AxuisjteQw5ZNchnFk0nXsdknchefygeirfgIWeC"}'
  mnemonic: ""
```

#### The staking process

This step, if successful, will put the node on the list of validators at:
[https://explorer.cudos.org/validators](https://explorer.cudos.org/validators)

In this section of the process the validator node will need to be supplied with the staking request using a cudos-noded sub-command, done in this case using a number of environment variables on the command line:

- **CHAIN_ID**, This is a fixed text naming the blockchain to be operated on. In the public testnet this name is "cudos-testnet-public-2"

- **STAKE**, The actual amount in "acudos" that will be staked to the validator. Note that *acodos* is a very small denomination. Be very careful about the number of zeros in the amount. For example "1000000000000000000acudos" = 1 CUDOS.

Note that This command must be run within the docker container. Use the following command to start a bash shell within the container:

```
sudo docker exec -it cudos-start-full-node-client-testnet-public-01 bash
```

It is then advised that the following be copy/pasted into the shell prompt created by the above.

```
export STAKE="1000000000000000000acudos"
export CHAIN_ID="cudos-testnet-public-2"

cudos-noded tx staking create-validator --amount=$STAKE \
    --from=validator \
    --pubkey=$(cudos-noded tendermint show-validator) \
    --moniker=$MONIKER \
    --chain-id=$CHAIN_ID \
    --commission-rate="0.10" \
    --commission-max-rate="0.20" \
    --commission-max-change-rate="0.01" \
    --min-self-delegation="1" \
    --gas="auto" \
    --gas-prices="0.025acudos" \
    --gas-adjustment="1.80" \
    --keyring-backend="os" \
    -y
```

This command will request the validator keyring passphrase. This will not be the first time the keychain has been used. It will at least contain the validator's keplr wallet mnemonic, so it will only ask for the passphrase once, and then it has all it needs to complete the transaction.

:::tip
Note that if you get a message that the transaction is not included in any block, please wait a few seconds and do not start another transaction.
:::

If you get a message along the lines of:
```
Error: rpc error: code = NotFound desc = rpc error: code = NotFound desc = account cudos1mnc7gm9sazrmcfdkshhmx3f0s4n2wp944wzjj4 not found: key not found
```

Then it is likely that either the validator node hasn't actually caught up with the blockchain sync operation yet (so the validator can't find the block in the blockchain in which the keplr wallet took in its funds), or the validator keplr wallet has insufficient funds to cover the transaction, or both.

If the command succeeds, you should see your new validator appear on the list of validators referenced above. Do ensure that you also check the **"Inactive"** tab as well, as there may be a problem with the machine that prevents it from being active.

If you see the transaction hash without getting any error, then congrats you have successfully created a validator account.

### Send funds using the gravity bridge

#### Using the gravity bridge UI

Open [Gravity Bridge](http://35.192.177.142:4000/). Then you can use [Kelpr](https://wallet.keplr.app/) and [Metamask](https://metamask.io/) for sending funds between the two blockchains.

## How to change your Validator fee

In order to change your Validator's fee

1. Start your Docker shell

2. Execute the following command:
```
cudos-noded tx staking edit-validator \
--from=validator \
--chain-id=$CHAIN_ID \
--commission-rate="0.50" \
--keyring-backend="test" \
-y
```
where you can set `commission-rate` to the updated number that you want.

You can check your current Validator's fee by running
```
cudos-noded q staking validators > validatorsInfo.txt
```
and reading the value assigned to `commission-rate` for your Validator.

## How to delete a current running node

If you stop the docker container that is running a Full node then you are not able to use it. But if you want to remove the full node docker data then you need to clear the volume of full node docker, if you remove the folder it will remove all the data but make sure first that you stop the docker container.

Clear the volume of full node docker:
* Navigate and open the file **CudosBuilders/docker/full-node/full-node.client.testnet.public01.arg**
* Find the var **VOLUME_NAME=cudos-data-full-node-client-testnet-public-01** and clear it
* Navigate to the file **CudosBuilders/docker/full-node/start-full-node.yml**
* Find the one volume field
volumes: **- '../../../CudosData/$VOLUME_NAME:$CUDOS_HOME'**
* Above **VOLUME_NAME**  is mapped with this **../../../CudosData/$VOLUME_NAME**, clear it

Remove the folder:
Navigate to the folder **CudosData**, you may find a folder known as **cudos-data-full-node-client-testnet-public-01**, this is the folder which store all data of full node and needs to be removed.
--->
## Secure your node

Setting up a Cudos Node is the starting point for any user wanting to interact with, and play a greater part in, the network. In order to set up a Cudos node, users will require the use of Go/Golang version 1.15 or higher. On-premise or bare metal server providers such as OVH, Leaseweb, IBM, Alibaba, Amazon Web Services, Google Cloud Computing platform, or Microsoft Azure, can be used to generate Cudos nodes and join the Cudos Network.

Once the appropriate hardware and software requirements are met, users will then need to install the Cudos Network’s high-performance compute blockchain through version control systems such as Github or use the network’s release tags and build from source. The Cudos Network application is the application that defines the Cudos Network and its special purpose compute workflows.

This application consists of a Cudos Network daemon and command-line interface that, once deployed, runs a full-node version of the Cudos Network blockchain for users to interact with. This bespoke implementation supports innovations such as Inter-Blockchain Communication (IBC) protocol to guarantee high levels of reliability and cross-chain interactions inspired by the network’s computing capabilities. This Cudos Network blockchain additionally leverages the most vetted modules within the Cudos community such as staking, authentication, and governance logic. It also includes special blockchain components and developer toolchains linked to its unique set of high-performance compute use cases and development workflows.

### Recommendations for securing a Validator node

Cudos Validating nodes are Cosmos SDK-specified full nodes. This allows for a heavier-duty set of transaction processing workflows and network-level security exchanges with other members of the network. When setting up a Cudos Network Validator node, Validators will have to decide whether they want to be fully responsible for Key Management or if they want to leverage third-party infrastructure to do so. The Cudos Network blockchain leverages the Tendermint Key Management System in order to ensure high availability access to signing keys as part of the Cudos Network’s block processing workflows. This additionally allows this blockchain to prevent double-signing events. In practice, this feature allows for the tamper-proof storage of Hardware Security Module (HSM) Validator keys, even if the host has been compromised. If choosing to implement an HSM, the Validator should review that HSM's documentation in conjunction with the Tendermint KMS requirements, to ensure suitable compatibility before finalising a choice about this part of the security architecture.

An additional security and availability consideration is the use of one or more sentry nodes between a Validator node and the public internet. This mechanism is used to place a layer of separation between the security-sensitive Validator node, and would-be sources of attack.

Such attack types can include things like traffic-volume-based distributed denial-of-service (DDoS) attacks, designed to starve the Validator of available bandwidth in servicing legitimate usage, as well as malformed/spam message attacks, intended to consume processing or storage resources on the Validator, or induce unintended behaviour.

We currently recommend the use of one sentry node whose exterior faces the public internet, with its interior attached to a private internal network. The Validator node then is connected solely to the private internal network, therefore allowing the proxying of all requests to and from the Validator via the sentry. Additionally, we recommend that the sentry's internet connection is further protected by a provider-managed firewall and DDoS-mitigation service.

![](./Security.png)

As previously indicated in the node minimum hardware requirements, our favoured recommendation is to implement discrete physical servers for the Validator and sentry. Using that specification, the separation of public internet and private internal network may be achieved either through physically separated interfaces, or a VLAN-based configuration.

It is technically possible to use a hypervisor on a single physical server, with system VMs for each of the Validator and sentry roles, and to use virtual networking to create the recommended security topology. We do not discourage this approach, but do strongly recommend a thorough understanding of the prospective security and performance considerations prior to implementation.

An extension of the sentry node architecture optionally sees a Validator operator adding additional sentries. For those concerned about risks such as DDoS attacks consuming all bandwidth into the single recommended sentry, it is possible to add further sentries, optionally across multiple discrete geographies with independent internet connections. The private internal network for connection between sentries and the Validator would then need to be stretched out to these.

Beyond the set up of a server, a node, an authenticated way of joining the Cudos blockchain using our in-built public key infrastructure, in coordination with Ledger HSM or YubiHSM for those Validators choosing to implement them, the use of full nodes when interacting the network is highly recommended. We plan to implement the ability for Cudos Validator Nodes to store a history of previously signed blocks in order to more seamlessly prevent double-signing by adverse or deficient nodes in the Cudos Network. This feature is currently absent in earlier-generation Tendermint blockchains. The final element keeping Cudos Network Validating nodes safe is the Tendermint Core Byzantine Fault Tolerant Proof of Stake consensus algorithm.

## Hardware requirements

The below hardware requirements are based upon extrapolating Cosmos minimums into our observations of an under-continuing-development testnet environment. Our ongoing performance and capacity monitoring may highlight needed changes as development continues, and so the requirements should be considered subject to revision.

Our requirements design does factor in additional room to grow, and considers the additional value-add features that the Cudos network will incorporate over and above a simple Tendermint-based network.

### Cudos mainnet ("Ingenii") Validator node

* Intel Xeon ('Skylake-SP' or newer) processor ‑or‑ AMD Epyc ('Naples' or newer) processor – Requires SGX ‑or‑ SEV feature – Minimum model ≥8 cores at ≥2.0 GHz required (≥16 cores preferred)
* 32GiB ECC system memory (≥64GiB preferred)
* ≥2TB NVMe SSD - RAID1 or better resilience required (RAID 1+0 performance preferred) – High DWPD/TBW endurance drives strongly recommended
* Redundancy of server power and cooling components strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 'Four‑nines' availability target or better
* Linux Debian 10 recommended

### Cudos mainnet ("Ingenii") Sentry node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required (≥8 cores preferred)
* ≥16GiB ECC system memory
* ≥1TB NVMe SSD - RAID1 or better resilience required
* Redundancy of server power and cooling components strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 1Gb/s internet connection (≥2.5Gb/s preferred)
* Publicly accessible IPv4 address (additionally IPv6 recommended)
* Anti-DDoS protection strongly recommended
* 'Four‑nines' availability target or better
* Linux Debian 10 recommended

### Cudos mainnet ("Ingenii") Seed node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required (≥8 cores preferred)
* ≥16GiB ECC system memory
* ≥1TB NVMe SSD - RAID1 or better resilience required
* Redundancy of server power and cooling components strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 'Four‑nines' availability target or better
* Linux Debian 10 recommended

### Cudos mainnet ("Ingenii") Ethereum node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required
* ≥16GiB ECC system memory
* ≥2TB NVMe SSD - RAID1 or better resilience required
* Redundancy of server power and cooling components strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 100Mb/s internet connection or better
* 'Four‑nines' availability target or better
* Linux Debian 10 recommended



### Cudos public testnet ("Somniorum") Validator node

* Intel Xeon ('Skylake-SP' or newer) processor ‑or‑ AMD Epyc ('Naples' or newer) processor – Requires SGX ‑or‑ SEV feature – Minimum model ≥8 cores at ≥2.0 GHz required
* ≥32GiB ECC system memory
* ≥1TB NVMe SSD
* Private 1Gb/s internal network for peer node connections
* Linux Debian 10 recommended

### Cudos public testnet ("Somniorum") Sentry node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required
* ≥16GiB ECC system memory
* ≥500GB NVMe SSD
* Private 1Gb/s internal network for peer node connections
* 100Mb/s internet connection (≥1Gb/s preferred)
* Publicly accessible IPv4 address (additionally IPv6 recommended)
* Linux Debian 10 recommended

### Cudos public testnet ("Somniorum") Seed node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required
* ≥16GiB ECC system memory
* ≥500GB NVMe SSD
* Private 1Gb/s internal network for peer node connections
* Linux Debian 10 recommended

### Cudos public testnet ("Somniorum") Ethereum node

- Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor -* Minimum model ≥4 cores at ≥2.0 GHz required
* ≥16GiB ECC system memory
* ≥1TB NVMe SSD
* Private 1Gb/s internal network for peer node connections
* 100Mb/s internet connection or better
* Linux Debian 10 recommended

Note that while we only provide specifications for dedicated physical hardware nodes for each of mainnet and testnet, we do not discourage validator operators who choose to identify virtual equivalents.

At this time, we do not provide detailed storage IOPS/throughput or network PPS/bandwidth minimums. As the testnet evolves, we will share our observations of real-world statistics, to hopefully assist virtualised environment operators with right-sizing their deployments.


