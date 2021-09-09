---
title: Become a validator
---

# Become a Validator

This section provides you with:

## How to run a Validator node

As explained in the article [Types of Nodes](src/docs/learn-cudos/overview/types-of-nodes.md) there are three types of nodes: Full, Sentry, and Seed node.

For one or more validator nodes it is recommended to launch a layer of sentry nodes (at least 1 Sentry node) and optionally Seed nodes with isolating the validator node behind that layer.

You need an IP-address per node which is directly connected to the network. For example, If you have **N** validator nodes and only one Sentry node then only the Sentry node is directly connected to the network. In this case you will need a single IP-address.

### How to Install a Node

To learn how to install each node, please read the following articles:
1. [Learn how to run a full node](/docs/build-and-earn/testnet-guides/run-full-node.md)
2. [Learn how to run a sentry node](/docs/build-and-earn/testnet-guides/run-sentry-node.md)
3. [Learn how to run a seed node](/docs/build-and-earn/testnet-guides/run-seed-node.md)

Check all [testnet guides](/docs/build-and-earn/README.md)

## Secure your node

Setting up a Cudos Node is the starting point for any user wanting to interact with, and play a greater part in, the network. In order to set up a Cudos node, users will require the use of Go/Golang version 1.15 or higher. On-premise or bare metal server providers such as OVH, Leaseweb, IBM, Alibaba, Amazon Web Services, Google Cloud Computing platform, or Microsoft Azure, can be used to generate Cudos nodes and join the Cudos Network.

Once the appropriate hardware and software requirements are met, users will then need to install the Cudos Network’s high-performance compute blockchain, built on the Cosmos SDK, through version control systems such as Github or use the network’s release tags and build from source. The Cudos Network application is the Cosmos SDK-based application that defines the Cudos Network and its special purpose compute workflows.

This application consists of a Cudos Network daemon and command-line interface that, once deployed, runs a full-node version of the Cudos Network blockchain for users to interact with. This bespoke implementation supports innovations such as Inter-Blockchain Communication (IBC) protocol and Cosmos’s recently released Stargate update, to guarantee high levels of reliability and cross-chain interactions inspired by the network’s computing capabilities. This Cudos Network blockchain additionally leverages the most vetted modules within the Cosmos community such as staking, authentication, and governance logic. It also includes special blockchain components and developer toolchains linked to its unique set of high-performance compute use cases and development workflows.

### Recommendations for securing a Validator node

Cudos Validating nodes are Cosmos SDK-specified full nodes. This allows for a heavier-duty set of transaction processing workflows and network-level security exchanges with other members of the network. When setting up a Cudos Network Validator node, Validators will have to decide whether they want to be fully responsible for Key Management or if they want to leverage third-party infrastructure to do so. The Cudos Network blockchain leverages the Tendermint Key Management System in order to ensure high availability access to signing keys as part of the Cudos Network’s block processing workflows. This additionally allows this blockchain to prevent double-signing events. In practice, this feature allows for the tamper-proof storage of Hardware Security Module (HSM) Validator keys, even if the host has been compromised. If choosing to implement an HSM, the Validator should review that HSM's documentation in conjunction with the Tendermint KMS requirements, to ensure suitable compatibility before finalising a choice about this part of the security architecture.

An additional security and availability consideration is the use of one or more sentry nodes between a Validator node and the public internet. This mechanism is used to place a layer of separation between the security-sensitive Validator node, and would-be sources of attack.

Such attack types can include things like traffic-volume-based distributed denial-of-service (DDoS) attacks, designed to starve the Validator of available bandwidth in servicing legitimate usage, as well as malformed/spam message attacks, intended to consume processing or storage resources on the Validator, or induce unintended behaviour.

We currently recommend the use of one sentry node whose exterior faces the public internet, with its interior attached to a private internal network. The Validator node then is connected solely to the private internal network, therefore allowing the proxying of all requests to and from the Validator via the sentry. Additionally, we recommend that the sentry's internet connection is further protected by a provider-managed firewall and DDoS-mitigation service.

![](./Security.png)

As previously indicated in the node minimum hardware requirements, our favoured recommendation is to implement discrete physical servers for the Validator and sentry. Using that specification, the separation of public internet and private internal network may be achieved either through physically separated interfaces, or a VLAN-based configuration.

It is technically possible to use a hypervisor on a single physical server, with system VMs for each of the Validator and sentry roles, and to use virtual networking to create the recommended security topology. We do not discourage this approach, but do strongly recommend a thorough understanding of the prospective security and performance considerations prior to implementation.

An extension of the sentry node architecture optionally sees a Validator operator adding additional sentries. For those concerned about risks such as DDoS attacks consuming all bandwidth into the single recommended sentry, it is possible to add further sentries, optionally across multiple discrete geographies with independent internet connections. The private internal network for connection between sentries and the Validator would then need to be stretched out to these.

Beyond the set up of a server, a node, an authenticated way of joining the Cudos blockchain using our in-built public key infrastructure, in coordination with Ledger HSM or YubiHSM for those Validators choosing to implement them, the use of full nodes when interacting the network is highly recommended. Thanks to ongoing advances in the Cosmos ecosystem, we plan to implement the ability for Cudos Validator Nodes to store a history of previously signed blocks in order to more seamlessly prevent double-signing by adverse or deficient nodes in the Cudos Network. This feature is currently absent in earlier-generation Tendermint blockchains. The final element keeping Cudos Network Validating nodes safe is the Tendermint Core Byzantine Fault Tolerant Proof of Stake consensus algorithm.

