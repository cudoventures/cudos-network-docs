---
title: Learn
---

## Cudos Network

The Cudos Network is a special-purpose blockchain designed to provide high-performance, trust-less, permission-less cloud computing for all.

Builders on the network get access to:
<br>🔧 High application performance
<br>🏗 Developer-friendly smart contract tools
<br>💱 Composable asset management

Users of the chain benefit from:
<br>🔐 High cryptographic security
<br>🔬 Public blockchain transparency
<br>📬 Cross-chain interoperability
<br>🌳 Carbon-neutral transactions

Designed as a scalable alternative to larger, more expensive chains the Cudos Network allows complex applications to run completely on-chain where that would've previously been prohibitively expensive or simply impossible due to gas limits. Cudos Network runs on a Delegated Proof of Stake (DPoS) consensus model, with Validators checking transactions and providing compute cycles for DApps on the network to consume.

Developers, individuals and businesses will deploy next-generation smart contracts that leverage CosmWasm (and later EVM via Ethermint) with the security assurances of distributed ledger technology. This higher level of performance and security is possible thanks to the Cudos blockchain’s ability to leverage a strong community of Validators with a robust node infrastructure. This gives users of the Cudos Network a high level of confidence in the various enterprise and developer use cases that are subsequently deployed.

What makes the Cudos Network stand out from other blockchains is the deep level of integration for high-performance compute capacity at the very core of the network. This allows Cudos to provide an extra computing layer to blockchains, unlocking an extensive array of additional use cases for which high-performance computing power is needed.

### Ecosystem

Cudos Network is built using Tendermint Core and inherits its Delegated Proof of Stake (DPoS) algorithm. In addition to leveraging Tendermint Core, the Cudos Network is supported by the Cosmos SDK to achieve high throughput, availability and security. This architecture allows easy cross-chain compatibility with many other blockchains, particularly those already built on the Cosmos SDK, by leveraging the nascent IBC protocol for moving assets between these systems securely.

The promise of computing, which is core to the Cudos Network’s mission, is also expanded beyond Cosmos-based blockchains through bespoke bridges and cryptographic approaches to cross-chain interoperability. Cudos Network launches with a bridge to Ethereum, and we plan to expand our compute offering to a wider array of networks in the future.

### Design Principles

1. Making efficient use of the world’s existing computing resources
2. Multi-chain support
3. Public, permission-less software > privately owned source code

## CUDOS Token

The Cudos Network is powered by CUDOS, the native token on the network, which can be used for; funding compute workloads (as gas), contributing to network security (as stake), and governance participation.

CUDOS can be bridged between the Cudos Network and Ethereum (and vice versa) using the [Gravity Bridge](/learn/gravity-bridge.html).

## Explorer

