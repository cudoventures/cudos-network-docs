---
title: Types of Nodes
---

# Types of Nodes

Cudos has three types of nodes that are explained in this article:
* Full node
* Seed node
* Sentry

## Full node

A full node is a node that participates in the network but without support in securing it. You can use this type to store the entire state of a blockchain including blocks and the modified state of transactions. when you run a full node, you support the network to reach the consensus until the current block. So it is important to secure your node from adversarial actors (you can use a firewall and a proxy).

## Seed node

A seed node generates a list of peers to which another node can connect. When you want to start a node, you need to give at least one type of node to be able to connect to join the desired network. This will allow you to populate your address quickly. Note that after a seed node provides a list of peers, it will not be a peer and it will disconnect from your node.

## Sentry node

A sentry node is like a full node but it has one or more private peers. The private peers can represent validators or other full nodes in the network. It provides a security layer for your validator.
