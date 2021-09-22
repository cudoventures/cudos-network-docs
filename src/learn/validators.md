---
title: Cudos Validators
---

## Overview

Cudos Validators run node software to operate the Cudos Network blockchain by checking incoming transactions and forming new blocks in a decentralised manner.

Cudos Network is a Proof of Stake chain so each Validator must put up a token deposit as collateral to participate. The Validator pool is currently permissioned to allow the network to launch with stability, but this will fully open in time.

### Types of Nodes

We currently have three distinct Cudos Nodes types:

* Full Nodes
* Seed Nodes
* Sentry Nodes

We will be layering on [Cudos Compute Nodes](#compute-nodes) to the network in the future. Find a description of each Cudos Node below:

![img](./node-diagram.png)

#### Full Node

A full node is a node that participates in the network but without support in securing it. You can use this type to store the entire state of a blockchain, including blocks and the modified state of transactions. When running a full node, you support the network to reach the consensus until the current block. So it is important to secure your node from adversarial actors by using a firewall and a proxy.

You can configure your full node to become a **Validator Node** that interfaces with a validator signing key. Validator nodes must have high security setup, and should not accept incoming connections. They should maintain outgoing connections to a controlled set of Sentry Nodes that serve as their proxy shield to the rest of the network.

Validators that know and trust each other can accept incoming connections from one another and maintain direct private connectivity via VPN. The validator nodes only needs to be able to connect to its sentry nodes, preferably via a private network and never to be exposed directly on the public network.

#### Seed Node

A seed node generates a list of peers to which another node can connect. So you can think of a seed node as the first point of contact for a new node joining the network. After a seed node provides a list of peers to the network, it will no longer be a peer and will disconnect.

#### Sentry Node

A sentry node is like a full node, but it has one or more private peers. The private peers can represent validators or other full nodes in the network. It provides a security layer for your validator.  They should always expect to have direct incoming connections from the validator node.

The Validator node talks to the Sentry nodes that are provided, the Sentry nodes communicate to the Validator node via a private connection and the rest of the network via a public connection. The Sentry nodes have the option to communicate with other Sentry nodes as well.

### Compute Nodes

Compute Nodes will be responsible for listening to the Cudos smart contracts and running any workloads when relevant. When selecting a workload from the CUDOS smart contracts the requestor may choose to use nodes supporting AMD’s SEV technology for added security. AMD’s SEV technology allows the memory contents of a VM to be transparently encrypted with a key unique to the guest VM. This adds an extra layer of security and protection to the network, for both the node and the job requester.

The following sketch shows a request triggering a Cudos workload. A layer 1 smart contract requests some work through the Cudos smart contract, triggering an event. The Cudos nodes listen to the contract’s events, and execute the requested work when they are chosen. After fetching the data and running the workload, the result is returned to the CUDOS smart contract.

![CUDOS node diagram](./node-for-wiki.png)

#### 24x7 Utilisation of Infrastructure

Cudos Network can fully utilise the hardware of all nodes at all times. When there are not enough blockchain workloads coming from the Cudos smart contracts to fully utilise the node’s hardware, the nodes can use the Cudo platform to receive workloads, including cryptocurrency mining. Thus, the nodes are able to receive workloads to stay at full utilisation at all times.

Cudos nodes can receive compute workloads from many different sources. These include work requested from the Cudos smart contracts, cryptocurrency mining, other blockchain workloads and more traditional “cloud-like” workloads, such as video rendering, scientific simulations or weather prediction.

## Staking

Validators need to stake 2,000,000 CUDOS when they connect to the Cudos Network in order to become eligible for rewards. Users can also delegate additional CUDOS stake to a Validator to earn a portion of rewards.

### Staking Rewards

Validators will get rewarded for their support to the network in the form of staking rewards. These rewards will depend on the number of validators and users delegating their stake in the network: the more staking there is, the lower the staking rewards for all participants will be. These rewards will be calculated by a smart contract, with upper and lower limits which will not be passed regardless of the staking amounts in the network. The lower limit will be around 5% when all circulating tokens are staked.

### Transaction Fees / Gas

Validators earn CUDOS used in the network as gas, each transaction costs gas which is paid to the Validators for helping secure the operation of the Cudos Network.

## Slashing

Slashing refers to the action of removing tokens that are staked by a Cudos Validator due to malicious or harmful behaviour to the network. This security mechanism underpins the Cudos Network ensuring it is in the Validators interest to not act maliciously or try to game the system, as otherwise they will be financially penalised.

In the Cudos Network, slashed tokens go to the community CUDOS Treasury. That way, participants that misbehave who would seek to harm the network will compensate the damage done to the whole community, by contributing to its maintenance and growth.

### Offences

Slashing in the Cudos network will be calculated based on a mixture of factors, including downtime and incomplete or failed workloads received through the Cudos smart contract. Slashing might also affect the trust score of a Cudos Node.

## Be a Cudos Validator

If you are interested in becoming an early Cudos Validator please get in touch with us using [this application form](https://www.cudos.org/#contact-us).

If you're already on the whitelist and looking to get setup on your hardware with a Validator Node please visit our [build docs](/build/validator.html)
