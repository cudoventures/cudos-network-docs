---
title: Developers Setup version 0.1
---

## Initialize and start Full node

As a developer, you can initialize the full node as the following:

1. Navigate to the directory *CudosBuilders/docker/full-node*
2. Find the file **full-node.env.example** and create a copy of it
3. Rename the copied file to **full-node.client.testnet.public01.env**
4. Open the file, which you renamed, **full-node.client.testnet.public01.env** in any editor
5. Find both the **"MONIKER"** attribute and the flag **"SHOULD_USE_GLOBAL_PEERS"** and set them as the following :

```
MONIKER=MyFullNodeName
SHOULD_USE_GLOBAL_PEERS=true
```

6. Leave other variables such as "PERSISTENT_PEERS" and "SEEDS" empty and save the changes that you made to the file.
7. Make sure that you are still in the correct directory **CudosBuilders/docker/full-node**
8. Initialize the node by running this command:

```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f init-full-node.yml -p cudos-init-full-node-client-testnet-public-01 up --build
```
9. Start your node
```
sudo docker-compose --env-file full-node.client.testnet.public01.arg -f start-full-node.yml -p cudos-start-full-node-client-testnet-public-01 up --build --detach
```

If all steps are completed successfully, you should see a newly generated folder called **CudosData** at the same directory where you placed *CudosBuilders* and *CudosNode*. The subdirectory *cudos-data-full-node-client-testnet-public-01* of **CudosData"** folder has a file called **tendermint.nodeid**. This file contains your node **Id,** to see your node id you can open this file in any code editor and you will get one line that represents your node id such as 13f359c90582b12e291311980a855854668d80pc.

## Initialize and start Sentry node

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

## Initialize and start Seed node

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

## Deployment and interaction of CW20

### Overview

CW20 is equivalent to ERC20 **.** CW-20 is similar, in some respects, to bitcoin, Litecoin, and any other cryptocurrency; CW-20 tokens are blockchain-based assets that have value and can be sent and received. The primary difference is that instead of running on their own blockchain, CW-20 tokens are issued on the CosmWasm network.

This section explains how to deploy and interact with CW20 using cudos-noded.

### Functions present in CW20 base standard

### Actions

- **mint**

Mint token to recipient and caller must be minter

- **transfer**

Transfer tokens to recipient from caller&#39;s address

- **burn**

Destroy token present inside caller&#39;s wallet

- **increaseAllowance**

Increase the allowance limit of spender for a given caller

- **decreaseAllowance**

Decrease the allowance limit of spender for a given caller

- **transferFrom**

Used to transfer token from src to target and caller must be the address who is pre approved by the src. Pre approve of address is done by increaseAllowance

### Queries

- **balance**

Display balance of given address

- **allowance**

Display allowance limit spender has for a given address

- **allAllowances**

Display list of all address who are allowed to spend from given owner address

- **allAccounts**

Display paginated list of all accounts with balance \&gt; 0

- **tokenInfo**

Display name and symbol of a token

- **minter**
Display a minter address for a given contract

### Download Node and Code

