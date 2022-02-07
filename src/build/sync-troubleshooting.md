# Sync Troubleshooting

## Checking sync status

To check the status of your sync, go into the docker container 

```
sudo docker exec -it cudos-start-full-node-client-testnet-public-01 bash
```
and do:
```
cudos-noded status
```

::: tip
To see the output in readable JSON format, do:
```
cudos-noded status 2>&1 | jq -M .
```
(You will need to install JQ in your container to do this.)
:::

If your node is syncing, `latest_block_height`  and `latest_block_time` should be incrementing, and `catching_up` should be `true`.

If `"latest_block_height": "0"`, your node is not syncing. Try to add another seed (refer to Manually adding new seeds)


`cudos-noded` may be unresponsive during the sync process. If it is, view the current docker log:

```
sudo docker logs cudos-start-full-node-client-testnet-public-01 >filename.txt
```

Near the bottom of your file you will see the last block `height`. Compare this to the last block height on the [explorer](https://explorer.cudos.org/)


Once the sync is completed, you can verify your node’s status by entering the docker container and doing:

```
cudos-noded status 2>&1 | jq -M .
```

If you can see `"latest_block_time"` is a few seconds before current time, and `"catching_up":false"`,  your node has synced.

::: tip 
Once your node is synced, a quick way to to see activity in real-time without having to go into the docker container is to view the docker log with the -f (follow) flag:
```
sudo docker logs -f cudos-start-full-node-client-testnet-public-01 
```
:::



## Manually adding new seeds

If your node is not syncing, you may need to add another seed. 
 
Firstly, contact support to get an alternative seed ID and IP address.
 
Then, add the seed’s ID and IP address to your node. To do this:
- Enter your docker container:
```
docker exec -it cudos-start-full-node-client-testnet-public-01 bash
```

- Then locate the `seeds =` variable in this file: `/usr/cudos/cudos-data/config/config.toml` , and append the details you have been given.
 
- Finally, exit and restart your container:
 
``` 
docker stop cudos-start-full-node-client-testnet-public-01
docker start cudos-start-full-node-client-testnet-public-01