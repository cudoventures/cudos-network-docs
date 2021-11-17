# Upgrade procedure

There are two types of upgrade procedures available.
The ones that do not imply any breaking changes (soft upgrades), and the ones that do (hard forks).

## Overview

To be able to do any upgrade, there needs to be an approved software upgrade proposal first.
This proposal needs to be triggered with a governance vote.

### Software upgrade proposal

The first step is to submit a software upgrade proposal.
You can learn more on governance proposals [on this page](/learn/#proposals).
After the proposal is submitted it enters into a deposit period, during which a certain amount of tokens need to be deposited into it, so the voting period can start.
After the voting period starts, only validators can vote and approve it.
If the proposal is passed, the network stops at a specified block height, until the upgrade is made and the network is restarted.

#### Submitting a software upgrade proposal

A proposal can be submitted with the following command in a node terminal:

```bash
cudos-noded tx gov submit-proposal software-upgrade <proposal_name> --upgrade-height <block_at_which_to_stop> --from <wallet_name> --deposit <amount_to_deposit_with_denomination> --title <proposal_title> --description <proposal_description> --keyring-backend <os or file or test> --chain-id <chain_id> -y
```

Alternatively, software upgrade proposals can also be created using the explorer, as explained [here](/learn/#creating-a-new-proposal).

#### Depositing to a proposal

To get the ID of the proposal that we want to deposit into, enter the following command:

```bash
cudos-noded q gov proposals
```

This will return a list with all the proposals, in which we can find the one we need and get its "**proposal_id**" field. Then to deposit funds into it, enter the following command:

```bash
cudos-noded tx gov deposit <proposal_id> <amount_with_denomination> --from <wallet_name> --keyring-backend <os or file or test> --chain-id <chain_id> -y
```

The instructions on how to deposit CUDOS into a proposals using the explorer can be found in our [relevant learn page](/learn/#depositing-cudos-in-an-active-proposal).

If the funds are enough, the proposal should enter in a voting status, which can again be seen with the command we used for the proposal ID.

#### Voting a proposal

Only validator can vote in governance proposals.
To vote *yes* in a proposal usingn the CLI, use the following command:

```bash
cudos-noded tx gov vote <proposal_id> yes --from <walled_name> --keyring-backend <os or file or test> --chain-id <chain_id> -y
```

To vote using the explorer, please follow the instructions described [here](/learn/#voting-in-a-proposal-validators-only).

If enough positive votes are casted, the proposal will be approved and the network will stop at the specified block height or time.
When the chain stops all nodes need to stop as well.

## Soft upgrade

Soft upgrades do not imply breaking changes for the network.
These are done by "in-place migration", as described [here](https://docs.cosmos.network/master/core/upgrade.html).
More details will be shared shortly.

## Hard fork

Hard forks do imply breaking changes for the network.

### High-level overview

After the upgrade proposal is accepted and the network stops, all validators must:

1. Export the current state
2. Pull and build the new binary
3. Migrate the state
4. Run the network.

#### Exporting the network state

This is done with the following command on a **stopped** node:

```bash
cudos-noded export |& tee  <export_file_name.json>
```

Check the file to make sure it is populated with the network state.

#### Set the new binary

Pull and build the new binary based on the nodes' types that you are running.

#### Migrating the network state file

The exported file from before needs to be migrated, which basically populates it with the fields needed by the new version. This is done with the following command:

```bash
cudos-noded migrate <software_upgrade_proposal_name> <export_file_name.json> --chain-id <new_chain_id> |& tee <migrated_file_name.json>
```

All the necessary state changes are handled in the **migrate** command. However, Tendermint parameters are not handled in this command. You might need to update these parameters manually. Make sure that your genesis JSON file contains the correct values specific to your chain. If the cudos-noded migrate errors with a message saying that the genesis file cannot be parsed, these are the fields to check first.

##### Reset the old state

This is done with the following command:

```bash
cudos-noded unsafe-reset-all
```

##### Move the new genesis.json to your daemon config directory. Ex

Either copy it manually or run command like the following example:

```bash
cp <migrated_file_name.json> ~/.cudos-noded/config/genesis.json
```

You can run the following command to check the software version, it should state the expected on at the end:

```bash
cudos-noded version --long
```

#### Start the network

Start the network with:

```bash
cudos-noded start
```

It should start from the the block it stopped before the upgrade without any error and with all the state unchanged.