- Setup a CUDOS\_NODED using binary builder mentioned here [https://github.com/CudoVentures/cudos-network-docs/blob/Table-of-Content-folders/src/docs/build-and-earn/testnet-guides/start-binaries.md](https://github.com/CudoVentures/cudos-network-docs/blob/Table-of-Content-folders/src/docs/build-and-earn/testnet-guides/start-binaries.md)
- Download [cosmwasm-plus](https://github.com/CosmWasm/cw-plus) contract and compile the contracts using docker(make sure you run docker command inside the root folder)

### Compile the contracts

- Go to cosmwasm-plus folder and run the following command
```
foo@bar:~$ docker run --rm -v "$(pwd)":/code \
--mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
--mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
cosmwasm/workspace-optimizer:0.11.3
```

### Deployment And Instantiation

1. Set environment variables

```
foo@bar:~$ RPC="http://localhost:26657"
foo@bar:~$ CHAIN_ID="localnet"
foo@bar:~$ export NODE="--node $RPC"
foo@bar:~$ export TXFLAG="${NODE} --chain-id ${CHAIN_ID} --gas auto --gas-adjustment 1.3"
foo@bar:~$ export KEYRING="--keyring-backend test --keyring-dir $HOME/.wasmd_keys"
```

1. Compilation will take some time and will provide you with artifacts folder in the root
2. Upload the contract on the chain

**main is the human readable account which is already added by wasmd**

**using command**
**wasmd keys add** _ **\&lt;name\&gt;** _

**Add some balance in wasm-power, bob and alice using**  [**explorer.cudos.org/faucet** ](https://explorer.cudos.org/faucet) **.**

```
foo@bar:~$ cd cosmwasm-plus/artifacts
# container id docker ps -aqf "name=binary-builder"
foo@bar:~$ docker cp cw20_base.wasm <container>:/usr/cudos
foo@bar:~$ alias CUDOS_NODED='docker exec <container> cudos-noded'

foo@bar:~$ CUDOS_NODED keys add wasm-power $KEYRING
foo@bar:~$ CUDOS_NODED keys add bob $KEYRING
foo@bar:~$ CUDOS_NODED keys add alice $KEYRING
# to view address of wasm-power, bob and alice account.
foo@bar:~$ CUDOS_NODED keys show -a <name> $KEYRING

# For eg
foo@bar:~$ CUDOS_NODED keys show -a wasm-power $KEYRING
cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75

foo@bar:~$ RES=$(CUDOS_NODED  tx wasm store artifacts/cw20_base.wasm --from main $TXFLAG -y $KEYRING)

# you can also get the code this way
foo@bar:~$ CODE_ID=$(echo $RES | jq -r '.logs[0].events[-1].attributes[-1].value')
```

1. Instantiate the contract
```
# instantiate contract and verify
foo@bar:~$ INIT=$(jq -n --arg "wasmpower" $(CUDOS_NODED keys show -a wasm-power $KEYRING --address) '{ "name": "DIZZ COIN", "symbol": "DIZZ", "decimals": 6, "initial_balances": [{ "address": $wasmpower, "amount": "1000000" }], "mint": {"minter": $wasmpower,"cap": "99900000000"}}')

foo@bar:~$ CUDOS_NODED tx wasm instantiate $CODE_ID "$INIT" \
--from wasm-power --label "CW20" $TXFLAG -y $KEYRING

# check the contract state (and account balance)
foo@bar:~$ CUDOS_NODED query wasm list-contract-by-code $CODE_ID $NODE --output json

# fetch contract address
foo@bar:~$ CONTRACT=$(wasmd query wasm list-contract-by-code $CODE_ID $NODE --output json | jq -r '.contracts[-1]')

echo $CONTRACT
```

Upto this point we have successfully deployed and instantiated contract.

### Mint CW20 Tokens

```
 foo@bar:~$ MINT=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob $KEYRING --address) '{ "mint": { "recipient": $bob, "amount": "1000000" } }')

{ "mint": { "recipient": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft", "amount": "1000000" } }

foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$MINT" \
    --from wasm-power $TXFLAG -y $KEYRING

foo@bar:~$ BALANCE_OF=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob $KEYRING --address) '{ "balance": { "address": $bob } }')
foo@bar:~$ echo $BALANCE_OF
{ "balance": { "address": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft" } }

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1000000"
```

### Transfer CW20 Tokens

**Prerequisite:**

- **Mint tokens mentioned in &quot;Mint CW20 Tokens&quot; section**

```
MINT=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob $KEYRING --address) '{ "mint": { "recipient": $bob, "amount": "1000000" } }')

{ "mint": { "recipient": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft", "amount": "1000000" } }

foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$MINT" \
    --from wasm-power $TXFLAG -y $KEYRING

foo@bar:~$ BALANCE_OF=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob $KEYRING --address) '{ "balance": { "address": $bob } }')
foo@bar:~$ echo $BALANCE_OF
{ "balance": { "address": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft" } }

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1000000"
foo@bar:~$ TRANSFER=$(jq -n --arg alice $(CUDOS_NODED keys show -a alice $KEYRING --address) '{ "transfer": { "recipient": $alice, "amount": "10000" } }')
foo@bar:~$ echo $TRANSFER
{ "transfer": { "recipient": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9", "amount": "10000" } }
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$TRANSFER" --from wasm-power $TXFLAG -y $KEYRING

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "10000"
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "990000"
```

### Increase Allowance

**Prerequisite:**

- **Mint tokens mentioned in &quot;Mint CW20 Tokens&quot; section**

```
foo@bar:~$ INCREASE_ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show -a alice $KEYRING --address) '{ "increase_allowance": { "spender": $alice, "amount": "15000" } }')
foo@bar:~$ echo $INCREASE_ALLOWANCE
{ "increase_allowance": { "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9", "amount": "15000" } }
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$INCREASE_ALLOWANCE" \
    --from wasm-power $TXFLAG -y $KEYRING
foo@bar:~$ ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show alice $KEYRING --address) --arg wasmPower $(CUDOS_NODED keys show wasm-power $KEYRING --address) '{ "allowance": { "owner": $wasmPower, "spender": $alice } }')
foo@bar:~$ echo $ALLOWANCE
{ "allowance": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75", "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE" $NODE
data:
  allowance: "15000"
  expires:
    never: {}
```

### Transfer a CW20 Tokens (via spender)

**Prerequisite:**

- **Approve the token using steps mentioned in &quot;Increase Allowance&quot; section**

```
foo@bar:~$ BALANCE_OF_SENDER=$(jq -n --arg wasmPower $(CUDOS_NODED keys show -a wasm-power $KEYRING --address) '{ "balance": { "address": $wasmPower} }')
foo@bar:~$ echo $BALANCE_OF_SENDER
{ "balance": { "address": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75" } }
foo@bar:~$ BALANCE_OF=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob $KEYRING --address) '{ "balance": { "address": $bob} }')
foo@bar:~$ echo $BALANCE_OF
{ "balance": { "address": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1000000"

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "990000"

foo@bar:~$ TRANSFER_FROM=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob $KEYRING ) --arg wasmPower $(CUDOS_NODED keys show -a wasm-power $KEYRING ) '{"transfer_from": {"owner": $wasmPower,"recipient": $bob,"amount": "5000"}}')
foo@bar:~$ echo $TRANSFER_FROM
{ "transfer_from": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75", "recipient": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft", "amount": "5000" } }
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$TRANSFER_FROM" --from alice $TXFLAG -y $KEYRING

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1005000"

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "985000"
foo@bar:~$ ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show alice $KEYRING --address) --arg wasmPower $(CUDOS_NODED keys show wasm-power $KEYRING --address) '{ "allowance": { "owner": $wasmPower, "spender": $alice } }')
foo@bar:~$ echo $ALLOWANCE
{ "allowance": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75", "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE" $NODE
data:
  allowance: "10000"
  expires:
    never: {}
```

### Decrease Allowance

**Prerequisite**

- **Mint a new token using steps mentioned in &quot;Mint CW20 Tokens&quot; section**
- **Approve the token using steps mentioned in &quot;Increase Allowance&quot; section**

```
foo@bar:~$ BALANCE_OF_SENDER=$(jq -n --arg wasmPower $(CUDOS_NODED keys show -a wasm-power $KEYRING --address) '{ "balance": { "address": $wasmPower} }')
foo@bar:~$ echo $BALANCE_OF_SENDER
{ "balance": { "address": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75" } }
foo@bar:~$ BALANCE_OF=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob $KEYRING --address) '{ "balance": { "address": $bob} }')
foo@bar:~$ echo $BALANCE_OF
{ "balance": { "address": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1005000"

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "985000"

foo@bar:~$ ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show alice $KEYRING --address) --arg wasmPower $(CUDOS_NODED keys show wasm-power $KEYRING --address) '{ "allowance": { "owner": $wasmPower, "spender": $alice } }')
foo@bar:~$ echo $ALLOWANCE
{ "allowance": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75", "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE" $NODE
data:
  allowance: "10000"
  expires:
    never: {}
foo@bar:~$ DECREASE_ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show -a alice $KEYRING) '{ "decrease_allowance": { "spender": $alice, "amount": "2000" } }')
foo@bar:~$ echo $DECREASE_ALLOWANCE
{ "decrease_allowance": { "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9", "amount": "2000" } }
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$DECREASE_ALLOWANCE" --from wasm-power $TXFLAG -y $KEYRING
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE" $NODE
data:
  allowance: "8000"
  expires:
    never: {}
```

### Burn CW20 Tokens

**Prerequisite**

- **Mint few new tokens using steps mentioned in &quot;Mint CW20 Tokens&quot; section**
```
foo@bar:~$ BALANCE_OF_SENDER=$(jq -n --arg wasmPower $(CUDOS_NODED keys show -a wasm-power $KEYRING --address) '{ "balance": { "address": $wasmPower} }')
foo@bar:~$ echo $BALANCE_OF_SENDER
{ "balance": { "address": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "980000"
foo@bar:~$ BURN='{ "burn": { "amount": "1000" } }'
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$BURN" \
    --from wasm-power $TXFLAG -y $KEYRING
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "979000"
```

### All Allowances

**Prerequisite**

- **Mint few new tokens using steps mentioned in &quot;Mint CW20 Tokens&quot; section**
```
foo@bar:~$ ALL_ALLOWANCES=$(jq -n --arg wasmPower $(CUDOS_NODED keys show -a wasm-power $KEYRING) '{ "all_allowances": { "owner": $wasmPower } }')
foo@bar:~$ echo $ALL_ALLOWANCES
{ "all_allowances": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALL_ALLOWANCES" $NODE
data:
  allowances:
  - allowance: "8000"
    expires:
      never: {}
    spender: cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9
```


### All Accounts

**Prerequisite**

- **Mint few new tokens using steps mentioned in &quot;Mint CW20 Tokens&quot; section**
```
foo@bar:~$ ALL_ACCOUNTS='{ "all_accounts": {} }'
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALL_ACCOUNTS" $NODE
data:
  accounts:
  - cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft
  - cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9
  - cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75
```