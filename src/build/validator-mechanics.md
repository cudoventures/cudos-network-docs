---
title: Validator Mechanics
---

After a validator is created with a `create-validator` transaction, they can be in three states:

- `in validator set`: Validator is in the active set and participates in consensus. Validator is earning rewards and can be slashed for misbehaviour.
- `jailed`: Validator misbehaved and is in jail, i.e. outside of the validator set. If the jailing is due to being offline for too long, the validator can send an `unjail` transaction in order to re-enter the validator set. If the jailing is due to double signing, the validator cannot unjail.
- `unbonded`: Validator is not in the active set, and therefore not signing blocs. Validator cannot be slashed, and does not earn any reward. It is still possible to delegate Atoms to this validator. Un-delegating from an unbonded validator is immediate.

## Slashing

Slashing incentivises network participants to act in the interests of the Cudos Network rather than their own self interest and is the main game theoretic mechanism to secure a proof of stake system. If a Validator misbehaves, their delegated stake will be partially slashed.

There are currently two faults that can result in slashing of funds for a Validator and their respective Delegators:

- Double signing: If someone reports on chain A that a validator signed two blocks at the same height on chain A and chain B, and if chain A and chain B share a common ancestor, then this validator will get slashed by 5% on chain A.
- Downtime: If a validator misses more than 95% of the last 10.000 blocks, they will get slashed by 0.01%.

### Unjailing a Validator

To `unjail` a Validator you must send a transaction to the network from the Validator address itself to show that you are back online

Run the following command:
```
cudos-noded tx slashing unjail --chain-id="$CHAIN_ID" --from="$VALIDATOR_ADDRESS" --keyring-backend "os"
```

See full docs [here](https://hub.cosmos.network/main/validators/validator-setup.html#unjail-validator)
