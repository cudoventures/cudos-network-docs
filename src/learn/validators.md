---
title: Cudos Validators
---

## What is a validator

Validators are, in general, nodes in a blockchain network that validate the transactions. Given the PoS consensus algorithm, the nodes are effectively validators, as they are approving the blocks for the main chain and thus the transactions.

In the CUDOS network, the nodes are the bridge between the blockchain and the outside world, and communicate information back and forth. As such, they can also be understood as validators, which make sure that the data passed through the bridge is accurate.

## How does the CUDOS validator work

CUDOS nodes are responsible for listening to the CUDOS smart contracts and running any workloads when relevant. When selecting a workload from the CUDOS smart contracts the requestor may choose to use nodes supporting AMD’s SEV technology for added security. AMD’s SEV technology allows the memory contents of a VM to be transparently encrypted with a key unique to the guest VM. This adds an extra layer of security and protection to the network, for both the node and the job requester.

The following sketch shows a request triggering a CUDOS workload. A layer 1 smart contract requests some work through the CUDOS smart contract, triggering an event. The CUDOS nodes listen to the contract’s events, and execute the requested work when they are chosen. After fetching the data and running the workload, the result is returned to the CUDOS smart contract.

![CUDOS node diagram](./node-for-wiki.png)

### 24x7 utilisation of infrastructure

CUDOS fully utilises the hardware of all nodes 24x7. When there are not enough blockchain workloads coming from the CUDOS smart contracts to fully utilise the node’s hardware, the nodes can use the Cudo platform to receive workloads, including cryptocurrency mining. Thus, the nodes are able to receive workloads to stay at full utilisation at all times.

### Compute, blockchain and other projects on CUDOS

CUDOS nodes can receive compute workloads from many different sources. These include work requested from the CUDOS smart contracts, cryptocurrency mining, other blockchain workloads and more traditional “cloud-like” workloads, such as video rendering, scientific simulations or weather prediction.

## Validator staking

Validators need to stake 2,000,000 CUDOS in order to become eligible. In addition, other users can delegate their stake to a validator.

## Validator economics

Validators will get rewarded for their support to the network in the form of staking rewards. These rewards will depend on the number of validators and users delegating their stake in the network: the more staking there is, the lower the staking rewards for all participants will be. These rewards will be calculated by a smart contract, with upper and lower limits which will not be passed regardless of the staking amounts in the network. The lower limit will be around 5% when all circulating tokens are staked.

## Hardware requirements

Please [get in touch with us](https://www.cudos.org/#contact-us) if you are interested in becoming a validator node to discuss hardware requirements.

## Slashing

### What is slashing?

Slashing refers to the action of taking someone’s tokens that are staked due to malicious or harmful behaviour to the network. Since participants have staked tokens, it is in their interest to not act maliciously or try to game the system, as otherwise they will lose part of their holdings.

In the CUDOS network, slashed tokens will go to the CUDOS Treasury. That way, participants that misbehave and harm the network will compensate the damage done to the whole community, by contributing to its maintenance and growth.

### What slashing is in place?

Slashing in the CUDOS network will be calculated based on a mixture of factors, including downtime and incomplete or failed workloads received through the CUDOS smart contract. Slashing might also affect the trust score of a CUDOS node. This feature will initially be disabled, and the actual policies and figures will be published before going live.

## How to apply to be a validator

Please get in touch with us using [this application form](https://www.cudos.org/#contact-us) if you’re interested in becoming a validator.

## Types of Nodes

This article explains the three types of nodes within the Cudos system:
* Full node
* Seed node
* Sentry node

#### Full node

A full node is a node that participates in the network but without support in securing it. You can use this type to store the entire state of a blockchain, including blocks and the modified state of transactions. When running a full node, you support the network to reach the consensus until the current block. So it is important to secure your node from adversarial actors by using a firewall and a proxy.

#### Seed node

A seed node generates a list of peers to which another node can connect. When you want to start a node, you need to give at least one type of node to join the desired network. This will allow you to populate your address quickly. Note that after a seed node provides a list of peers, it will no longer be a peer and will disconnect from your node.

#### Sentry node

A sentry node is like a full node, but it has one or more private peers. The private peers can represent validators or other full nodes in the network. It provides a security layer for your validator.