The [Cudos Network Explorer](https://explorer.cudos.org/) is a web application that allows users an easy insight into activity on the network as well as access some of the fundamental features of the blockchain

### Staking

Connecting to the Explorer with a [Keplr Wallet](/build/account-setup.html) allows any user to use their tokens within the network as stake (which props up the security mechanism of the entire chain via DPoS consensus).

To use CUDOS to stake as a Validator you will first have to [install the node](/build/validator.html) and then stake 2,000,000+ CUDOS

To use CUDOS as a Delegator please visit the [Earn page](/earn/staking.html#delegator-rewards) for more details on using the Explorer UI

### Transactions

The Cudos Network is a public blockchain and as such anyone can view or consume the transaction information passing through each block. The Explorer UI is an easy window into the current transaction activity showing details of the transaction details themselves as well as address data for the sender/location.

Please visit the [Transactions page](https://explorer.cudos.org/transactions) to dig into the data.

### Proposals

Governance proposals will be used for decision making on the future of the Cudos Network. The Explorer UI allows anyone to easily check any live proposals and if they connect via a valid wallet also vote on the outcome of any live proposal.

Please visit the [Proposals page](https://explorer.cudos.org/proposals) to find out more on active proposals.

<!-- TODO: write a full step-by-step instruction on how to initiate a new proposal and vote on an active proposal for ARTEMIS-BUZZ#7 -->

### Faucet

The Cudos Network Faucet is a way for any user of the Somniorum testnet to be able to claim some free test CUDOS for use as gas within the test network. Each address can claim their allocation of test CUDOS once, if you require tokens please visit [this page](https://explorer.cudos.org/faucet).

## Wallet

The [Cudos Network Wallet](https://wallet.cudos.org/) is a web application which is used by ERC-20 CUDOS holders to signup as Validators to the network or delegate their tokens as stake to other Validators

## Existing CUDOS Products

The underlying elements to support Cudo Network have been under development since 2017 primarily in the form of Cudo Miner which is live with over 150,000 users signed up in over 145 countries, and around 20,000 nodes running various blockchain and compute workloads. The OS, front-end software, management software, billing engine and all the other available features are all available at [cudominer.com](https://www.cudominer.com/).

Cudo Ventures has many global partnerships in place with data and compute providers and is working to bring these existing entities on-chain to supply scalable compute to the Cudos Network. These compute partnerships allow Cudos Network to plug into under-utilised or redundant hardware which helps make better use of existing computational resource, as opposed to building new hardware and further contributing to the climate crisis.

<!-- TODO: rewrite this section with up-to-date architecture & design

## How does Cudos Network work?

Smart contracts written in a layer 1 network can invoke the CUDOS smart contract, deployed in that same layer 1 network, in order to request work to be computed off-chain or to access external data. The off-chain computation is done in the CUDOS validator nodes, which need to stake 2,000,000 CUDOS in order to be eligible. These nodes are constantly listening to events in the CUDOS smart contract, to see when a new request for a compute job is created. This request includes three main components:

- A targets identifier
- An app hash identifier
- Any inputs needed for that workload.

The target identifier refers to some piece of data that is used by the CUDOS nodes to decide when they need to run a job. This can either be a set of hashes identifying each individual node separately, or some unique identifier which the nodes use to decide whether they need to run the job.

The app hash is used in order to decide which code the CUDOS nodes need to run. That hash can either refer to an existing app from the CUDOS dapp marketplace, or it can point to an external storage address where some code written by the requester has been previously uploaded. Last, the request to the CUDOS contract may also include a list of inputs to be used by the code or app that will run in the nodes. These inputs can be passed directly in the request, if they are just short numbers or characters, but will typically be addresses pointing to an external storage solution where the input data has been uploaded beforehand.

Once a node has heard an event and has decided that it should run the work, that triggers its WebAssembly executor part. Note that listening to the blockchain is already an off-chain process, so this process is not constrained by the blockchain’s limitations anymore. Once execution starts, the node will fetch the passed inputs, and will send the relevant API requests to the marketplace and the app in order to run the compute workload.

After the result is obtained in each CUDOS validator node, a consensus check might be needed in order to return a unique result to the original requesting smart contract on the layer 1 blockchain. Once that unique result (or address storing the result) has been decided and sent to the CUDOS smart contract, the original smart contract can fetch it.

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

## Earnings from treasury

The CUDOS treasury has two main sources of income:
- 20% of the payments made through CUDOS
- All tokens slashed due to malicious behaviour

First, once a request for external data or compute is made through the CUDOS smart contracts, 80% of the payment will go to the actual hardware suppliers that will run the compute job, and the other 20% will go to the treasury. Similarly, all slashed tokens will also be sent to the treasury.

Treasury tokens will mainly be used for the following four reasons:
- Staking rewards
- Development foundation
- Development grants
- Shared with developers of marketplace templates

Part of leftover tokens may be burnt in order to reduce the amount of tokens.

## Governance

One of the main attractive points of blockchains is decentralisation. By not having a central trusted entity, blockchains are not controlled by a single person or company, but by the community developing and sustaining it. As such, all projects built on top of a blockchain need to aim for that same level of decentralisation at some point, as otherwise this key property would be lost.

Governance tokens are a solution for the platforms built on top of blockchains to avoid single points of trust. Similar to PoS, governance tokens allow all stakeholders to participate in the network, and in the decision making processes that alter the behaviour and the attributes of the network.

One way to think about this is in terms of democracy: all token holders are eligible to vote on proposals that any of them push forward in the community. That way, there is no need for a central entity that controls the network, as the community itself rules it democratically.

### CUDOS governance

CUDOS validator nodes (CVNs) will have control over the governance of the CUDOS network. Trust scores will be used to calculate a weighted average score, which will determine the weight of each node in the decision making process. By limiting the total amount of CUDOS tokens staked and the delegated staking that each CVN can receive, as well as introducing weighted probability algorithms to distribute the selection of nodes when developers do not explicitly choose them, the network is expected to have an even distribution of stakes among a sufficiently large number of nodes.

Each CVN will be free to choose how to involve users delegating their stake to them. For example, they could choose to regularly propose polls about the most discussed topics within its delegators, to then propose changes on the network based on the outcomes. In order to ensure a smooth start of the platform and to prevent abuse, Cudo will control the governance of the network in the initial alpha stages. When validators have earned a high enough score and the platform has reached enough maturity and usage, governance will be fully handled by the nodes.

## CUDOS Treasury

The CUDOS Treasury holds funds to be used to grow the Cudos Network and reward valuable contributions. This fund will be transparent and governance proposal mechanisms will be employed for distribution.

![CUDOS treasury](./treasury-slide.png)

These tokens will be used mainly for:

- Staking rewards
- Development foundation
- Development grants
- Developers of marketplace templates

Similarly, treasury funds will also be used to [give developers and participants grants](/earn/grants.html), in order to enable new functionality in the network, to improve it, to propose changes, etc.

### Funding the Treasury

The Treasury is funded via:

1. 20% of the CUDOS paid for transactions requested through the Cudos smart contracts
2. Validator slashing

### Governance

Cudos Network will progressively decentralise to token holders and proposal voting will be in place for spending any CUDOS in the CUDOS Treasury

-->
