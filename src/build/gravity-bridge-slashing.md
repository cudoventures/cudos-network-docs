---
title: Gravity Bridge Slashing Polivy
---

# Gravity Bridge Slashing Policy

* [Brief](/build/gravity-bridge-slashing.html#brief)
* [Slashing Parameters for the Network](/build/gravity-bridge-slashing.html#slashing-parameters-for-the-network)
* [Infraction Timelines](/build/gravity-bridge-slashing.html#infriction-timelines)
* [Liveness Tracking](/build/gravity-bridge-slashing.html#liveness-tracking)

## Brief

The slashing policy is described in the resources below. In short the slashing is defined by the validator (*the node which actually signs each block*) not by the orchestrator (*the helper binary which is running along side the validator's node*).

Not having enough funds in a validator's orchestrator account results in the orchestrator not running.

If orchestrator is not running:

1. The validator does not have a chance for a reward.
2. The validator will not receive any information about what has to be signed so he will not sign anything.

If a validator does not sign an operation (*valset update, batch confirm, logical call confirm*) in a fixed period of time (*defined in **genesis.json** with default value 10000 blocks*) then he is slashed. This may happen, because of the following conditions:

1. Does not have a running orchestrator ⇒ the validator will not be aware of what he has to sign.
2. Is running an old/wrong binary and is/is not signing wrong operations.

There is a little catch especially about batches. Once a batch is submitted to the Ethereum (*has been signed by less than 2/3 of the voting power*) then it is deleted from the database. Once the batch is deleted, there is no way to check whether a validator hasn't signed it. In short - if a validator couldn't sign a batch for some reason and if this batch had been submitted to the Ethereum then the validator who hasn't signed it, will not be slashed.

## Slashing Parameters for the Network

Parameter defining the size (*number of blocks*) of the sliding window used to track validator liveness:
```
slashing.params: {
"signed_blocks_window": "400",
```

Parameter defining the time that validator is jailed for not passing the ckeck for liveness:
```
"min_signed_per_window": "0.1",
"downtime_jail_duration": "600s",
```

Fraction to multiply to sum of validator holdings to be taken when bad signing on valset:
```
"slash_fraction_double_sign": "0.050000000000000000",
"slash_fraction_downtime": "0.010000000000000000"
},
"slash_fraction_valset": "0.001000000000000000",
```

Fraction to multiply to sum of validator holdings to be taken when bad signing on batch:
```
"slash_fraction_batch": "0.001000000000000000",
```

Fraction to multiply to sum of validator holdings to be taken when bad signing on logic call:
```
"slash_fraction_logic_call": "0.001000000000000000",
```

(blocks) The time needed to the node that was validator to run after declaring that he is no longer a validator:
```
"unbond_slashing_valsets_window": "10000",
```

The fraction percent that will be taken from validator:
```
"slash_fraction_bad_eth_signature": "0.001000000000000000",
```

At any given time, there are any number of validators registered in the state machine. In each block, the top **MaxValidators** (*defined by x/staking*) who are not jailed become bonded, meaning that they may propose and vote on blocks. Validators who are bonded are at stake, meaning that part or all of their stake and their delegators' stake is at risk if they commit a protocol fault.

## Infraction Timelines

To illustrate how the **x/slashing** module handles submitted evidence through Tendermint consensus, consider the following examples:

### Definitions:

**[:** timeline start <br/>
**]**: timeline end <br/>
**Cn**: infraction n committed <br/>
**Dn**: infraction n discovered <br/>
**Vb**: validator bonded <br/>
**Vu**: validator unbonded <br/>

### Single Double Sign Infraction:

<-----------------> [-------------C1--------D1,Vu-----] <br/>

### Multiple Double Sign Infractions:

<---------------------------> [----------C1---C2---C3---D1,D2,D3Vu-----] <br/>

Multiple infractions are committed and then later discovered, at which point the validator is jailed and slashed for only one infraction. Because the validator is also tombstoned, they can not rejoin the validator set.

Slashing will occur when a validator has joined the network, but doesn't have Gravity bridge components. In this case after 16 hours the validator will be slashed and removed from the set of validators.

## Liveness Tracking

At the beginning of each block, we update the **ValidatorSigningInfo** for each validator and check if they've crossed below the liveness threshold over a sliding window. This sliding window is defined by **SignedBlocksWindow** and the index in this window is determined by **IndexOffset** found in the validator's **ValidatorSigningInfo**. For each block processed, the **IndexOffset** is incremented regardless if the validator signed or not. Once the index is determined, the **MissedBlocksBitArray** and **MissedBlocksCounter** are updated accordingly.

Finally, in order to determine if a validator crosses below the liveness threshold, we fetch the maximum number of blocks missed, **maxMissed**, which is **SignedBlocksWindow** - (*MinSignedPerWindow * SignedBlocksWindow*) and the minimum height at which we can determine liveness, **minHeight**. If the current block is greater than **minHeight** and the validator's **MissedBlocksCounter** is greater than **maxMissed**, they will be slashed by **SlashFractionDowntime**, will be jailed for **DowntimeJailDuration**, and have the following values reset: **MissedBlocksBitArray, MissedBlocksCounter,** and **IndexOffset**.

In the current implementation of the slashing module, when the consensus engine informs the state machine of a validator's consensus fault, the validator is partially slashed, and put into a **"jail period"**, a period of time in which they are not allowed to rejoin the validator set. However, because of the nature of consensus faults and ABCI, there can be a delay between an infraction occurring, and evidence of the infraction reaching the state machine (this is one of the primary reasons for the existence of the unbonding period).

The maximum number of slashing periods is the **len(UnbondingPeriod) / len(JailPeriod)**.

The current defaults in Cosmos Network for the **UnbondingPeriod** and **JailPeriod** are 3 weeks and 2 days, respectively.
