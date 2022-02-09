---
title: Cudos Network Introduction
---
<!-- was README.md-->

# Cudos Network Introduction

The Cudos Network is a special-purpose blockchain designed to provide high-performance, trust-less, permission-less cloud computing for all.

**Builders on the network get access to:**
<br>🔧 High application performance
<br>🏗 Developer-friendly smart contract tools
<br>💱 Composable asset management

**Users of the chain benefit from:**
<br>🔐 High cryptographic security
<br>🔬 Public blockchain transparency
<br>📬 Cross-chain interoperability
<br>🌳 Carbon-neutral transactions

Designed as a scalable alternative to larger, more expensive chains the Cudos Network allows complex applications to run completely on-chain, which in other chains would be prohibitively expensive or simply impossible due to gas limits. Cudos Network runs on a **Delegated Proof of Stake (DPoS)** consensus model, with [Validators](/learn/validators.html) checking transactions and providing compute cycles for DApps to consume.

Developers, individuals and businesses will deploy next-generation smart contracts that leverage the Cosmos ecosystems **CosmWasm** platform (and later EVM via Ethermint) with the security assurances of distributed ledger technology. This higher level of performance and security is possible thanks to the Cudos blockchain’s ability to leverage a strong community of Validators with a robust node infrastructure. This gives users of the Cudos Network a high level of confidence in the various enterprise and developer use cases that are subsequently deployed.

What makes the Cudos Network stand out from other blockchains is the deep level of integration with **high-performance compute capacity** at the very core of the network. This allows Cudos to provide an extra computing layer to blockchains, unlocking an extensive array of additional use cases for which high-performance computing power is needed.

### Ecosystem

Cudos Network is built using **Tendermint Core** and inherits its Delegated Proof of Stake (DPoS) algorithm. In addition to leveraging Tendermint Core, the Cudos Network is supported by the **Cosmos SDK** to achieve high throughput, availability and security. This architecture allows easy cross-chain compatibility with many other blockchains, particularly those already built on the Cosmos SDK, by leveraging the nascent Inter-Blockchain Communication (IBC) protocol for moving assets between these systems securely.

The promise of computing power, which is core to the Cudos Network’s mission, is also expanded beyond Cosmos-based blockchains through bespoke bridges and cryptographic approaches to cross-chain interoperability. Cudos Network launches with a bridge to Ethereum, and we plan to expand our compute offering to a wider array of networks in the future.

### Design Principles

1. Making efficient use of the world’s existing computing resources.
2. Multi-chain support.
3. Public, permission-less software, and privately owned source code.

## CUDOS Token

The Cudos Network is powered by CUDOS, the native token on the network, which can be used for:
- Funding compute workloads (as gas).
- Contributing to network security (as stake).
- governance participation.
<!--
CUDOS can be bridged between the Cudos Network and Ethereum (and vice versa) using the [Gravity Bridge](/learn/gravity-bridge.html).
-->

## Explorer

The [Cudos Network Explorer](https://explorer.cudos.org/) is a web application that allows users an easy insight into activity on the network as well as access some of the fundamental features of the blockchain

::: warning Note
Currently we have two versions of the explorer running. [Explorer v1](https://explorer.cudos.org/)is for actively interacting with the blockchain (for instance delegating CUDOS or making Proposals), whereas [Explorer v2](https://explorer-v2.cudos.org/) is for monitoring. Eventually the explorers will merge into a single platform.
:::

### Staking

Connecting to the Explorer with a Keplr Wallet allows any user to use their tokens within the network as stake (which props up the security mechanism of the entire chain via DPoS consensus).

To use CUDOS to stake as a Validator you will first have to install the node and then stake 2,000,000+ CUDOS.

To use CUDOS as a Delegator please visit the [Earn page](/earn/staking.html#delegator-rewards) for more details on using the Explorer UI

### Transactions

The Cudos Network is a public blockchain and as such anyone can view or consume the transaction information passing through each block. The Explorer UI is an easy window into the current transaction activity showing details of the transaction details themselves as well as address data for the sender/location.

Please visit the [Transactions page](https://explorer.cudos.org/transactions) to dig into the data.

### Proposals

Governance proposals will be used for decision making on the future of the Cudos Network. Validators with CUDOS can vote on proposals on a 1 token 1 vote basis, including any stake they have delegated via them by other CUDOS holders. The Explorer UI allows anyone to easily check any live proposals and if they connect via a valid wallet also create or vote on the outcome of any live proposal.

The governance module inherited from CosmosSDK currently supports:

- Proposal submission: Users can submit proposals with a deposit. Once the minimum deposit is reached, proposal enters voting period
- Voting: Participants can vote on proposals that reached MinDeposit
- Inheritance and penalties: Delegators inherit their validator's vote if they don't vote themselves.
- Claiming deposit: Users that deposited on proposals can recover their deposits if the proposal was accepted OR if the proposal never entered voting period.

Please visit the [Proposals page](https://explorer.cudos.org/proposals) to find out more on active proposals.

For full guides on how this all works, please read [the latest CosmosSDK docs](https://docs.cosmos.network/master/modules/gov/#contents)


### Faucet (Testnet only)

The Cudos Network Faucet is a way for any user of the Somniorum testnet to be able to claim 10 free test CUDOS for use as gas within the test network. Each address can claim their allocation of test 10 CUDOS once, if you require tokens please visit [this page](https://explorer.cudos.org/faucet).

## Wallet

The [Cudos Network Wallet](https://wallet.cudos.org/) is a web application which is used by ERC-20 CUDOS holders to sign up as Validators to the network or delegate their tokens as stake to other Validators

## Existing Cudos Products

The underlying elements to support Cudo Network have been under development since 2017 primarily in the form of Cudo Miner which is live with over 150,000 users signed up in over 145 countries, and around 20,000 nodes running various blockchain and compute workloads. The OS, front-end software, management software, billing engine and all the other available features are all available at [cudominer.com](https://www.cudominer.com/).

Cudo Ventures has many global partnerships in place with data and compute providers and is working to bring these existing entities on-chain to supply scalable compute to the Cudos Network. These compute partnerships allow Cudos Network to plug into under-utilised or redundant hardware which helps make better use of existing computational resource, as opposed to building new hardware and further contributing to the climate crisis.


