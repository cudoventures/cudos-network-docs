---
title: Developer Setup
---

# Developer setup

This section explains how to set up a local full node for developing purposes, as well as seed and sentry nodes, and how to create wallets from the command line and send transactions to the network.
Note that running just a full node is enough to be able to create wallets, send transactions, deploy and interact with smart contracts, mint NFTs, etc.

## Initialize and start a testnet full node

As a developer, you can initialize and start a full node with the following steps:

1. Navigate to the directory *CudosBuilders/docker/full-node*
2. Find the file **full-node.env.example** and create a copy of it
3. Rename the copied file to **full-node.client.testnet.public01.env**
4. Open the file, which you renamed, **full-node.client.testnet.public01.env** in any editor
5. Find the **"MONIKER"** attribute and set it to your desired name (`MyFullNodeName` in the example below), and set the flag **"SHOULD_USE_GLOBAL_PEERS"** to `true`:

```
MONIKER=MyFullNodeName
SHOULD_USE_GLOBAL_PEERS=true
```

6. Leave other variables such as "PERSISTENT_PEERS" and "SEEDS" empty and save the changes that you made to the file
7. Make sure that you are still in the correct directory **CudosBuilders/docker/full-node**
8. Initialize the node by running this command

```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f init-full-node.yml -p cudos-init-full-node-client-testnet-public-01 up --build
```
9. Start your node
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f start-full-node.yml -p cudos-start-full-node-client-testnet-public-01 up --build --detach
```
::: tip
For subsequent launches, you can run the command without the `--build` flag at the end of the line.
This will be faster, because it will use the already build container.
Similarly, you can drop the `--detach` flag if you want to see the sync process of your node.
If you do, you can simply stop the node by pressing `ctrl+c` on your terminal window.
:::

If all steps are completed successfully, you should see a newly generated folder called **CudosData** at the same directory where you placed *CudosBuilders* and *CudosNode*. The subdirectory *cudos-data-full-node-client-testnet-public-01* of **CudosData"** folder has a file called **tendermint.nodeid**. This file contains your node **Id,** to see your node id you can open this file in any code editor and you will get one line that represents your node id such as 13f359c90582b12e291311980a855854668d80pc.

## Create an account

After your full node is up and running, you can use it to create an account in the network.
That will provide you with a wallet address, which you will be able to use to send transactions and store tokens.
The details of that account will be stored in your [keyring](https://docs.cosmos.network/master/run-node/keyring.html), which you can also use to export your account into your Keplr wallet and, conversely, import an account created in Keplr into it.

There are different locations where you private keys can be stored.
In the keyring, these are called backends.
We recommend using the `os` backend, which in the case of our public testnet will need to be specified in the commands.
If you are planning on using the same accounts in mainnet, we strongly recommend using the `os` backend already, as it will store the private keys more securely.
If you only want to do some quick testing, you can leave out the backend flag, but please keep in mind that your private keys will not be encrypted.

In order to create an account, first you need to locate the container ID of your full node.
You can find that by opening a terminal, listing your Docker containers,

```bash
docker container ls
```

Copy into the clipboard the container ID of the running container that has a name similar to `cudos-start-full-node-client-testnet-public-01`, and then open a shell into the container with the following command

```bash
docker exec -it <containerID> bash
```

You are now inside the Docker container of the full node, and you can execute any of the available `cudos-noded` commands.

:::tip
If at any point you are unsure of the available `cudos-noded` commands you can run, what to set the flags or parameters to, or want more information, you can always run the command with the `--help` flag and you will be provided with more details.
:::

To create an account, simply run the following command in the Docker container

```bash
cudos-noded keys add <myKeyName> --keyring-backend os
```

where `<myKeyName>` is a name you can choose for your account.
Please note that the first time you use the `os` backend you will need to set your password.
After that, you will be prompted to introduce your password every time.

The above command will create the account for you, and will return an output similar to

```bash
- name: <myKeyName>
  type: local
  address: cudos1apztmf49642hz559s20rdxtvtkexlpqj365u29
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"Ao7Qfxqc7fgq4UBVLIMgxQgBtAR5DBV0mm2ZvtSv05rO"}'
  mnemonic: ""


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

