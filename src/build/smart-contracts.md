---
title: Smart Contracts
---

# Smart Contracts

This article explains the following:

* [Deployment and interaction of CW20](/build/smart-contracts.html#deployment-and-interaction-of-cw20)
* [How to deploy smart contracts](/build/smart-contracts.html#run-and-deploy-escrow-contract)

## Deployment and interaction of CW20

CW20 is equivalent to ERC20 **.** CW-20 is similar, in some respects, to bitcoin, Litecoin, and any other cryptocurrency; CW-20 tokens are blockchain-based assets that have value and can be sent and received. The primary difference is that instead of running on their own blockchain, CW-20 tokens are issued on the CosmWasm network.

This section explains how to deploy and interact with CW20 using cudos-noded.

### Functions present in CW20 base standard

#### Actions

- **mint** - Create new tokens, update total supply, and add them to the balance of recipient, as long as it does not exceed the cap. The caller must be a minter.

- **transfer** - Moves the specified amount of tokens from the sender account to the recipient account. This is designed to send to an address controlled by a private key and does not trigger any actions on the recipient if it is a contract.

- **burn** - Remove the specified amount tokens from the balance of the sender.

- **increaseAllowance** - Set or increase the allowance limit of spender for a given caller such that spender may access up to amount + current allowance tokens from the sender account.

- **decreaseAllowance** - Decrease or clear the allowance limit of spender for a given caller such that spender may access up to the current allowance minus the amount tokens from the sender account.

- **transferFrom** - Used to transfer token from src to target and caller must be the address who is pre approved by the src. Pre approve of address is done by increaseAllowance. This makes use of an allowance and if there was a valid, un-expired pre-approval for the sender, then moves amount tokens from owner to recipient and deduct it from the available allowances.

#### Queries

- **balance** - Returns the balance of the given address.

- **allowance** - Returns the available allowance that spender can access from the owner's account.

- **allAllowances** - Returns a list of all address who are allowed to spend(non-expired allowances) by given owner address.

- **allAccounts** - Returns paginated list of all accounts with their balance equals to 0.

- **tokenInfo**- Returns the name and symbol of a token.

- **minter** - Returns a the address of a minter for a given contract(who and how much can be minted).

### Download Cudos node and code

- Setup a CUDOS\_NODED using binary builder mentioned here [https://github.com/CudoVentures/cudos-network-docs/blob/Table-of-Content-folders/src/docs/build-and-earn/testnet-guides/start-binaries.md](https://github.com/CudoVentures/cudos-network-docs/blob/Table-of-Content-folders/src/docs/build-and-earn/testnet-guides/start-binaries.md)
- Download [cosmwasm-plus](https://github.com/CosmWasm/cw-plus) contract and compile the contracts using docker. Please make sure that you run the docker command inside the root folder.

### Compile the contracts

- Go to cosmwasm-plus folder and run the following command:
```
foo@bar:~$ docker run --rm -v "$(pwd)":/code \
--mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
--mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
cosmwasm/workspace-optimizer:0.11.3
```

### Deployment and instantiation

1. Set the environment variables:
```
foo@bar:~$ RPC="http://localhost:26657"
foo@bar:~$ CHAIN_ID="localnet"
foo@bar:~$ export NODE="--node $RPC"
foo@bar:~$ export TXFLAG="${NODE} --chain-id ${CHAIN_ID} --gas auto --gas-adjustment 1.3"
foo@bar:~$ export KEYRING="--keyring-backend test --keyring-dir $HOME/.wasmd_keys"
```
The compilation will take some time and it will provide you with artifacts folder in the root
Upload the contract on the chain.

**main is the human readable account which is already added by wasmd**
**using command**
**wasmd keys add** _ **\&lt;name\&gt;**
**Add some balance in wasm-power, bob and alice using**  [**explorer.cudos.org/faucet** ](https://explorer.cudos.org/faucet).

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

3. Instantiate and verify the contract
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

Congrats, you have successfully deployed and instantiated contract.

### Examples

#### Mint CW20 tokens

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

#### Transfer CW20 tokens

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Transfer tokens by running this command:

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

#### Increase allowance

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Increase allowance by running this command:

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

#### Transfer a CW20 tokens (via spender)

As a prerequisite, you need to approve the token using the steps mentioned in the previous section(Increase Allowance).

Transfer tokens via spender:

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

#### Decrease allowance

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens) and you need to approve the token using the steps mentioned in the previous section(Increase Allowance).

Decrease allowance by running this command:

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

#### Burn CW20 tokens

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Burn tokens by running this command:
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

### Return all allowances

As a prerequisite, you need to mint tokens that was mentioned in the previous section(Mint CW20 Tokens).

Get all allowances by running this command:
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

## How to deploy smart contracts on the Cudos network

This section explains how to deploy contracts to the Cudos Network Testnet. Let’s focus on one type of contract which is [CosmWasm](https://github.com/CosmWasm/cosmwasm). This guide compiles and deploys some CosmWasm contracts such as [cw20](https://github.com/CosmWasm/cosmwasm-plus/blob/main/packages/cw20/README.md) for fungible tokens and [cw721](https://github.com/CosmWasm/cosmwasm-plus/blob/main/packages/cw721/README.md) for non-fungible tokens.

By following this guide you will be able to:

1. Compile contracts on Cudos network
2. Run and deploy escrow contract

### Prerequisites

Before starting to deploy a smart contract, you need to have:
* A running [full node](/build/developers-setup)
* An account
* A node ID/Key with the phrases
* A [Keplr wallet](/build/interact-keplr-explorer.md)
* Enough [funds/faucet](/build/funding-your-wallet.md) in your Keplr wallet

### Install rustup

First, install [rustup](https://rustup.rs/). Once installed, make sure you have the wasm32 target. This is an important step before running any contract to ensure that you are running Rust 1.44.1+ with wasm32-unknown-unknown target installed.

```
rustup
rustup update stable
default stable
cargo version
# If this is lower than 1.51.0+, update
rustup target list --installed
rustup target add wasm32-unknown-unknown
RUSTFLAGS='-C link-arg=-s' cargo wasm
```

### Download and compile contracts

Install [Docker](https://docs.docker.com/install/) for your environment (Mac, Windows, Linux).
Once Docker is installed, clone or download the [CosmWasm-Examples](https://github.com/CosmWasm/cosmwasm-examples/blob/main/README.md), this folder includes many of the CosmWasm contracts you might wish to run on the Cudos Network Testnet.

### Run and deploy Escrow contract

#### Create an alias to your full-node or builder docker instance:

```
alias CUDOS_NODED='docker exec <container-id> cudos-noded'
git clone https://github.com/CudoVentures/cosmwasm-examples
cd cosmwasm-examples
git checkout 54e2547f31860ac2a379f5867357f4c2c3a10ea3
cd contracts/escrow/
```

Create your main project directory. Once this is done, run the following command at Terminal in your project folder:

```
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.11.3
cd artifacts/
docker cp cw_escrow.wasm <container-id>:/usr/cudos
```
This command will compile all the contracts/* folders add all generated wasm files to an artifacts directory with a checksum. You can check [release page](https://github.com/CosmWasm/cosmwasm-plus/releases) to download the latest contracts. All Smart contract binary sizes must be as small as possible for reduced gas cost.

#### Create account to deploy the smart contract

Let’s create an account on Cudos and call it wasm-poweruser:
```
CUDOS_NODED keys add wasm-poweruser
```

You will get something similar to the following result:
```
name: myKeyName
type: local
address: cudos1kg8r45qvsjyxh7sz02eje3dc0mgf9dr3ht4ddw
pubkey:cudospub1addwnpepq0d0jtcnthha73c0lzg5jfluatktsxkvuflggkggpc9w3ddmaw3wg2ljdez
mnemonic: ""
threshold: 0
pubkeys: []

**Important** write this mnemonic phrase in a safe place. It is the only way to recover your account if you ever forget your password. song fun list measure limb game supply arm office alarm hair airport carry warrior afraid april pig uncover fall mind oil snake tiger penalty
```

The account must be funded via [faucet](https://explorer.cudos.org/faucet) to be able to pay for the gas of the contract. Therefore you should not deploy a contract without having enough balance in your account, you can get a maximum of 20.00000 acudos tokens via [faucet](https://explorer.cudos.org/faucet).

With an escrow example, the *wasm-poweruser* account will fund an escrow, that will allow one account to control payout and upon release, send the funds to another account. In this case, You will need to create two more accounts. Run the commands:
```
CUDOS_NODED keys add wasm-receiver
CUDOS_NODED keys add wasm-thief
```
#### Deploy escrow contract and extract the Code id

```
RES=$(CUDOS_NODED tx wasm store cw_escrow.wasm --from wasm-poweruser --gas auto --gas-adjustment 1.3 --chain-id cudos-testnet --builder 'cosmwasm/rust-optimizer:0.11.3' --source 'https://github.com/CosmWasm/cosmwasm-examples/tree/main/contracts/escrow' --node tcp://35.232.27.92:26657 -y)

 echo $RES

# Get Code ID which must be a positive integer
CODE_ID=$(echo $RES | jq -r '.logs[0].events[0].attributes[-1].value')
echo $CODE_ID
```
Note that if you receive the following error:
```
Error: rpc error: code = NotFound desc = rpc error: code = NotFound desc = account <account_id> not found: key not found
```
Then you need to double check that the *wasm-poweruser* has sufficient funds and fund it via the [faucet](https://explorer.cudos.org/faucet) if necessary.

You can also download the wasm from the chain and verify that the diff between them is empty by running the command:
```
CUDOS_NODED query wasm code $CODE_ID --node tcp://35.232.27.92:26657 download.wasm docker cp <container-id>:/usr/cudos/download.wasm download.wasm diff download.wasm cw_escrow.wasm
```
#### Escrow contract instantiation

```
# instantiate contract and verify
INIT=$(jq -n --arg sender $(CUDOS_NODED keys show -a wasm-poweruser) --arg receiver $(CUDOS_NODED keys show -a wasm-receiver) '{"arbiter":$sender,"recipient":$receiver}')
CUDOS_NODED tx wasm instantiate $CODE_ID "$INIT" \\
    --from wasm-poweruser --amount=5000acudos  --label "example escrow" --gas auto --gas-adjustment 1.3 --chain-id cudos-testnet --node tcp://35.232.27.92:26657 -y
```

Now you can check the contract state and account balance by running the command:
```
CUDOS_NODED query wasm list-contract-by-code $CODE_ID --node tcp://35.232.27.92:26657
CONTRACT=$(CUDOS_NODED query wasm list-contract-by-code $CODE_ID --node tcp://35.232.27.92:26657 --output json | jq -r '.contracts[0]')
echo $CONTRACT
```

As a result, you should see this contract with 5000 cudos:
```
CUDOS_NODED query wasm contract --node tcp://35.232.27.92:26657 $CONTRACT
CUDOS_NODED query bank balances --node tcp://35.232.27.92:26657 $CONTRACT
```

#### Interact with the escrow contract

```
# execute fails if wrong person
APPROVE='{"approve":{"quantity":[{"amount":"5000","denom":"acudos"}]}}'
CUDOS_NODED tx wasm execute $CONTRACT "$APPROVE" --from wasm-thief --gas auto --gas-adjustment 1.3 --chain-id cudos-testnet --node tcp://35.232.27.92:26657 -y

# looking at the logs should show: "execute wasm contract failed: Unauthorized"
# and the wasm-receiver user should still have no funds
CUDOS_NODED query bank balances $(CUDOS_NODED keys show wasm-receiver -a) --node tcp://35.232.27.92:26657

# but it should succeed when wasm-poweruser tries
CUDOS_NODED tx wasm execute $CONTRACT "$APPROVE" --from wasm-poweruser --gas auto --gas-adjustment 1.3 --chain-id cudos-testnet --node tcp://35.232.27.92:26657 -y

# the receiver user should have 5000acudos in its balance and the contract should have no money in its balance
CUDOS_NODED query bank balances $(CUDOS_NODED keys show wasm-receiver -a) --node tcp://35.232.27.92:26657
CUDOS_NODED query bank balances $CONTRACT --node tcp://35.232.27.92:26657
```
