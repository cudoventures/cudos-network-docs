# Hardware requirements

The below hardware requirements are based upon extrapolating Cosmos minimums into our observations of an under-continuing-development testnet environment. Our ongoing performance and capacity monitoring may highlight needed changes as development continues, and so the requirements should be considered subject to revision.

Our requirements design does factor in additional room to grow, and considers the additional value-add features that the Cudos network will incorporate over and above a simple Tendermint-based network.

## Cudos Nodes

### Cudos mainnet ("Ingenii") Validator node

* Intel Xeon ('Skylake-SP' or newer) processor ‑or‑ AMD Epyc ('Naples' or newer) processor – Requires SGX ‑or‑ SEV feature – Minimum model ≥8 cores at ≥2.0 GHz required (≥16 cores preferred)
* 32GiB ECC system memory (≥64GB preferred)
* ≥2TB NVMe SSD - RAID1 or better resilience required (RAID 1+0 performance preferred) – High DWPD/TBW endurance drives strongly recommended
* Redundancy of server power and cooling components strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 'Four‑nines' availability target or better
* Linux Debian 10 recommended

### Cudos mainnet ("Ingenii") Sentry node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required (≥8 cores preferred)
* ≥16GiB ECC system memory
* ≥1TB NVMe SSD - RAID1 or better resilience required
* Redundancy of server power and cooling components strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 1Gb/s internet connection (≥2.5Gb/s preferred)
* Publicly accessible IPv4 address (additionally IPv6 recommended)
* Anti-DDoS protection strongly recommended
* 'Four‑nines' availability target or better
* Linux Debian 10 recommended

### Cudos mainnet ("Ingenii") Seed node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required (≥8 cores preferred)
* ≥16GiB ECC system memory
* ≥1TB NVMe SSD - RAID1 or better resilience required
* Redundancy of server power and cooling components strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 'Four‑nines' availability target or better
* Linux Debian 10 recommended

## Ethereum Node

### Cudos mainnet ("Ingenii") Ethereum node

* Intel Xeon ('Haswell' or newer) processor ‑or‑ AMD Opteron/Epyc ('Toronto' or newer) processor – Minimum model ≥4 cores at ≥2.0 GHz required
* ≥16GiB ECC system memory
* ≥2TB NVMe SSD - RAID1 or better resilience required
* Redundancy of server power and cooling components strongly recommended
* Private 1Gb/s or 10Gb/s internal network for peer node connections
* 100Mb/s internet connection or better
* 'Four‑nines' availability target or better
* Linux Debian 10 recommended


Note that while we only provide specifications for dedicated physical hardware nodes for each of mainnet and testnet, we do not discourage validator operators who choose to identify virtual equivalents.

At this time, we do not provide detailed storage IOPS/throughput or network PPS/bandwidth minimums. As the testnet evolves, we will share our observations of real-world statistics, to hopefully assist virtualised environment operators with right-sizing their deployments.