task reward peace glance become alley number rice fiscal route pig tennis orange together delay social crunch assist absurd wreck hedgehog term grape vocal
```

The last line of the output is the mnemonic of your account, which you should keep in a safe place.
You will need it to recover you account, or also to import it somewhere else.

This has now added an account into your [keyring](https://docs.cosmos.network/master/run-node/keyring.html).
If you run it again with a different key name, it will add another account in your keyring.
In order to see all the accounts stored in your keyring you can run the following command:

```bash
cudos-noded keys list --keyring-backend os
```

Please note that this will only show the accounts added to the `os` backend.
If you add any to, say, the `test` backend, you need to run the above instruction again but with the `test` backend.

## Importing a Keplr account into your keyring

If you have followed the steps described in the [Keplr setup page](/build/account-setup.html#installing-keplr), and created a wallet there which you now want to import into your keyring in order to send transactions with, you can do so by simply running the following command

```bash
cudos-noded keys add <myKeyName> --recover --keyring-backend os
```

where `<myKeyName>` is the name you can choose for this account in your keyring (it can be different from the one you have assigned in Keplr).
Running this command will prompt you with the following request

```bash
> Enter your bip39 mnemonic
```

The next step is then to paste the mnemonic of your wallet, which can be found in your Keplr extension by
1. Going to the account page (clicking at the person icon at the top right)
2. Clicking the three dots in the account you want to export
3. Clicking on "View Mnemonic Seed"
4. Introducing your password
5. Copying your seed phrase

As described above, you can check that you have imported your wallet successfully by checking that it has been added to your keyring,

```bash
cudos-noded keys list --keyring-backend os
```

## Exporting a wallet's private key

In order to get the private key of a wallet, you can simply run

```bash
cudos-noded keys export <myKeyName> --keyring-backend os
```

and choose a password (minimum 8 characters) when asked for a passphrase to encrypt the exported key.

## Initialize and start a Sentry node in testnet

As a developer, you can initialize and start the Sentry node as the following:

1. Navigate to the directory *CudosBuilders/docker/sentry-node*
2. Find the file **sentry-node.env.example** and create a copy of it
3. Rename the copied file to **sentry-node.client.testnet.public01.env**
4. Open the file, which you renamed, **sentry-node.client.testnet.public01.env** in any editor
5. Find  the **“MONIKER”** attribute and set a name to it as the following:
```
MONIKER=MySentryNodeName
```
6. Initiliaze the node by running this command:
```
sudo docker-compose --env-file sentry-node.client.testnet.public01.arg -f init-sentry-node.yml -p cudos-init-sentry-node-client-testnet-public-01 up --build
```
7. Start the node by running this command:
```
sudo docker-compose --env-file sentry-node.client.testnet.public01.arg -f start-sentry-node.yml -p cudos-start-sentry-node-client-testnet-public-01 up --build --detach
```

## Initialize and start a Seed node in testnet

As a developer, you can initialize and start the Seed node as the following:

1. Navigate to the directory *CudosBuilders/docker/seed-node*
2. Find the file **seed-node.env.example** and create a copy of it
3. Rename the copied file to **seed-node.client.testnet.public01.env**
4. Open the file, which you renamed, **seed-node.client.testnet.public01.env** in any editor
5. Find  the **“MONIKER”** attribute and set a name to it as the following:
```
MONIKER=MySeedNodeName
```
6. Initiliaze the node by running this command:
```
sudo docker-compose --env-file seed-node.client.testnet.public01.arg -f init-seed-node.yml -p cudos-init-seed-node-client-testnet-public-01 up --build
```
7. Start the node by running this command:
```
sudo docker-compose --env-file seed-node.client.testnet.public01.arg -f start-seed-node.yml -p cudos-start-seed-node-client-testnet-public-01 up --build --detach
```
