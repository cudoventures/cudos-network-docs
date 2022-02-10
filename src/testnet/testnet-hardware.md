# Testnet Hardware Requirements

## Cudos Nodes

### Cudos public testnet ("Somniorum") Validator node

* Intel Xeon ('Skylake-SP' or newer) processor ‑or‑ AMD Epyc ('Naples' or newer) processor – Requires SGX ‑or‑ SEV feature – Minimum model ≥8 cores at ≥2.0 GHz required
* ≥32GiB ECC system memory
* ≥1TB NVMe SSD
* Private 1Gb/s internal network for peer node connections
* Linux Debian 10 recommended

### Cudos public testnet ("Somniorum") Sentry node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required
* ≥16GiB ECC system memory
* ≥500GB NVMe SSD
* Private 1Gb/s internal network for peer node connections
* 100Mb/s internet connection (≥1Gb/s preferred)
* Publicly accessible IPv4 address (additionally IPv6 recommended)
* Linux Debian 10 recommended

### Cudos public testnet ("Somniorum") Seed node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required
* ≥16GiB ECC system memory
* ≥500GB NVMe SSD
* Private 1Gb/s internal network for peer node connections
* Linux Debian 10 recommended

## Ethereum Node

### Cudos public testnet ("Somniorum") Ethereum node

- Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor -* Minimum model ≥4 cores at ≥2.0 GHz required
* ≥16GiB ECC system memory
* ≥1TB NVMe SSD
* Private 1Gb/s internal network for peer node connections
* 100Mb/s internet connection or better
* Linux Debian 10 recommended

Note that while we only provide specifications for dedicated physical hardware nodes for each of mainnet and testnet, we do not discourage validator operators who choose to identify virtual equivalents.

At this time, we do not provide detailed storage IOPS/throughput or network PPS/bandwidth minimums. As the testnet evolves, we will share our observations of real-world statistics, to hopefully assist virtualised environment operators with right-sizing their deployments.