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

Designed as a scalable alternative to larger, expensive chains the Cudos Network allows complex applications to run completely on-chain where that would've previously been prohibitively expensive or simply impossible due to gas limits. Cudos Network runs on a Delegated Proof of Stake (DPoS) consensus model, with Validators checking transactions and providing compute cycles for DApps on the network to consume.

Developers, individuals, and businesses will deploy next-generation smart contracts that leverage CosmWasm (and later EVM via Ethermint) with the security assurances of distributed ledger technology. This higher level of performance and security is possible thanks to the Cudos blockchain’s ability to leverage a strong community of Validators with a robust node infrastructure. This gives users of the Cudos Network a high level of confidence in the various enterprise and developer use cases that are subsequently deployed.

What makes the Cudos Network stand out from other blockchains is the deep level of integration for high-performance compute capacity at the very core of the network. This allows Cudos to provide an extra computing layer to blockchains, unlocking an extensive array of additional use cases for which high-performance computing power is needed.

### Ecosystem

Cudos Network is built using Tendermint Core and inherits its Delegated Proof of Stake (DPoS) algorithm. In addition to leveraging Tendermint Core, the Cudos Network is supported by the Cosmos SDK to achieve high throughput, availability, and security. This architecture allows easy cross-chain compatibility with many other blockchains, particularly those already built on the Cosmos SDK, by leveraging the nascent IBC protocol for moving assets between these systems securely.

The promise of computing, which is core to the Cudos Network’s mission, is also expanded beyond Cosmos-based blockchains through bespoke bridges and cryptographic approaches to cross-chain interoperability. Cudos Network launches with a bridge to Layer-1 Ethereum, and we plan to expand our compute offering to a wider array of networks in the future.

### Design Principles

1. Making efficient use of the world’s existing computing resources
2. Multi-chain future
3. Public, permission-less software > privately owned source code

## CUDOS

CUDOS is a multi-chain layer 2 solution, providing Turing-complete compute and external data to blockchains. Because blockchains are immutable, this means they are generally very limiting in what they can do. This very much restricts their use, and without another solution use cases like DeFi would not exist. CUDOS provides a bridge between the blockchain world and the outside world to enable blockchains to consume outside data, APIs and compute.

CUDOS goes a step further as well, and integrates seamlessly with Cudo, a distributed computing platform that can effectively be understood as a layer 3 for blockchains. This allows the use of specialised hardware on-demand, requested directly on-chain from a smart contract.

### Why is CUDOS needed?

Layer 2 networks are a necessity for various blockchains, for different reasons. In ethereum, gas costs are prohibitively high when trying to run complex workloads or store data. In the case of Algorand (which is a Top 50 blockchain) their blockchain is not Turing complete which means it is very limited in its computing capability. CUDOS is working closely with the Algorand team to bring DeFi data feeds and a Layer 2 compute network to the Algorand network to make them a full computing network.

Blockchains are also missing an effective method to fetch and use external data, which is crucial for many applications including DeFi. CUDOS is a necessary step for blockchain technology to progress to its next phase and reach mass-adoption.

### CUDOS compute oracle

CUDOS is a bridge between blockchains and the outside world, to enable the use of external data, APIs and extra compute power that is not limited by the blockchain’s difficulties. This bridge is an absolute necessity for blockchain to reach mass-adoption, as most blockchains are completely disconnected from the outside world, making any interaction impossible.

![CUDOS network diagram](./cudos-diagram.png)

## Why CUDOS?

The CUDOS network is helping blockchain achieve its next adoption level. The underlying Cudo network has been under development since 2017, is live with over 150,000 users signed up in over 145 countries, and around 20,000 nodes running various blockchain and compute workloads on the Cudo network. The OS, front end software, management software, billing engine and all the other available features are all available at [cudominer.com](https://www.cudominer.com/).

Therefore, CUDOS not only has a very experienced team behind with a proven track record in the cryptocurrency world, but also has global partnerships in place with data and compute providers. The Cudo team has been working very hard over the last years to be able to reach this point, and is now ready to provide compute to both blockchains through the CUDOS network and traditional cloud with Cudo, with the vision of merging both together when all technologies are ready globally.

## How does CUDOS work?

Smart contracts written in a layer 1 network can invoke the CUDOS smart contract, deployed in that same layer 1 network, in order to request work to be computed off-chain or to access external data. The off-chain computation is done in the CUDOS validator nodes, which need to stake 2,000,000 CUDOS in order to be eligible. These nodes are constantly listening to events in the CUDOS smart contract, to see when a new request for a compute job is created. This request includes three main components:

- A targets identifier
- An app hash identifier
- Any inputs needed for that workload.

The target identifier refers to some piece of data that is used by the CUDOS nodes to decide when they need to run a job. This can either be a set of hashes identifying each individual node separately, or some unique identifier which the nodes use to decide whether they need to run the job.

The app hash is used in order to decide which code the CUDOS nodes need to run. That hash can either refer to an existing app from the CUDOS dapp marketplace, or it can point to an external storage address where some code written by the requester has been previously uploaded. Last, the request to the CUDOS contract may also include a list of inputs to be used by the code or app that will run in the nodes. These inputs can be passed directly in the request, if they are just short numbers or characters, but will typically be addresses pointing to an external storage solution where the input data has been uploaded beforehand.

Once a node has heard an event and has decided that it should run the work, that triggers its WebAssembly executor part. Note that listening to the blockchain is already an off-chain process, so this process is not constrained by the blockchain’s limitations anymore. Once execution starts, the node will fetch the passed inputs, and will send the relevant API requests to the marketplace and the app in order to run the compute workload.

After the result is obtained in each CUDOS validator node, a consensus check might be needed in order to return a unique result to the original requesting smart contract on the layer 1 blockchain. Once that unique result (or address storing the result) has been decided and sent to the CUDOS smart contract, the original smart contract can fetch it.

Validators, meaning individuals who have financially committed funds through a process known as staking, notarize, and in fact validate, every transaction proposed onto the network with high availability and trust levels that are assessed in a real-time and predictive manner. The Cudos Network rewards the most well-performing Validators with a predictable income stream. It also rapidly removes misbehaving actors from its Proof of Stake network to assure a greater level of security for all participants. The combination of these factors incentivise any individual today, from investors to data-centre or compute infrastructure providers, to interact reliably on the Cudos Network to buy or sell compute capacity at scale.

<!-- TODO

## CUDOS Token

### Tokenomics

### Utility

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

## How to delegate

Stake delegation will be done via a delegating provider, for the available supported staking providers of the CUDOS network.

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
