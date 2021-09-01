---
title: Run a Validator Node
---

# How to Run a Validator Node

As explained in the article [Types of Nodes](src/docs/learn-cudos/overview/types-of-nodes.md) there are three types of nodes: Full, Sentry, and Seed node.

For one or more validator nodes it is recommended to launch a layer of sentry nodes (at least 1 Sentry node) and optionally Seed nodes with isolating the validator node behind that layer.

You need an IP-address per node which is directly connected to the network. For example, If you have **N** validator nodes and only one Sentry node then only the Sentry node is directly connected to the network. In this case you will need a single IP-address.

## How to install a node

To learn how to install each node, please read the following articles:
1. [Learn how to run a full node](/docs/build-and-earn/testnet-guides/run-full-node.md)
2. [Learn how to run a sentry node](/docs/build-and-earn/testnet-guides/run-sentry-node.md)
3. [Learn how to run a seed node](/docs/build-and-earn/testnet-guides/run-seed-node.md)

Check all [testnet guides](/docs/build-and-earn/README.md)
