---
title: Mainnet Build Overview
---



# Mainnet Build Overview

::: warning Note
This guide takes you through the process for building nodes on Mainnet. Please refer to the [Testnet](/testnet/testnetoverview.html) section to build nodes on Testnet.
:::

This guide will take you through the process of building nodes that will participate in the Cudos mainnet blockchain.

If you are looking for a quick way to begin testing, you may want to build a *Standalone Node*, however for more security it is recommended that you build a *Validator Cluster* of nodes.

All Cudos nodes run the cudos-noded software, and are initially built as Full nodes. A node can either remain as a Full node only, or can take on one of the roles mentioned below, according to how they are configured. 


A **Standalone Node** is just a full node, whereas the **Standalone Validator** is a Standalone Node acting as a validator. A Standalone Node/Validator is less secure than a Validator Cluster.

A **Validator Cluster** consists of *Validator*, *Sentry* and optionally *Seed* nodes. 

For more information on Node types, please refer to the [Validators](/learn/validators.html#overview) section.




The cudos-noded software is supported on **Debian 10, Ubuntu, WSL,** and **macOS Catalina version 10.15.4 or above**. 

::: warning Note
This document is written for **Debian**
:::


- For information on hardware requirements, please refer to the [Mainnet Hardware Requirements](/build/hardware.md) section.

- For information on node security, please refer to the [Securing Your Nodes](/build/securingnodes.md) section.





