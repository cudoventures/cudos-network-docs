---
title: Cudos Validators
---

## Overview

Cudos Validators run node software to operate the Cudos Network blockchain by checking incoming transactions and forming new blocks in a decentralised manner. These validators participate in the consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key.

Cudos Network is a Proof of Stake chain so each Validator must put up a CUDOS token deposit as collateral to participate. Validators can have CUDOS delegated to their node by other token holders, they can also set commission on the fees their delegators receive as additional incentive.

The Validator pool is currently permissioned to allow the network to launch from testnet with stability, this will fully open once the network is deployed to mainnet. The active Validators on the network are determined by who has the most stake delegated to them — the top 100 Validator candidates with the most stake will become Cudos Network Validators.

Validators have a responsibility to be able to constantly run a correct version of the software, meaning their servers are always online and their private keys are not compromised. They also have a duty to participate in governance to ensure the decentralised decision making of the Cudos Network.

### Become A Validator

If you are interested in becoming an early Cudos Validator during the testnet please get in touch with us using [this application form](https://www.cudos.org/#contact-us).

If you're already on the whitelist and looking to get setup on your hardware with a Validator Node please visit our [build docs](/build/validator.html)

## Types of Nodes

We currently have four distinct types of Cudos Network node which Validators and participants utilise:

- Full node
- Seed node
- Sentry node

[Cudos Compute Nodes](#compute-nodes) will be added to the network in the future to allow for more compute scalability.

### Full Nodes

A full node is a node that participates in the network but without support in securing it. You can use this type to store the entire state of a blockchain, including blocks and the modified state of transactions. When running a full node, you support the network to reach the consensus until the current block. So it is important to secure your node from adversarial actors by using a firewall and a proxy.

You can configure your full node to become a **Validator Node** that interfaces with a validator signing key. Validator nodes must have high security setup, and should not accept incoming connections. They should maintain outgoing connections to a controlled set of Sentry Nodes that serve as their proxy shield to the rest of the network.

Validators that know and trust each other can accept incoming connections from one another and maintain direct private connectivity via VPN. The validator nodes only needs to be able to connect to its sentry nodes, preferably via a private network and never to be exposed directly on the public network.

### Seed Nodes

A seed node generates a list of peers to which another node can connect. So you can think of a seed node as the first point of contact for a new node joining the network. After a seed node provides a list of peers to the network, it will no longer be a peer and will disconnect.

Note that installing a Seed node is optional.

### Sentry Nodes

You can think of a Sentry node as a communication bridge between the public internet and the Validator nodes. This adds a layer of security to the whole network and to validators in specific. The communication between the Sentry nodes and the validator is always a private connection. A sentry node is like a full node, but it has one or more private peers. The private peers can represent validators or other full nodes in the network. They should always expect to have direct incoming connections from the Validator node.

The Validator node talks to the Sentry nodes that are provided, the Sentry nodes communicate to the Validator node via a private connection and the rest of the network via a public connection. The Sentry nodes have the option to communicate with other Sentry nodes as well.

### Compute Nodes

Compute Nodes will be responsible for listening to the Cudos smart contracts and running any workloads when relevant. When selecting a workload from the CUDOS smart contracts the requestor may choose to use nodes supporting AMD’s SEV technology for added security. AMD’s SEV technology allows the memory contents of a VM to be transparently encrypted with a key unique to the guest VM. This adds an extra layer of security and protection to the network, for both the node and the job requester.

The following sketch shows a request triggering a Cudos workload. A layer 1 smart contract requests some work through the Cudos smart contract, triggering an event. The Cudos nodes listen to the contract’s events, and execute the requested work when they are chosen. After fetching the data and running the workload, the result is returned to the CUDOS smart contract.

![CUDOS node diagram](./node-for-wiki.png)

## Validator Mechanics

After a Validator is [setup](/build/validator.html) and officially added to the Cudos Network with a `create-validator` transaction, they can be in three states:

- `in validator set`: Validator is in the active set and participates in consensus. Validator is earning rewards and can be slashed for misbehaviour.
- `jailed`: Validator misbehaved and is in jail, i.e. outside of the validator set. If the jailing is due to being offline for too long, the validator can send an `unjail` transaction in order to re-enter the validator set. If the jailing is due to double signing, the validator cannot unjail.
- `unbonded`: Validator is not in the active set, and therefore not signing blocs. Validator cannot be slashed, and does not earn any reward. It is still possible to delegate Atoms to this validator. Un-delegating from an unbonded validator is immediate.

### Staking

Validators need to stake 2,000,000 CUDOS when they connect to the Cudos Network in order to become eligible for transaction processing and rewards. Validators can also delegate additional CUDOS stake on top of the minimum threshold to earn an additional cut of available rewards.

Validators and their Delegators earn CUDOS as staking rewards for their support to the network security. These reward percentages will depend on the number of Validators and users delegating their stake in the network: the more staking there is, the lower the staking rewards for all participants will be as the total amount to distribute over a 10 year period is fixed.

When a Validator or a Delegator wants to retrieve part or all of their staked CUDOS, they send an `unbonding` transaction directly (or via the Explorer). Unbonding CUDOS undergo a 21 day unbonding period during which they are liable to being slashed for potential misbehaviours committed by the Validator before the unbonding process started, this ensures no-one can withdraw their secure stake immediately after commiting a slashable offence.

If a Validator misbehaves, a certain portion of their total stake is slashed meaning that every Delegator that staked CUDOS to this Validator gets penalised in proportion to their amount staked. Delegators are therefore incentivised to delegate to Validators that they anticipate will function safely.

### Transaction Fees / Gas

Validators and their Delegators earn CUDOS used in the network as gas. Each transaction costs gas for execution of computational tasks on the network, which is then paid to the Validators for running these jobs and helping secure the operation of the Cudos Network.

### Slashing

Slashing incentivises network participants to act in the interests of the Cudos Network rather than their own self interest and is the main game theoretic mechanism to secure a proof of stake system. If a Validator misbehaves, their delegated stake will be partially slashed.

If validators double sign, are frequently offline or do not participate in governance, their staked CUDOS (including CUDOS of users that delegated to them) can be slashed, and the Validator will be jailed.
The penalty depends on the severity of the violation.
For a validator to be unjailed, it needs to issue an `unjail` command

There are currently two faults that can result in slashing of funds for a Validator and their respective Delegators:

- Double signing: If someone reports on chain A that a validator signed two blocks at the same height on chain A and chain B, and if chain A and chain B share a common ancestor, then this validator will get slashed by 5% on chain A.
- Downtime: If a validator misses more than 95% of the last 10.000 blocks, they will get slashed by 0.01%.

In the Cudos Network, slashed tokens go to the community CUDOS Treasury. That way, participants that misbehave who would seek to harm the network will compensate the damage done to the whole community, by contributing to its maintenance and growth.
