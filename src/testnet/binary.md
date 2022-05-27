# Build the binary

Clone the correct branches from the [CudosNode](https://github.com/CudoVentures/cudos-node) , [CudosBuilders](https://github.com/CudoVentures/cudos-builders), and [CudosGravityBridge](https://github.com/CudoVentures/cosmos-gravity-bridge) repositories, renaming the folders *CudosNode*, *CudosBuilders*, and *CudosGravityBridge*:

```
git clone --branch v0.9.0 https://github.com/CudoVentures/cudos-node.git CudosNode
git clone --branch v0.9.0  https://github.com/CudoVentures/cudos-builders.git CudosBuilders
git clone --branch v0.9.0 https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge
```

Navigate to the `CudosBuilders/docker/binary-builder` directory
```
cd CudosBuilders/docker/binary-builder 
```

Build the docker image of the binary by running the command:
```
docker-compose --env-file binary-builder.arg -f binary-builder.yml -p cudos-binary-builder up --build --detach
```
