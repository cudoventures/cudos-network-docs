---
title: Smart Contracts
---

# Smart Contracts

This article explains the Deployment and interaction of CW20.

### Install rustup

First, install [rustup](https://rustup.rs/). Once installed, make sure you have the wasm32 target. This is an important step before running any contract to ensure that you are running Rust 1.51.0+ with wasm32-unknown-unknown target installed.

```
rustup --version
rustup default stable
cargo --version
rustup target list --installed
```

If the rust version is less than 1.51.0+, update all dependencies in the lockfile for cargo and rustup by running the command:
```
cargo update
rustup update
Update :
```

## Deployment and interaction of CW20

[CW20](https://github.com/CosmWasm/cw-plus/tree/v0.9.0/contracts/cw20-base) is equivalent to ERC20. CW-20 is similar, in some respects, to bitcoin, Litecoin, and any other cryptocurrency. CW-20 tokens are blockchain-based assets that have value and can be sent and received. The primary difference is that instead of running on their own blockchain, CW-20 tokens are issued on the CosmWasm network.

This section explains how to deploy and interact with CW20 using cudos-noded.

### Functions present in CW20 base standard

The specification of CW20 are represented within the following:
* [Base](https://github.com/CosmWasm/cw-plus/blob/v0.9.0/packages/cw20/README.md#base)
* [Allowances](https://github.com/CosmWasm/cw-plus/blob/v0.9.0/packages/cw20/README.md#allowances)
* [Mintable](https://github.com/CosmWasm/cw-plus/blob/v0.9.0/packages/cw20/README.md#mintable)

Note that you can find all messages, actions, and queries within the list above.

### Get the binaries and download the CosmWasm Plus contracts

* Follow the [instructions to start and build the binaries](/build/start-binaries)
* Clone the [cw-plus](https://github.com/CosmWasm/cw-plus) repo with [release tag of v0.9.0](https://github.com/CosmWasm/cw-plus/tree/v0.9.0) by running the command:
```
git clone --depth 1 --branch v0.9.0 https://github.com/CosmWasm/cw-plus.git
```

### Compile the contracts

- Navigate to cw-plus folder and run the following command:
```
foo@bar:~$ cd cw-plus
foo@bar:~$ docker run --rm -v "$(pwd)":/code \
--mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
--mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
cosmwasm/workspace-optimizer:0.12.3
```

Note that compilation will take some time and will provide you with artifacts subfolder

### Deployment and instantiation

1. Set the environment variables:

```
foo@bar:~$ RPC="https://sentry1.gcp-uscentral1.cudos.org:26657"
foo@bar:~$ CHAIN_ID="cudos-testnet-public"
foo@bar:~$ NODE="--node $RPC"
foo@bar:~$ TXFLAG="${NODE} --chain-id ${CHAIN_ID} --gas auto --gas-adjustment 1.3"
foo@bar:~$ KEYRING="os"
```

2. Create accounts

```
foo@bar:~$ docker cp artifacts/cw20_base.wasm binary-builder:/usr/cudos
foo@bar:~$ alias CUDOS_NODED='docker exec -it binary-builder cudos-noded'
foo@bar:~$ CUDOS_NODED keys add wasm-power --keyring-backend "$KEYRING"
foo@bar:~$ CUDOS_NODED keys add bob --keyring-backend "$KEYRING"
foo@bar:~$ CUDOS_NODED keys add alice --keyring-backend "$KEYRING"

# to view address of wasm-power, bob and alice account.
foo@bar:~$ CUDOS_NODED keys show -a <name> --keyring-backend "$KEYRING"

# For eg
foo@bar:~$ CUDOS_NODED keys show -a wasm-power --keyring-backend "$KEYRING"
cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75

foo@bar:~$ RES=$(CUDOS_NODED tx wasm store /usr/cudos/cw20_base.wasm --from wasm-power --keyring-backend "$KEYRING" --node "$NODE" --chain-id "$CHAIN_ID" --gas auto --gas-adjustment 1.80 -y)

# you can also get the code this way
foo@bar:~$ CODE_ID=$(echo $RES | jq -r '.logs[0].events[-1].attributes[-1].value')
```
3. Get balance

**Add some balance in wasm-power, bob and alice using** [faucet](https://explorer.cudos.org/faucet).

4. Instantiate and verify the contract:

Note that under the parameter "name" you can choose any name for your coin. For example, "Cudos coin" or as in our example below we used "DIZZ COIN".

```
foo@bar:~$ INIT=$(jq -n --arg "wasmpower" $(CUDOS_NODED keys show -a wasm-power --keyring-backend "$KEYRING" --address) '{ "name": "DIZZ COIN", "symbol": "DIZZ", "decimals": 6, "initial_balances": [{ "address": $wasmpower, "amount": "1000000" }], "mint": {"minter": $wasmpower,"cap": "99900000000"}}')

foo@bar:~$ CUDOS_NODED tx wasm instantiate $CODE_ID "$INIT" \
--from wasm-power --label "CW20" $TXFLAG -y --keyring-backend "$KEYRING"

# check the contract state and account balance
foo@bar:~$ CUDOS_NODED query wasm list-contract-by-code $CODE_ID $NODE --output json

# fetch contract address
foo@bar:~$ CONTRACT=$(wasmd query wasm list-contract-by-code $CODE_ID $NODE --output json | jq -r '.contracts[-1]')

echo $CONTRACT
```

Congrats, you have successfully deployed and instantiated contract.

### Examples

#### Mint CW20 tokens

```
 foo@bar:~$ MINT=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob --keyring-backend "$KEYRING" --address) '{ "mint": { "recipient": $bob, "amount": "1000000" } }')

{ "mint": { "recipient": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft", "amount": "1000000" } }

foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$MINT" \
    --from wasm-power $TXFLAG -y --keyring-backend "$KEYRING"

foo@bar:~$ BALANCE_OF=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob --keyring-backend "$KEYRING" --address) '{ "balance": { "address": $bob } }')
foo@bar:~$ echo $BALANCE_OF
{ "balance": { "address": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft" } }

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1000000"
```

#### Transfer CW20 tokens

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Transfer tokens by running this command:

```
MINT=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob --keyring-backend "$KEYRING" --address) '{ "mint": { "recipient": $bob, "amount": "1000000" } }')

{ "mint": { "recipient": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft", "amount": "1000000" } }

foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$MINT" \
    --from wasm-power $TXFLAG -y --keyring-backend "$KEYRING"

foo@bar:~$ BALANCE_OF=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob --keyring-backend "$KEYRING" --address) '{ "balance": { "address": $bob } }')
foo@bar:~$ echo $BALANCE_OF
{ "balance": { "address": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft" } }

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1000000"
foo@bar:~$ TRANSFER=$(jq -n --arg alice $(CUDOS_NODED keys show -a alice --keyring-backend "$KEYRING" --address) '{ "transfer": { "recipient": $alice, "amount": "10000" } }')
foo@bar:~$ echo $TRANSFER
{ "transfer": { "recipient": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9", "amount": "10000" } }
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$TRANSFER" --from wasm-power $TXFLAG -y --keyring-backend "$KEYRING"

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "10000"
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "990000"
```

#### Increase allowance

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Increase allowance by running this command:

```
foo@bar:~$ INCREASE_ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show -a alice --keyring-backend "$KEYRING" --address) '{ "increase_allowance": { "spender": $alice, "amount": "15000" } }')
foo@bar:~$ echo $INCREASE_ALLOWANCE
{ "increase_allowance": { "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9", "amount": "15000" } }
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$INCREASE_ALLOWANCE" \
    --from wasm-power $TXFLAG -y --keyring-backend "$KEYRING"
foo@bar:~$ ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show alice --keyring-backend "$KEYRING" --address) --arg wasmPower $(CUDOS_NODED keys show wasm-power --keyring-backend "$KEYRING" --address) '{ "allowance": { "owner": $wasmPower, "spender": $alice } }')
foo@bar:~$ echo $ALLOWANCE
{ "allowance": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75", "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE" $NODE
data:
  allowance: "15000"
  expires:
    never: {}
```

#### Transfer a CW20 tokens (via spender)

As a prerequisite, you need to approve the token using the steps mentioned in the previous section(Increase Allowance).

Transfer tokens via spender:

```
foo@bar:~$ BALANCE_OF_SENDER=$(jq -n --arg wasmPower $(CUDOS_NODED keys show -a wasm-power --keyring-backend "$KEYRING" --address) '{ "balance": { "address": $wasmPower} }')
foo@bar:~$ echo $BALANCE_OF_SENDER
{ "balance": { "address": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75" } }
foo@bar:~$ BALANCE_OF=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob --keyring-backend "$KEYRING" --address) '{ "balance": { "address": $bob} }')
foo@bar:~$ echo $BALANCE_OF
{ "balance": { "address": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1000000"

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "990000"

foo@bar:~$ TRANSFER_FROM=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob --keyring-backend "$KEYRING" ) --arg wasmPower $(CUDOS_NODED keys show -a wasm-power --keyring-backend "$KEYRING" ) '{"transfer_from": {"owner": $wasmPower,"recipient": $bob,"amount": "5000"}}')
foo@bar:~$ echo $TRANSFER_FROM
{ "transfer_from": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75", "recipient": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft", "amount": "5000" } }
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$TRANSFER_FROM" --from alice $TXFLAG -y --keyring-backend "$KEYRING"

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1005000"

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "985000"
foo@bar:~$ ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show alice --keyring-backend "$KEYRING" --address) --arg wasmPower $(CUDOS_NODED keys show wasm-power --keyring-backend "$KEYRING" --address) '{ "allowance": { "owner": $wasmPower, "spender": $alice } }')
foo@bar:~$ echo $ALLOWANCE
{ "allowance": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75", "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE" $NODE
data:
  allowance: "10000"
  expires:
    never: {}
```

#### Decrease allowance

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens) and you need to approve the token using the steps mentioned in the previous section(Increase Allowance).

Decrease allowance by running this command:

```
foo@bar:~$ BALANCE_OF_SENDER=$(jq -n --arg wasmPower $(CUDOS_NODED keys show -a wasm-power --keyring-backend "$KEYRING" --address) '{ "balance": { "address": $wasmPower} }')
foo@bar:~$ echo $BALANCE_OF_SENDER
{ "balance": { "address": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75" } }
foo@bar:~$ BALANCE_OF=$(jq -n --arg bob $(CUDOS_NODED keys show -a bob --keyring-backend "$KEYRING" --address) '{ "balance": { "address": $bob} }')
foo@bar:~$ echo $BALANCE_OF
{ "balance": { "address": "cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF" $NODE
data:
  balance: "1005000"

foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "985000"

foo@bar:~$ ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show alice --keyring-backend "$KEYRING" --address) --arg wasmPower $(CUDOS_NODED keys show wasm-power --keyring-backend "$KEYRING" --address) '{ "allowance": { "owner": $wasmPower, "spender": $alice } }')
foo@bar:~$ echo $ALLOWANCE
{ "allowance": { "owner": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75", "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE" $NODE
data:
  allowance: "10000"
  expires:
    never: {}
foo@bar:~$ DECREASE_ALLOWANCE=$(jq -n --arg alice $(CUDOS_NODED keys show -a alice --keyring-backend "$KEYRING") '{ "decrease_allowance": { "spender": $alice, "amount": "2000" } }')
foo@bar:~$ echo $DECREASE_ALLOWANCE
{ "decrease_allowance": { "spender": "cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9", "amount": "2000" } }
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$DECREASE_ALLOWANCE" --from wasm-power $TXFLAG -y --keyring-backend "$KEYRING"
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE" $NODE
data:
  allowance: "8000"
  expires:
    never: {}
```

#### Burn CW20 tokens

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Burn tokens by running this command:
```
foo@bar:~$ BALANCE_OF_SENDER=$(jq -n --arg wasmPower $(CUDOS_NODED keys show -a wasm-power --keyring-backend "$KEYRING" --address) '{ "balance": { "address": $wasmPower} }')
foo@bar:~$ echo $BALANCE_OF_SENDER
{ "balance": { "address": "cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75" } }
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "980000"
foo@bar:~$ BURN='{ "burn": { "amount": "1000" } }'
foo@bar:~$ CUDOS_NODED tx wasm execute $CONTRACT "$BURN" \
    --from wasm-power $TXFLAG -y --keyring-backend "$KEYRING"
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_SENDER" $NODE
data:
  balance: "979000"
```

### Return all allowances

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Get all allowances by running this command:
```
foo@bar:~$ ALL_ALLOWANCES=$(jq -n --arg wasmPower $(CUDOS_NODED keys show -a wasm-power --keyring-backend "$KEYRING") '{ "all_allowances": { "owner": $wasmPower } }')
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

#### Return all accounts

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Get all accounts by running this command:
```
foo@bar:~$ ALL_ACCOUNTS='{ "all_accounts": {} }'
foo@bar:~$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALL_ACCOUNTS" $NODE
data:
  accounts:
  - cudos1er4ekhej7xrs8yn45qn5q6485q6dxq0tu33zft
  - cudos1jz2nxvlgqscjxtw0q26rqyrpdfvyh5j3nlnmn9
  - cudos1r8y6rddc8psqcll22kyaf7gphe8kswk99fxv75
```
