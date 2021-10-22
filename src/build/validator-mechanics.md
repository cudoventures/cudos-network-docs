---
title: Validator Mechanics
---

## Slashing

<!-- TODO: complete section explaining how to avoid slashing -->

## Jailing

<!-- TODO: complete section explaining how to avoid jailing and how to resolve a jailed Validator node -->

### Unjailing a Validator

Run the following command:
```
cudos-noded tx slashing unjail --chain-id="$CHAIN_ID" --from="$VALIDATOR_ADDRESS" --keyring-backend "os"
```

See full docs [here](https://hub.cosmos.network/main/validators/validator-setup.html#unjail-validator)
