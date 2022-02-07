---
title: Restarting a Validator and other Operational tasks
---

# Restarting a validator

This section describes how to recover and reconnect your Validator after it disconnects from the network.
The instructions are structured in different case scenarios, ranging from a scheduled DC shutdown event to a daemon crash.
**When following all these cases as part of phase 3, please ensure you keep all logs, as they will be required as proof for completing the task.**

Any recovering of the Validator will likely imply that it was [jailed](/learn/validators.html#slashing), so this section starts with the unjailing command.

### Unjailing a Validator

After a Validator gets jailed, the validator needs to submit an `unjail` transaction in order to validate blocks and earn rewards again.
To `unjail` a Validator, run the following command:

```bash
cudos-noded tx slashing unjail --chain-id="$CHAIN_ID" --from="$VALIDATOR_ADDRESS" --keyring-backend "os"
```

To check whether you Validator is running, you can either head to the [active validator list in the explorer](https://explorer.cudos.org/validators), or run the following command inside the Docker container,

```bash
cudos-noded query tendermint-validator-set
```

The rest of this page aims to describe different events that may cause the Validator to get jailed, and how to recover from them.

## Scheduled DC/system shutdown event

This is the simplest of the scenarios, and one of the most likely to happen in the field.
For whatever reason, the server that is running the Validator needs to be shut down for a maintenance event in the DC.
Depending on the length of the event, the Validator might or might not be jailed.

## Short outage, no jailing

This can be replicated by shutting the validator server down and immediately starting it back up again.
This would be done after an OS upgrade for example, or for a simple hardware change that can happen in a few minutes like a non-hot-swap hard drive failure.

### Test commands

Log in as root and execute the following command to shut down and immediately restart the server

```bash
init 6
```

Once the machine is back up, confirm it is still on the "Active" list in the Cudos explorer.
To collect the logs for the proof for phase 3 task 8, execute the following as root on the validator:

```bash
docker logs cudos-start-full-node-client-testnet-public-01 2> testnet-ph3-8_1_1.txt
```

## Longer outage, validator jailed

This can be replicated by shutting the validator down and waiting until the validator is shown as jailed in the [Cudos Explorer](https://explorer.cudos.org/) before bringing it back up again.
This would be the situation for a longer DC maintenance event, or a more serious issue with the server hardware.
It would also likely be the result of moving the Validator to new hardware, where the cudos-noded data is cloned to a new machine after shutdown and then brought back up on the new platform.
The outage length would correspond to the time taken to clone the data to a new machine.
This process can take up to an hour or even more, so would definitely result in the Validator being jailed.

### Test commands

Log in as root and execute the following command to shut down the server,

```bash
init 0
```

Watch the Explorer page for that Validator, and wait until it gets jailed.
This could take around 33 hours.
When the Explorer page indicates that the validator has been jailed, start the server back up again.
Once the machine is back up, confirm it is still on the "Inactive" list
To unjail the Validator, first enter into the container with the following command,

```bash
docker exec -it cudos-start-full-node-client-testnet-public-01 bash
```

Once inside the container, issue the `unjail` command as follows, replacing the `VALIDATOR_ADDRESS` with the one for your Validator (which can be found on the explorer page for the node),

```bash
export CHAIN_ID="cudos-testnet-public-2"
export VALIDATOR_ADDRESS="cudos1jxyabcdefrghhdksklashhrfirhysirl4a"

cudos-noded tx slashing unjail --chain-id="$CHAIN_ID" --from="$VALIDATOR_ADDRESS" --keyring-backend "os"
```

Exit back to the host shell by typing `exit`.
Then, collect the logs by executing the following command as root on the Validator,

```bash
docker logs cudos-start-full-node-client-testnet-public-01 2> testnet-ph3-8_1_2.txt
```

Last, check that the Validator is in the active list of the Explorer.

## Longer outage, with seed and sentry also down

If the validator has been set up according to [our recommendations](/build/validator.html#validator-setup), it will have a seed, a sentry and an Ethereum node attached.
On the basis that they will also all get shut down in a lot of situations, the shutdown test is to be repeated, but with the other 3 servers also shut down for the longer outage period.

### Test commands

Log in as root to all of the Validator, seed, sentry and Ethereum nodes and execute the following command to shut down each server

```bash
init 0
```

Watch the Explorer page for that validator, and wait until it gets jailed.
This could take around 33 hours.
When the Explorer page indicates that the validator has been jailed, start all of the servers back up again.
Once the validator is back up, confirm it is still on the [Inactive list](https://explorer.cudos.org/validators/inactive).

Now. issue the `unjail` command by logging into the validator as root, entering the container using the command:

```bash
docker exec -it cudos-start-full-node-client-testnet-public-01 bash
```

Once inside the container, issue the unjail command as follows, setting `VALIDATOR_ADDRESS` with the address of your Validator,

```bash
export CHAIN_ID="cudos-testnet-public-2"
export VALIDATOR_ADDRESS="cudos1jxyabcdefrghhdksklashhrfirhysirl4a"

cudos-noded tx slashing unjail --chain-id="$CHAIN_ID" --from="$VALIDATOR_ADDRESS" --keyring-backend "os"
```

Now go to the [Cudos Explorer](https://explorer.cudos.org/validators) and confirm that the validator is still running and active.
After that, exit back to the host shell by typing `exit`, and collect all the logs as follows:

```bash
docker logs cudos-start-full-node-client-testnet-public-01 2> testnet-ph3-8_1_3-validator.txt
```

Harvest this file and add it to the evidence.
Now repeat this action for the others.

Log in as root on the seed node and execute

```bash
docker logs cudos-start-seed-node-client-testnet-public-01 2> testnet-ph3-8_1_3-seed.txt
```

Harvest this file and add it to the evidence.

Log in as root on the sentry node and execute

```bash
docker logs cudos-start-sentry-node-client-testnet-public-01 2> testnet-ph3-8_1_3-sentry.txt
```

Harvest this file and add it to the evidence.

Last, log in as root on the Ethereum node and execute

```bash
docker logs cudos-start-sentry-node-client-testnet-public-01 2> testnet-ph3-8_1_3-ethereum.txt
```

Harvest this file and add it to the evidence.

## Network outage

This scenario reproduces any instances where the internet connection is lost in the machine, which makes it disconnect from the network.

### Test with stand-alone server

This can be replicated by cutting a working validator off from any external networking, incoming and outgoing.
There are a number of situations that would result in the validator being isolated in this way:

- NIC failure on the validator server.
- Failure of the switch to which the validator is connected.
- Failure of a switch or router between the validator and the rest of its resources.
- ISP failure, although this may well allow the validator's seed/sentry nodes to still be seen.

There are a number of ways of cutting a validator off like this.
It is proposed that a VM running the validator software, to which the tester has direct console access (not GCP) is issued commands that disable the external network interface(s).
The console access would be used to monitor the logs to gauge the effect that the network outage is having.

The logs would be the evidence for this test.

### Test commands

Select a Validator with

- Console access independent of the network.
- Network port(s) that can easily be disabled.

For example, a Linux/KVM virtual machine, or physical server with console connected.
Disable the network connection, noting the time.
Then, using the console logged in as root, monitor the logs with the following command:

```bash
docker logs -f cudos-start-full-node-client-testnet-public-01
```

In parallel, monitor the explorer Validator's page to determine when the Validator gets jailed.
Once the Validator has been jailed, which should take around half an hour, re-enable the network port(s) and note the time.

Continue monitoring the log output until it settles back to normal.
Note the time.

Unjail the Validator using the procedure explained in the [unjailing section](/build/validator-restart.html#unjailing-a-validator).
Note the time.

Check the explorer page to confirm that the Validator is back online and active.
Collect logs from the Validator using the following command to be run as root from the host command line.

```bash
docker logs cudos-start-full-node-client-testnet-public-01 2> testnet-ph3-8_2_1.txt
```

Harvest this file and add it to the evidence.

### Test alongside seed, sentry and Ethereum nodes

This is the same as the previous case, except that the attached seed, sentry and Ethereum nodes are also shut down.
The consequence is that it doesn't have a working, fully synced seed/sentry node to call on, and the Ethereum node will be catching up as well.
Does this have any deleterious effect on the validator's recovery.

## Validator host server crash

Modern computing hardware is pretty reliable, but machines do still just fall over from time to time.
This scenario aims to test the validator's resilience to such events.

NB The test for this scenario must not allow filesystem corruption due to un-flushed disk caches as that would be handled in the field by a data restore, which is a different scenario.
Conversely, this is also not the same as a controlled shutdown.

The proposal to replicate this scenario is to run something like:

```bash
# sync
# sync
# poweroff -f -f
```

See following for the definition of the double `-f`

```bash
-f, --force
           Force immediate halt, power-off, or reboot. When specified once, this
           results in an immediate but clean shutdown by the system manager.
           When specified twice, this results in an immediate shutdown without
           contacting the system manager. See the description of --force in
           systemctl(1) for more details.
```

The command "sync" forces a flush to hardware from the disk caches.
The second one is "belt and braces" to make sure that nothing has been left in the cache if the disk is really busy and took a while to flush what was there first time round, to the disks.
It is arguably redundant on modern Linux systems, but if nothing else, it's traditional.

NB It is advised that the machine is rebooted as soon as possible after the poweroff in order to avoid jailing.

The results will be the log of the cudos-noded post-crash-startup and the presence of the Validator in the "Active" tab of the "Validators" page of the Cudos Explorer.

NB This test is purely about the Validator host server crashing; the sentry, seed and Ethereum nodes are not involved as it is assumed that they will keep going, and could potentially assist in the recovery of the Validator.

### Test commands

This test can be carried out on any standard Docker installed cudos-noded setup.
To get started, log into the host server as root, and then execute the following command

```bash
sync ; sync; poweroff -f -f
```

As there is no need to get the Validator jailed for this scenario, immediately boot the machine back up again.
Check the explorer page to confirm that the Validator is back online and active.
Collect logs from the Validator using the following command to be run as root from the host command line.

```
docker logs cudos-start-full-node-client-testnet-public-01 2> testnet-ph3-8_3.txt
```

Harvest this file and add it to the evidence.

## Validator daemon crash

There are a number of reasons why the cudos-noded daemon would terminate in an uncontrolled manner, including:

- A software fault in the cudos-noded code, that causes a SEGFAULT or similar, or results in an an uncaught exception that terminates the process.
- The machine on which the validator is running is critically short of memory and the "OOM Killer" reaps the cudos-noded process to save memory.
- An unguarded moment on the part of the system operator.

This is distinct from the [server crash](/build/validator-restart.html#validator-host-server-crash) test in that the rest of the system is still up and running, albeit maybe in a degraded state. The evidence required is much the same though.

NB As this test is purely about the validator daemon software crashing, the sentry, seed and ETH nodes are not involved as it is assumed that they will keep going, and could potentially assist in the recovery of the validator.

### Test commands

This test can be carried out on any standard Docker installed cudos-noded setup.

- Log into the host server as root
- Kill the cudos-noded process by finding the PID of the cudos-noded process (in the example this is **2249**), then issuing a "kill -9" to terminate the process without letting it clean up after itself. This is the most violent end for a process.

NB Killing this process also terminates the Docker container. This is confirmed by the fact a second ps to determine the process ID of the cudos-noded shows that process ID has changed. In the example, it is now **3156**

```bash
[root@svcteam-validator ~]# ps -ef | fgrep cudos-no
root        **2249**    2228  3 13:17 ?        00:07:24 cudos-noded start
root        3001    2846  0 17:07 pts/1    00:00:00 grep -F --color=auto cudos-no

[root@svcteam-validator ~]# kill -9 **2249**

[root@svcteam-validator ~]# ps -ef | fgrep cudos-no
root        **3156**    3136 47 17:08 ?        00:00:04 cudos-noded start
root        3225    2846  0 17:08 pts/1    00:00:00 grep -F --color=auto cudos-no
```

- Harvest the logs from the point the cudos-noded process restarted and attach as evidence.

## Validator "travels back in time"

This test to be performed last as it could signify the end of the road for this instance, if not a more lengthy recovery process.
The scenario is perfectly feasible though.
It runs as follows:

- A machine killing event happens and the server needs to be restored from backup.
- The backup is from at least a few hours before the machine was last seen on the blockchain, so the blockchain has subsequently moved on and the validator has taken part in the business of advancing the blockchain since the backup.
- The machine (or a new one) is restored from tape, but restored to that previous state.
- The validator is started back up.

The evidence will be the logs and the existence of the validator on the Explorer list as above, although it will almost inevitably be jailed by this point.

NB This test will not involve the seed, sentry and Ethereum nodes as the scenario is specific to problems with the validator server.
It is assumed that as the seed and sentry are functional subsets of the Validator, if it can survive this event, so will the seed and sentry.
The Ethereum node will certainly survive as its job is just to keep up with the Ethereum network, so it can even be completely rebuilt from scratch and would then just need to catch up.

### Test commands

This test to be performed last as it could signify the end of the road for this instance, if not a more lengthy recovery process.

- Log into the Validator host as root.
- Stop the cudos-noded container.

```bash
docker stop cudos-start-full-node-client-testnet-public-01
```

- Using the "docker cp" command, take a copy of the cudos-data directory

```bash
docker cp cudos-start-full-node-client-testnet-public-01:/usr/cudos/cudos-data .
```

- Take a copy of the cudos-data folder. This contains all of the state and data for the node.
This will currently occupy around 6GB but will of course grow over time.

```bash
docker start cudos-start-full-node-client-testnet-public-01
```

- Let the node run for a few hours to build up some difference between the backup and the current state.
- Wait a few hours
- Stop the container again as above

```bash
docker stop cudos-start-full-node-client-testnet-public-01
```

- Make a second copy of the cudos-data directory
(This hopefully won't get used, but if the test fails, this is the way back)

```bash
mkdir new-data
cd new-data
docker cp cudos-start-full-node-client-testnet-public-01:/usr/cudos/cudos-data .
```

- Remove the current cudos-noded directory

To do so, run the command below, which has two commands combined.
The first removes what it can of the cudos-noded data and is immediately followed by a container stop.
The problem being that when the daemon stops, so does the container, so you can't get inside it.

```bash
docker exec -it cudos-start-full-node-client-testnet-public-01 rm -rf /usr/cudos/cudos-data ; docker stop cudos-start-full-node-client-testnet-public-01
```

- Copy the original data back in again
Please note that this must be done in the same directory that you backed it off to originally.

```bash
docker cp cudos-data cudos-start-full-node-client-testnet-public-01:/usr/cudos/
```

- Start the node back up again.

```bash
docker stop cudos-start-full-node-client-testnet-public-01
```

- Observe the logs until a conclusion has been reached. Either
    - The node is now resynced and operating normally (Pass)
    - The node has a problem and is not going to restart (Fail)
- Harvest the logs from the point that the node restarted to the point where the outcome became clear.
- Attach the logfile as evidence.

## How to delete a current running node

If you stop the docker container that is running a Full node then you are not able to use it. But if you want to remove the full node docker data then you need to clear the volume of full node docker, if you remove the folder it will remove all the data but make sure first that you stop the docker container.

Clear the volume of full node docker:
* Navigate and open the file **CudosBuilders/docker/full-node/full-node.client.testnet.public01.arg**
* Find the var **VOLUME_NAME=cudos-data-full-node-client-testnet-public-01** and clear it
* Navigate to the file **CudosBuilders/docker/full-node/start-full-node.yml**
* Find the one volume field
volumes: **- '../../../CudosData/$VOLUME_NAME:$CUDOS_HOME'**
* Above **VOLUME_NAME**  is mapped with this **../../../CudosData/$VOLUME_NAME**, clear it

Remove the folder:
Navigate to the folder **CudosData**, you may find a folder known as **cudos-data-full-node-client-testnet-public-01**, this is the folder which store all data of full node and needs to be removed.