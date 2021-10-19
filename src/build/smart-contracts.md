---
title: Smart Contracts
---

# Smart Contracts

This article explains the deployment and interaction of CosmWasm Plus CW20 contracts.

***Note*** for non-bash shell (eg, probably most macOS and some Linux) users: for below commands to work correctly without making modification to the environment (eg, check [_here_](https://zsh.sourceforge.io/Doc/Release/Expansion.html#Parameter-Expansion) how zsh does parameter expansion differently for details), please use the bash shell:

```
% bash
```

***Note 2*** outputs of some commands shown below are just for illustration purposes and the output you get might differ.

### Install rustup

First, install [rustup](https://rustup.rs/). Once installed, make sure you have the wasm32 target. This is an important step before running any contract to ensure that you are running Rust 1.51.0+ with wasm32-unknown-unknown target installed.

```
$ cargo --version

$ rustup --version
$ rustup default stable
$ rustup target add wasm32-unknown-unknown
$ rustup target list --installed
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

* Follow the instructions to [Start and build the binaries](/build/start-binaries.html)
* Clone the [cw-plus](https://github.com/CosmWasm/cw-plus) repo with [release tag of v0.9.0](https://github.com/CosmWasm/cw-plus/tree/v0.9.0):

```
$ mkdir -p ~/cudos
$ cd ~/cudos

$ git clone --depth 1 --branch v0.9.0 https://github.com/CosmWasm/cw-plus.git
```

### Compile the contracts

Navigate to cw-plus folder and run the following commands:

```
$ cd cw-plus

$ docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.12.3
```

Make sure your **_binary-builder_** is on the list of running containers:

```
$ docker ps --format '{{.Names}}'
```

Copy the compiled cw20 base contract to **_binary-builder_** container:

```
$ docker cp artifacts/cw20_base.wasm binary-builder:/usr/cudos
```

### Deployment and instantiation

1. Set up the environment

```
$ NODE="--node https://sentry1.gcp-uscentral1.cudos.org:26657"
$ KEYRING="os"
$ TXFLAGS="$NODE --chain-id cudos-testnet-public --gas auto --gas-adjustment 1.3 --keyring-backend $KEYRING -y"
$ alias CUDOS_NODED='docker exec -it binary-builder cudos-noded'
```

Where:

* **NODE** should refer to the IP address of your sentry or full/validator node that is running on the Cudos public testnet.
* **KEYRING** uses the operating system's default credentials store (os) to handle keys storage operations securely. The keyring holds the private/public keypairs used to interact with a node and it will request a password each time it is accessed.
* **TXFLAGS** is used as a shorthand for common transaction flags.
* **CUDOS_NODED** is an alias for cudos-noded in binary-builder.

2. Manage accounts

Create accounts for the owner, Alice and Bob:

***Note*** the first interaction with the keyring will require creation and confirmation of a new keyring passphrase that must be at least 8 characters long

```
$ CUDOS_NODED keys add owner --keyring-backend "$KEYRING"
$ CUDOS_NODED keys add alice --keyring-backend "$KEYRING"
$ CUDOS_NODED keys add bob --keyring-backend "$KEYRING"
```

Example of expected output results:

```
- name: owner
  type: local
  address: cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"ApRCDX7zSgLqrFSbNpURfMSpb2BEySjRy7ijMvqpBiTO"}'
  mnemonic: ""


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.
```

To view address of an account, use the following format (where _\<name\>_ should be replaced with an account - eg, _owner_, _alice_ or _bob_):

```
$ CUDOS_NODED keys show -a <name> --keyring-backend "$KEYRING"
```

Save accounts' addresses for later reuse:

```
$ OWNER=$( CUDOS_NODED keys show -a owner --keyring-backend "$KEYRING" | tee /dev/tty | tail -1 | tr -d '\r' )
Enter keyring passphrase:
cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g

$ ALICE=$( CUDOS_NODED keys show -a alice --keyring-backend "$KEYRING" | tee /dev/tty | tail -1 | tr -d '\r' )
Enter keyring passphrase:
cudos19uudvppffqzqetmeuuux47sgh0xecu07unqwwa

$ BOB=$( CUDOS_NODED keys show -a bob --keyring-backend "$KEYRING" | tee /dev/tty | tail -1 | tr -d '\r' )
Enter keyring passphrase:
cudos15yvgtr5ppu92hx0hu53ygdhnajrhgmjpfe8vdc
```

3. Get CUDOS tokens from faucet

To cover transactions fees, add 0.1 or more CUDOS tokens to the owner and Alice accounts' addresses (as shown in the previous step) using the [faucet](https://explorer.cudos.org/faucet).

4. Deploy the contract

```
$ RES=$( CUDOS_NODED tx wasm store /usr/cudos/cw20_base.wasm --from owner $TXFLAGS | tee /dev/tty | tail -1 | tr -d '\r' )
$ CODE_ID=$( echo $RES | jq -r '.logs[0].events[-1].attributes[-1].value' | tee /dev/tty )
```

5. Instantiate and verify the contract

Let's now instantiate a new CW20 contract, setting the initial balance of owner's address to 1M DIZZ tokens.

***Note*** in this example, the "DIZZ" is used for the token name and symbol, but it can be replaced with any other name.

```
$ INIT=$( jq -n --arg address $OWNER '{ "name": "DIZZ COIN", "symbol": "DIZZ", "decimals": 6, "initial_balances": [ { "address": $address, "amount": "1000000" } ], "mint": { "minter": $address, "cap": "99900000000" } }' | tee /dev/tty )
$ CUDOS_NODED tx wasm instantiate $CODE_ID "$INIT" --from owner --label "CW20" $TXFLAGS

# check the contract state
$ CUDOS_NODED query wasm list-contract-by-code $CODE_ID $NODE --output json | jq -s

# fetch contract address
$ CONTRACT=$( CUDOS_NODED query wasm list-contract-by-code $CODE_ID $NODE --output json | jq -r '.contracts[-1]' | tee /dev/tty | tail -1 | tr -d '\r' )
```

Example of expected output results:

```
{
  "name": "DIZZ COIN",
  "symbol": "DIZZ",
  "decimals": 6,
  "initial_balances": [
    {
      "address": "cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g",
      "amount": "1000000"
    }
  ],
  "mint": {
    "minter": "cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g",
    "cap": "99900000000"
  }
}


[
  {
    "contracts": [
      "cudos19mquhvx58jrrk9pklf3uxx624q0f3zqhhmqhws"
    ],
    "pagination": {
      "next_key": null,
      "total": "0"
    }
  }
]
```

Congrats, you have successfully deployed and instantiated contract.

### Examples of interaction

#### Mint CW20 tokens

Mint 1M tokens to Bob:

```
$ MINT=$( jq -n --arg recipient $BOB '{ "mint": { "recipient": $recipient, "amount": "1000000" } }' | tee /dev/tty )
$ CUDOS_NODED tx wasm execute $CONTRACT "$MINT" --from owner $TXFLAGS
```

Example of expected output results:

```
{
  "mint": {
    "recipient": "cudos15yvgtr5ppu92hx0hu53ygdhnajrhgmjpfe8vdc",
    "amount": "1000000"
  }
}
```

Check the current balance of Bob:

```
$ BALANCE_OF_BOB=$( jq -n --arg address $BOB '{ "balance": { "address": $address } }' | tee /dev/tty )
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_BOB" $NODE
data:
  balance: "1000000"
```

#### Transfer CW20 tokens

Transfer 10k tokens from owner to Alice:

```
$ TRANSFER_TO_ALICE=$( jq -n --arg recipient $ALICE '{ "transfer": { "recipient": $recipient, "amount": "10000" } }' | tee /dev/tty )
$ CUDOS_NODED tx wasm execute $CONTRACT "$TRANSFER_TO_ALICE" --from owner $TXFLAGS
```

Example of expected output results:

```
{
  "transfer": {
    "recipient": "cudos19uudvppffqzqetmeuuux47sgh0xecu07unqwwa",
    "amount": "10000"
  }
}
```

Now check the current balance of owner and Alice:

```
$ BALANCE_OF_OWNER=$( jq -n --arg address $OWNER '{ "balance": { "address": $address } }' | tee /dev/tty )
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_OWNER" $NODE
data:
  balance: "990000"

$ BALANCE_OF_ALICE=$( jq -n --arg address $ALICE '{ "balance": { "address": $address } }' | tee /dev/tty )
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_ALICE" $NODE
data:
  balance: "10000"
```

#### Increase and check allowance

Increase allowance to 15k tokens for Alice by running this command:

```
$ INCREASE_ALLOWANCE_FOR_ALICE=$( jq -n --arg spender $ALICE '{ "increase_allowance": { "spender": $spender, "amount": "15000" } }' | tee /dev/tty )
$ CUDOS_NODED tx wasm execute $CONTRACT "$INCREASE_ALLOWANCE_FOR_ALICE" --from owner $TXFLAGS
```

Check allowance for Alice:

```
$ ALLOWANCE_FOR_ALICE=$( jq -n --arg owner $OWNER --arg spender $ALICE '{ "allowance": { "owner": $owner, "spender": $spender } }' | tee /dev/tty )
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE_FOR_ALICE" $NODE
data:
  allowance: "15000"
  expires:
    never: {}
```

#### Transfer a CW20 tokens (via spender)

Transfer 5k tokens from Alice to Bob using allowance:

```
$ TRANSFER_FROM_ALICE=$( jq -n --arg owner $OWNER --arg recipient $BOB '{ "transfer_from": { "owner": $owner, "recipient": $recipient, "amount": "5000" } }' | tee /dev/tty )
$ CUDOS_NODED tx wasm execute $CONTRACT "$TRANSFER_FROM_ALICE" --from alice $TXFLAGS
```

Example of expected output results:

```
{
  "transfer_from": {
    "owner": "cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g",
    "recipient": "cudos15yvgtr5ppu92hx0hu53ygdhnajrhgmjpfe8vdc",
    "amount": "5000"
  }
}
```

Check all current accounts' balances and allowance for Alice:

```
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_OWNER" $NODE
data:
  balance: "985000"

$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_BOB" $NODE
data:
  balance: "1005000"

$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_ALICE" $NODE
data:
  balance: "10000"

$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE_FOR_ALICE" $NODE
data:
  allowance: "10000"
  expires:
    never: {}
```

#### Decrease allowance

Decrease allowance for Alice by 2k tokens running this command:

```
$ DECREASE_ALLOWANCE_FOR_ALICE=$( jq -n --arg spender $ALICE '{ "decrease_allowance": { "spender": $spender, "amount": "2000" } }' | tee /dev/tty )
$ CUDOS_NODED tx wasm execute $CONTRACT "$DECREASE_ALLOWANCE_FOR_ALICE" --from owner $TXFLAGS
```

Check current allowance for Alice:

```
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALLOWANCE_FOR_ALICE" $NODE
data:
  allowance: "8000"
  expires:
    never: {}
```

#### Burn CW20 tokens

Burn 1k tokens by running this command:

```
$ BURN='{ "burn": { "amount": "1000" } }'
$ CUDOS_NODED tx wasm execute $CONTRACT "$BURN" --from owner $TXFLAGS
```

Example of expected output results:

```
gas estimate: 124961
{"height":"719919","txhash":"30440EBD4A1F2102E1E912C31620A2594FDE3755646AC3A204D01295614A9AE6","codespace":"","code":0,"data":"0A260A242F636F736D7761736D2E7761736D2E76312E4D736745786563757465436F6E7472616374","raw_log":"[{\"events\":[{\"type\":\"execute\",\"attributes\":[{\"key\":\"_contract_address\",\"value\":\"cudos19mquhvx58jrrk9pklf3uxx624q0f3zqhhmqhws\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"/cosmwasm.wasm.v1.MsgExecuteContract\"},{\"key\":\"module\",\"value\":\"wasm\"},{\"key\":\"sender\",\"value\":\"cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g\"}]},{\"type\":\"wasm\",\"attributes\":[{\"key\":\"_contract_address\",\"value\":\"cudos19mquhvx58jrrk9pklf3uxx624q0f3zqhhmqhws\"},{\"key\":\"action\",\"value\":\"burn\"},{\"key\":\"from\",\"value\":\"cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g\"},{\"key\":\"amount\",\"value\":\"1000\"}]}]}]","logs":[{"msg_index":0,"log":"","events":[{"type":"execute","attributes":[{"key":"_contract_address","value":"cudos19mquhvx58jrrk9pklf3uxx624q0f3zqhhmqhws"}]},{"type":"message","attributes":[{"key":"action","value":"/cosmwasm.wasm.v1.MsgExecuteContract"},{"key":"module","value":"wasm"},{"key":"sender","value":"cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g"}]},{"type":"wasm","attributes":[{"key":"_contract_address","value":"cudos19mquhvx58jrrk9pklf3uxx624q0f3zqhhmqhws"},{"key":"action","value":"burn"},{"key":"from","value":"cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g"},{"key":"amount","value":"1000"}]}]}],"info":"","gas_wanted":"124961","gas_used":"94597","tx":null,"timestamp":""}
```

You can check the current balance of the owner by running the command:

```
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$BALANCE_OF_OWNER" $NODE
data:
  balance: "984000"
```

#### Query all allowances

Get all allowances by running this command:

```
$ ALL_ALLOWANCES=$( jq -n --arg owner $OWNER '{ "all_allowances": { "owner": $owner } }' | tee /dev/tty )
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALL_ALLOWANCES" $NODE
data:
  allowances:
  - allowance: "8000"
    expires:
      never: {}
    spender: cudos19uudvppffqzqetmeuuux47sgh0xecu07unqwwa
```

Example of the expected output results:
```
{
  "all_allowances": {
    "owner": "cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g"
  }
}
```

#### Query all accounts

Get all accounts by running this command:

```
$ ALL_ACCOUNTS='{ "all_accounts": {} }'
$ CUDOS_NODED query wasm contract-state smart $CONTRACT "$ALL_ACCOUNTS" $NODE
data:
  accounts:
  - cudos15yvgtr5ppu92hx0hu53ygdhnajrhgmjpfe8vdc
  - cudos16xws8z7zh7yjj69tglyks3jefp7rw38dlq5k0g
  - cudos19uudvppffqzqetmeuuux47sgh0xecu07unqwwa
```
