---
title: Smart Contracts
---

# Smart Contracts

This article explains the following:

* [Deployment and interaction of CW20](/build/smart-contracts.html#deployment-and-interaction-of-cw20)

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

### Increase Allowance

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

### Transfer a CW20 Tokens (via spender)

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

### Decrease Allowance

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

### Burn CW20 Tokens

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

### All Allowances

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

### All Accounts

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
