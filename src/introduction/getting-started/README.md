---
title: Getting started
---

# Getting started

## What is CUDOS?

CUDOS is a multi-chain layer 2 solution, providing Turing-complete compute and external data to blockchains. Because blockchains are immutable, this means they are generally very limiting in what they can do. This very much restricts their use, and without another solution use cases like DeFi would not exist. CUDOS provides a bridge between the blockchain world and the outside world to enable blockchains to consume outside data, APIs and compute.

CUDOS goes a step further as well, and integrates seamlessly with Cudo, a distributed computing platform that can effectively be understood as a layer 3 for blockchains. This allows the use of specialised hardware on-demand, requested directly on-chain from a smart contract.

## Why is CUDOS needed?

Layer 2 networks are a necessity for various blockchains, for different reasons. In ethereum, gas costs are prohibitively high when trying to run complex workloads or store data. In the case of Algorand (which is a Top 50 blockchain) their blockchain is not Turing complete which means it is very limited in its computing capability. CUDOS is working closely with the Algorand team to bring DeFi data feeds and a Layer 2 compute network to the Algorand network to make them a full computing network.

Blockchains are also missing an effective method to fetch and use external data, which is crucial for many applications including DeFi. CUDOS is a necessary step for blockchain technology to progress to its next phase and reach mass-adoption.

## CUDOS compute oracle

CUDOS is a bridge between blockchains and the outside world, to enable the use of external data, APIs and extra compute power that is not limited by the blockchain’s difficulties. This bridge is an absolute necessity for blockchain to reach mass-adoption, as most blockchains are completely disconnected from the outside world, making any interaction impossible.

![CUDOS network diagram](./cudos-diagram.png)

## Why CUDOS?

The CUDOS network is helping blockchain achieve its next adoption level. The underlying Cudo network has been under development since 2017, is live with over 150,000 users signed up in over 145 countries, and around 20,000 nodes running various blockchain and compute workloads on the Cudo network. The OS, front end software, management software, billing engine and all the other available features are all available at [cudominer.com](www.cudominer.com).

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

## Resources

### English

- [Lite Paper](/pdf/en/cudos-white-paper.pdf)
- [White Paper](/pdf/en/cudos-white-paper.pdf)
- [Technical paper](/pdf/en/cudos-technical-paper.pdf)

### French

- [Lite Paper](/pdf/fr/cudos-white-paper-fr.pdf)
- [White Paper](/pdf/fr/cudos-white-paper-fr.pdf)
- [Technical paper](/pdf/fr/cudos-technical-paper-fr.pdf)

### German

- [Lite Paper](/pdf/de/cudos-white-paper-de.pdf)
- [White Paper](/pdf/de/cudos-white-paper-de.pdf)
- [Technical paper](/pdf/de/cudos-technical-paper-de.pdf)

### Japanese

- [Lite Paper](/pdf/jp/cudos-white-paper-jp.pdf)
- [White Paper](/pdf/jp/cudos-white-paper-jp.pdf)
- [Technical paper](/pdf/jp/cudos-technical-paper-jp.pdf)

### Korean

- [Lite Paper](/pdf/ko/cudos-white-paper-jp.pdf)
- [White Paper](/pdf/ko/cudos-white-paper-jp.pdf)
- [Technical paper](/pdf/ko/cudos-technical-paper-jp.pdf)

### Portugese

- [Lite Paper](/pdf/pt/cudos-white-paper-pt.pdf)
- [White Paper](/pdf/pt/cudos-white-paper-pt.pdf)
- [Technical paper](/pdf/pt/cudos-technical-paper-pt.pdf)

### Russian

- [Lite Paper](/pdf/ru/cudos-white-paper-ru.pdf)
- [White Paper](/pdf/ru/cudos-white-paper-ru.pdf)
- [Technical paper](/pdf/ru/cudos-technical-paper-ru.pdf)

### Turkish

- [Lite Paper](/pdf/tr/cudos-white-paper-tr.pdf)
- [White Paper](/pdf/tr/cudos-white-paper-tr.pdf)
- [Technical paper](/pdf/tr/cudos-technical-paper-tr.pdf)

### Vietnamese

- [Lite Paper](/pdf/vn/cudos-white-paper-vn.pdf)
- [White Paper](/pdf/vn/cudos-white-paper-vn.pdf)
- [Technical paper](/pdf/vn/cudos-technical-paper-vn.pdf)

### Chinese (simplified)

- [Lite Paper](/pdf/zh-cn/cudos-white-paper-zh-cn.pdf)
- [White Paper](/pdf/zh-cn/cudos-white-paper-zh-cn.pdf)
- [Technical paper](/pdf/zh-cn/cudos-technical-paper-zh-cn.pdf)
