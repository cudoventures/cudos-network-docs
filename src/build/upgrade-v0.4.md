# Public testnet upgrade v0.4

## Validate the environment

1. Clone the repo: https://github.com/CudoVentures/cudos-network-upgrade
```bash
git clone https://github.com/CudoVentures/cudos-network-upgrade.git
```
2. Navigate to ./cudos-network-upgrade/config
3. Make a copy of .env.example and name it ".env"
```bash
cp ./cudos-network-upgrade/config/.env.example ./cudos-network-upgrade/config/.env
```
4. Open the .env and define the 2 variables. <em>**"WORKING_DIR"**</em> must point to the folder that contains <em>"CudosNode"</em>, <em>"CudosBuilders"</em>, <em>"CudosGravityBridge"</em> and <em>"CudosData"</em>. Set <em>**"SHOULD_USE_PREDEFINED_GENESIS"**</em> to "true".
5. Execute the following script based on node-type (full/seed/sentry) from the <em>cudos-network-upgrade</em> directory

**For full-node:**
```bash
sudo ./validate.sh testnet-public full-node client
```

**For seed-node:**
```bash
sudo ./validate.sh testnet-public seed-node client
```

**For sentry-node:**
```bash
sudo ./validate.sh testnet-public sentry-node client
```

6. Let us know of the outcome of the script above. The expected result is "OK: Verification was successful".

## Upgrade the network

More docs about how to upgrade your nodes will follow soon.