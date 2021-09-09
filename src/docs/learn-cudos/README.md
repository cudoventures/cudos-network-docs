---
title: Learn Cudos
---

## Overview

The Cudos Network is a special-purpose blockchain designed to provide high-performance, trustless, and permissionless cloud computing for all. Consensus on the network is achieved by using the Tendermint Core and its Delegated Proof of Stake (DPoS) algorithm. In addition to leveraging Tendermint Core, the Cudos Network is supported by the Cosmos SDK to achieve high throughput, availability, and security. The promise of computing, which is core to the Cudos Network’s mission, is also expanded beyond Cosmos-based blockchains through bespoke bridges and cryptographic approaches to cross-chain interoperability. While Ethereum is the first Layer-1 blockchain we plan to interoperate during our Mainnet launch, we plan to expand our compute offering to a wider array of networks.

Developers, individuals, and businesses will deploy next-generation smart contracts that leverage CosmWasm (and later EVM via Ethermint) with equal security assurances to traditional blockchain networks on the Cudos Network. The added benefits are faster transaction speeds and fundamentally lower transaction costs. This will allow Cudos to fulfil its mission of providing an extra computing layer to blockchains, unlocking an extensive array of additional use cases for which high-performance computing power is needed.

This higher level of performance and security is possible thanks to the Cudos Blockchain’s ability to leverage a strong community of Validators with a robust node infrastructure. This gives users of the Cudos Network a high level of confidence in the various enterprise and developer use cases that are subsequently deployed. What makes the Cudos Network stand out from other blockchains is the deep level of integration for high-performance computes capacity at the very core of the network.

Validators, meaning individuals who have financially committed funds through a process known as staking, notarize, and in fact validate, every transaction proposed onto the network with high availability and trust levels that are assessed in a real-time and predictive manner. The Cudos Network rewards the most well-performing Validators with a predictable income stream. It also rapidly removes misbehaving actors from its Proof of Stake network to assure a greater level of security for all participants. The combination of these factors incentivise any individual today, from investors to data-centre or compute infrastructure providers, to interact reliably on the Cudos Network to buy or sell compute capacity at scale.

<!-- TODO

## CUDOS Token

### Tokenomics

### Utility

## Cudos Validators

## Cudos Staking

-->

### CUDOS Layer 2 Network

The CUDOS network is a layer 2 solution for blockchains which require extra compute or external data. Blockchains like Ethereum have very high gas costs, which make impractical running complex workloads on them. Other blockchains like Algorand need a layer 2 solution in order to add extra functionality to the platform, through a Turing-complete network that also provides external data.

This work runs on the CUDOS validator nodes. These nodes are constantly listening to events in the CUDOS smart contract, to see when a new request for a compute job is created. They ingest this request, and once they decide that they have been selected to run the work, that
triggers its WebAssembly executor part. Once execution starts, the node will fetch the passed inputs, and will send the relevant API requests to the marketplace and the app in order to run the compute workload.

### Cudo Layer 3 Network

While the CUDOS network provides a layer 2 to blockchains, Cudo Ventures is going one step further, by seamlessly integrating this technology with the Cudo platform, which can effectively be understood as blockchain’s layer 3. The Cudo platform provides cloud-like services, focusing on low costs, low latency and a high degree of personalisation. Hence, just like the CUDOS network is a layer added on top of blockchains to provide extra compute capacity, the Cudo platform can be seen as an extra layer on top of the CUDOS network, to provide even more on-demand compute capacity. This added capacity might be needed in order to select different types of hardware, or to request jobs that demand more resources than the CUDOS network can directly absorb.

As such, the CUDOS smart contracts will provide access to the CUDOS layer 2 and the Cudo layer 3, in order to run any kind of workload on any kind of supported hardware, for as long as needed. This integration takes blockchains a step further into mass-adoption, as there will be no limit in the kind of workloads that can be requested through an on-chain smart contract.

![CUDOS and Cudo connection diagram](./semicudocudos.png)

## WebAssembly (Wasm)

### What is WebAssembly?

WebAssembly (or Wasm for short) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

### Why Web Assembly?

WebAssembly became a W3C recommendation on 5 December 2019 and, alongside HTML, CSS, and JavaScript, is the fourth language to run natively in browsers. This has massive implications for the web, as it provides a way to run code written in multiple languages on the web, almost at native speed.

- [WebAssembly main site](https://webassembly.org/)
- [MDN web docs](https://developer.mozilla.org/en-US/docs/WebAssembly)

### What languages are supported

CUDOS will support all the standard languages that can be compiled, with an initial focus on C++ and Rust. Please do [get in touch](https://www.cudos.org/#contact-us) with us if you are interested in building dapps for CUDOS.

## Types of Nodes

This article explains the three types of nodes within the Cudos system:
* Full node
* Seed node
* Sentry node

### Full node

A full node is a node that participates in the network but without support in securing it. You can use this type to store the entire state of a blockchain, including blocks and the modified state of transactions. When running a full node, you support the network to reach the consensus until the current block. So it is important to secure your node from adversarial actors by using a firewall and a proxy.

### Seed node

A seed node generates a list of peers to which another node can connect. When you want to start a node, you need to give at least one type of node to join the desired network. This will allow you to populate your address quickly. Note that after a seed node provides a list of peers, it will no longer be a peer and will disconnect from your node.

### Sentry node

A sentry node is like a full node, but it has one or more private peers. The private peers can represent validators or other full nodes in the network. It provides a security layer for your validator.