## Hardware requirements

The following are the minimum hardware requirements Validators will need to run to successfully join and operate on the Cudos Network for the Testnet and Mainnet (Version 1) stage:

#### Cudos mainnet ("Ingenii") Validator node

* Intel Xeon ('Skylake-SP' or newer) processor ‑or‑ AMD Epyc ('Naples' or newer) processor – Requires SGX ‑or‑ SEV feature, as well as AVX and AES-NI feature – Minimum model ≥8 cores at ≥2.0 GHz required (≥16 cores preferred)
* 32GiB ECC system memory (≥64GiB preferred)
* ≥2TB NVMe SSD - RAID1 or better resilience required (RAID 1+0 performance preferred) – High DWPD/TBW endurance drives strongly recommended
* Redundancy of server power and cooling components is strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
'Four‑nines' availability target or better
* Linux Debian 10

#### Cudos mainnet ("Ingenii") Sentry node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required (≥8 cores preferred)
* ≥16GiB ECC system memory
* ≥500GB NVMe SSD - RAID1 or better resilience required
* Redundancy of server power and cooling components is strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 1Gb/s internet connection (≥2.5Gb/s preferred)
* Publicly accessible IPv4 address (additionally IPv6 recommended)
* Anti-DDoS protection is strongly recommended
'Four‑nines' availability target or better
* Linux Debian 10

#### Cudos public testnet ("Somniorum") Validator node

* Intel Xeon ('Skylake-SP' or newer) processor ‑or‑ AMD Epyc ('Naples' or newer) processor – Requires SGX ‑or‑ SEV feature, as well as AVX and AES-NI feature – Minimum model ≥8 cores at ≥2.0 GHz required (≥16 cores preferred)
* 32GiB ECC system memory (≥64GiB preferred)
* ≥2TB NVMe SSD - RAID1 or better resilience recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* Linux Debian 10

#### Cudos public testnet ("Somniorum") Sentry node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required (≥8 cores preferred)
* ≥16GiB ECC system memory
* ≥500GB NVMe SSD - RAID1 or better resilience recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 1Gb/s internet connection (≥2.5Gb/s preferred)
* Publicly accessible IPv4 address (additionally IPv6 recommended)
* Linux Debian 10

As the network evolves and the Cudos community receives more feedback on the above, we expect these figures to be updated and communicated to network stakeholders on an ongoing basis.

## Rewards

Validators play a unique role in the Cudos Network’s day-to-day workings. They accept transactions, validate blocks, and interact with other stakeholders in various Governance votes that ensure the network’s security, integrity and viability.

As part of that, Validators run and execute smart contracts, which are one of the key aspects of the network, and coordinate the triggering and execution of computing workloads. Thus, the network’s health depends on Validators availability and performance and the early identification of any dangerous and harmful behaviours.

Validators earn several types of standard rewards, in addition to one-off additional ones:

* They earn Staking Rewards to incentivise their crypto-economic contributions to the network over time.
* They earn a commission on the stake delegated through them, as part of the delegated proof of stake mechanism, from any users who do not run infrastructure for the network but want to support it.
* They earn gas fees.

After the mainnet launch and the network gains traction, staking rewards will become a secondary source of revenue, and network fees will become the main one.


After the mainnet is launched and the network gains traction, staking rewards will become a secondary source of revenue, and network fees will become the main one.

### Mainnet validators

Once we deploy the Cudos Network mainnet, Validators (and stakers) staked in Ethereum will be migrated from Ethereum Staking to full PoS staking in the network. The balances will be converted to the native CUDOS token, and Validators will begin processing blocks for the network. At this point, Validators will need to be running Cudos nodes with appropriate hardware to maintain the network and validate transactions.

Cudos is also finalising the architecture of the compute capabilities of the network. We will soon communicate how the compute offering will integrate into the network, and any additional hardware requirements for running compute jobs.

The Cudos Network penalises adverse behaviours, and the node operators or Validators linked to these automatically to incentivise the highest level of security, availability, and economic integrity. The types of penalties a Validator can incur on the network have several levels of severity. Some may lead to immediate, irreversible exclusion. Others may lead to time-outs from additional Staking rewards. Cudos as a team is working to ensure that these metrics are real-time and accurately predictive to guarantee that we only offer the highest quality of computing power on our network.

## Delegated staking and rewards

The Cudos network will support delegated staking through the Validators. The Validators earn a proportion of the rewards of the users who delegated the staked through them. Each Validator can freely choose the fee. However, it will always need to be above a predefined minimum value set for security reasons. This minimum will be 2% at the start.

Any user with CUDOS tokens, including Validators, can delegate their stake through a Validator. One wallet can delegate the stake to more than one Validator.

All staking participants earn rewards individually based on their staked amount. Each staking participant receives the percentage of the rewards proportional to the percentage of the total stake they own. For example, if a total of 500 tokens are staked by users, and if one of the users staked 50 tokens, then this user gets 50/500 = 10% of the total rewards being distributed (excluding commissions).

Rather than staking all tokens in a Validator hosted by the project, Cudos will stake some tokens delegating them to other Validators in the network. This will enhance the revenue streams for these Validators further. We will share more details on this shortly, but expect the project to delegate an amount similar to the minimum stake for a Validator.
