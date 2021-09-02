---
title: Types of Nodes
---

# Types of Nodes

This article explains the three types of nodes within the Cudos system:
* Full node
* Seed node
* Sentry node

## Full node

A full node is a node that participates in the network but without support in securing it. You can use this type to store the entire state of a blockchain, including blocks and the modified state of transactions. When running a full node, you support the network to reach the consensus until the current block. So it is important to secure your node from adversarial actors by using a firewall and a proxy.

## Seed node

A seed node generates a list of peers to which another node can connect. When you want to start a node, you need to give at least one type of node to join the desired network. This will allow you to populate your address quickly. Note that after a seed node provides a list of peers, it will no longer be a peer and will disconnect from your node.

## Sentry node
A sentry node is like a full node, but it has one or more private peers. The private peers can represent validators or other full nodes in the network. It provides a security layer for your validator.
