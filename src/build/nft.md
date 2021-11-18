---
title: NFTs
---

# Cudos Network NFTs

NFTs are compatible with Cudos Network natively.

## Module Overview

A module for operating with Non-Fungible Tokens on the CUDOS network. The methods that are exposed by it are mainly based on the [ERC721 interface](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) from the Ethereum network and not so much on the [CW-721](https://github.com/CosmWasm/cw-nfts) from the Cosmos network. The reason for this is that the main idea of the module is to transfer tokens through the [bridge](https://github.com/CudoVentures/cosmos-gravity-bridge) between the Cudos Network and Ethereum, and thus it is better to follow the ERC721 standard.

## Module Interface
The module gives the user the ability to either write (via transaction) or read (via query) to/from the network.

### The following commands are available (click on them for further info)

#### Transaction
| Command                                               | Description                                                                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`issue`](#issue)                           | Issues a new [`denomination`](#Denom) to the specified owner                                                   |
| [`mint`](#mint)                             | Mints a new [`NFT`](#NFT) in a given denomination to the specified owner                                                                       |
| [`edit`](#edit)             | Edits an already existing [`NFT`](#NFT)  |
| [`transfer`](#transfer)                        | Transfers an existing NFT from one owner to another                                                                                                   |
| [`burn`](#burn)                  | Burns the specified [`NFT`](#NFT) . Only the owner can burn the NFT                                                                                        |
| [`approve`](#approve)                        |  Adds an approved operator that can transfer the [`NFT`](#NFT)                                                                                                |
| [`revoke`](#revoke)                 | Removes an approved operated for the [`NFT`](#NFT)
| [`approveAll`](#approveall)                 | Approves an operator on user level - the operator can transfer all of the user tokens

#### Query

| Command                                               | Description                                                                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| [`denom`](#denom)                           | Queries for a [`denomination`](#Denom) by denomination Id                                                  |
| [`denom-by-name`](#denom-by-name)                             | Queries for a  [`denomination`](#Denom) by denomination name                                                                  |
| [`denoms`](#denoms)             | Query for all denominations of all collections of NFTs  |
| [`collection`](#collection)                        | Get all the NFTs from a given [`collection`](#Collections).                                                                                                 |
| [`supply`](#supply)                  | Returns the total supply of a collection or owner of NFTs.                                                                                       |
| [`owner`](#owner)                        |  Queries for the [`owner`](#Owners) and returns the NFTs owned by an account address.                                                                                               |
| [`token`](#token)                 | Query a single [`NFT`](#NFT) from a [`collection`](#Collections).
| [`approvals`](#approvals)                 | Get the approved addresses for the [`NFT`](#NFT)
| [`isApprovedForAll`](#isapprovedforall)                 | Gets whether the address is approved for all

## Full commands info:

### Transaction commands

### `issue`

> Issues a new denom that will be used for minting new NFTs. Only the denom creator can issue new NFTs.

- arguments:
  - `denom-id` `string` `Unique Id that identifies the denom. Must be all lowercase` `required: true`
- flags:
  - `--name` `string` `The unique name of the denom.` `required: true`
  - `--from` `string` `The address that is issuing the denom. Will be set as denom creator. Can be either an address or alias to that address` `required: true`
  - `--schema` `string` `Metadata about the NFT. Schema-content or path to schema.json.` `required: false`
  - `--chain-id` `string` `The name of the network.` `required`
  - `--fees` `string` `The specified fee for the operation` `required: false`

**Example:**

``` bash
$ cudos-noded tx nft issue <denom-id> --from=<key-name> --name=<denom-name> --schema=<schema-content or path to schema.json> --chain-id=<chain-id> --fees=<fee>
```

### `mint`

> Mint a NFT and set the owner to the recipient. Only the denom creator can mint a new NFT.

- arguments:
    - `denom-id` `string` `The denomId that this NFT will be associated` `required: true`
- flags:
    - `--from` `string` `The address that is minting the NFT. Must be denom creator. Can be either an address or alias to that address` `required: true`
    - `--recipient` `string` `The user(owner) that will receive the NFT` `required: true`
    - `--uri` `string` `The URI of the NFT.` `required: false`
    - `--chain-id` `string` `The name of the network.` `required: true`
    - `--fees` `string` ` The specified fee for the operation` `required: false`

**Example:**

``` bash
$ cudos-noded tx nft mint <denom-id> --recipient=<recipient> --from=<key-name> --uri=<uri> --chain-id=<chain-id> --fees=<fee>

```

### `edit`

> Edit an NFT - can change name, uri or data. Only the owner can edit the NFT.

- arguments:
  - `denom-id` `string` `The denomId of the edited NFT` `required: true`
  - `token-id` `string` `Unique Id that identifies the token. Must be all lowercase` `required: true`
- flags:
  - `--from` `string` `The address that is editing the NFT. Can be either an address or alias to that address` `required: true`
  - `--uri` `string` `The URI of the NFT.` `required: false`
  - `--chain-id` `string` `The name of the network.` `required: true`
  - `--fees` `string` `The specified fee for the operation` `required: false`

**Example:**

``` bash
$ cudos-noded tx nft edit <denom-id> <token-id>  --from=<key-name> --uri=<uri> --chain-id=<chain-id> --fees=<fee>
```

### `burn`

> Burns the NFT - deletes it permanently.

- arguments:
  - `denom-id` `string` `The denomId of the edited NFT` `required: true`
  - `token-id` `string` `Unique Id that identifies the token. Must be all lowercase` `required: true`
- flags:
  - `--from` `string` `The address that is editing the NFT. Can be either an address or alias to that address` `required: true`
  - `--chain-id` `string` `The name of the network.` `required: true`
  - `--fees` `string` `The specified fee for the operation` `required: false`

**Example:**

``` bash
$ cudos-noded tx nft burn <denom-id> <token-id> --from=<key-name> --chain-id=<chain-id> --fees=<fee>
```

### `transfer`

> Transfer an NFT - from one owner to a new owner. The sender must be either the owner, an approved address for that NFT or a globally approved operator.

- arguments:
  - `from` `string` `The address of the NFT owner` `required: true`
  - `to` `string` `The address of the user that will receive the NFT` `required: true`
  - `denom-id` `string` `The denomId of the edited NFT` `required: true`
  - `token-id` `string` `Unique Id that identifies the token. Must be all lowercase` `required: true`
- flags:
  - `--from` `string` `The address that is requesting the transfer of the NFT. Can be either an address or alias to that address. must be either the owner, approved address on NFT or globally approved operator.` `required: true`
  - `--uri` `string` `The URI of the NFT.` `required: false`
  - `--chain-id` `string` `The name of the network.` `required: true`
  - `--fees` `string` `The specified fee for the operation` `required: false`

**Example:**

``` bash
$ cudos-noded tx nft transfer <from> <to> <denom-id> <token-id>  --from=<key-name> --uri=<uri> --chain-id=<chain-id> --fees=<fee>
```

### `approve`

> Adds an address to the approved list. Approved addresses on the NFT level can transfer the NFT from one owner to another. Approved addresses for the NFT are cleared upon transfer.

- arguments:
  - `approvedAddress` `string` `The address that will be approved` `required: true`
  - `denom-id` `string` `The denomId of the edited NFT` `required: true`
  - `token-id` `string` `Unique Id that identifies the token. Must be all lowercase` `required: true`
- flags:
  - `--from` `string` `The address that is requesting the approval. Can be either an address or alias to that address. must be either the owner  or globally approved operator.` `required: true`
  - `--chain-id` `string` `The name of the network.` `required: true`
  - `--fees` `string` `The specified fee for the operation` `required: false`

**Example:**

``` bash
$ cudos-noded tx nft approve <approvedAddress> <denom-id> <token-id> --from=<key-name> --chain-id=<chain-id> --fees=<fee>
```

### `revoke`

> Removes the address from the approved list. Approved addresses on the NFT level can transfer the NFT from one owner to another. Approved addresses for the NFT are cleared upon transfer.

- arguments:
  - `addressToRevoke` `string` `The address that will be removed` `required: true`
  - `denom-id` `string` `The denomId of the edited NFT` `required: true`
  - `token-id` `string` `Unique Id that identifies the token. Must be all lowercase` `required: true`
- flags:
  - `--from` `string` `The address that is requesting the removal of approval. Can be either an address or alias to that address. Must be either the owner  or globally approved operator.` `required: true`
  - `--chain-id` `string` `The name of the network.` `required: true`
  - `--fees` `string` `Тhe specified fee for the operation` `required: false`

**Example:**

``` bash
$ cudos-noded tx nft revoke <addressToRevoke> <denom-id> <token-id>--uri=<uri> --from=<key-name> --chain-id=<chain-id> --fees=<fee>
```

### `approveAll`

> Adds the address to the approved operator list for the user. Approved addresses on the user level can transfer the NFT from one owner to another. The address is automatically added to the msg.sender(--from) approved list.

- arguments:
  - `operator` `string` `The address that will be approved` `required: true`
  - `approved` `string` `Boolean value indicating if the addres is approved: can be true or false` `required: true`
- flags:
  - `--from` `string` `The address that is requesting the approval. The approved address will be able to handle the transfers of --from assets. Can be either an address or alias to that address. must be either the owner  or globally approved operator.` `required: true`
  - `--chain-id` `string` `The name of the network.` `required: true`
  - `--fees` `string` `The specified fee for the operation` `required: false`

**Example:**

``` bash
$ cudos-noded tx nft approveAll <operator> <true/false> --from=<key-name> --chain-id=<chain-id> --fees=<fee>
```

### Query commands

### `denom`

> Query the denom by the specified denom id.

- arguments:
  - `denom-id` `string` `The denomId to search for` `required: true`
- flags:
  - none

**Example:**

``` bash
$ cudos-noded query nft denom <denomId>
```

### `denom-by-name`

> Query the denom by the specified denom name.

- arguments:
  - `denom-name` `string` `The denom name to search for` `required: true`
- flags:
  - none

**Example:**

``` bash
$ cudos-noded query nft denom <denomName>
```

### `denoms`

> Query all denominations of all collections of NFTs.

- arguments:
  - none
- flags:
  - none

**Example:**

``` bash
$ cudos-noded query nft denoms
```

### `collection`

> Query all denominations of all collections of NFTs.

- arguments:
  - `denom-id`: `The id of the denomination collection.` `required:true`
- flags:
  - none

**Example:**

``` bash
$ cudos-noded query nft collection <denom-id>
```

### `supply`

> Gets the total supply of a collection or owner of NFTs.

- arguments:
  - `denom-id`: `The id of the denomination collection.` `required:true`
- flags:
  - none

**Example:**

``` bash
$ cudos-noded query nft supply <denom-id>
```

### `owner`

> Get the NFTs owned by an account address.

- arguments:
  - `address`: `The address of the owner.` `required:true`
- flags:
  - `--denom-id`: `The id of the denom` `required:true`

**Example:**
``` bash
$ cudos-noded query nft owner <address> --denom-id=<denom-id>
```

### `token`

> Query a single NFT from a collection.

- arguments:
  - `denom-id`: `The id of the denom collection` `required:true`
  - `token-id`: `The id of the NFT` `required:true`
- flags:
  - none

**Example:**

``` bash
$ cudos-noded query nft token <denom-id> <token-id>
```

### `approvals`

> Get the approved addresses for the NFT.

- arguments:
  - `denom-id`: `The id of the denom collection` `required:true`
  - `token-id`: `The id of the NFT` `required:true`
- flags:
  - none

**Example:**

``` bash
$ cudos-noded query nft approvals <denomId> <tokenId>
```


### `isApprovedForAll`

> Query if an address is an authorised operator for another address.

- arguments:
  - `owner`: `The owner addresses to search` `required:true`
  - `operator`: `The operator address to be searched for` `required:true`
- flags:
  - none

**Example:**

``` bash
$ cudos-noded query nft approvals <owner> <operator>
```

## Object types:

### NFT
```go
// NFT non fungible token interface
type NFT interface {
    GetID() string              // unique identifier of the NFT
    GetName() string            // return the name of BaseNFT
    GetOwner() sdk.AccAddress   // gets owner account of the NFT
    GetURI() string             // tokenData field: URI to retrieve the of chain tokenData of the NFT
    GetData() string            // return the Data of BaseNFT
    GetApprovedAddresses() map[string]bool// returns the approved addresses of BaseNFT

}
```

### NFT implementation
```go
type BaseNFT struct {
	Id                string          `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name              string          `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	URI               string          `protobuf:"bytes,3,opt,name=uri,proto3" json:"uri,omitempty"`
	Data              string          `protobuf:"bytes,4,opt,name=data,proto3" json:"data,omitempty"`
	Owner             string          `protobuf:"bytes,5,opt,name=owner,proto3" json:"owner,omitempty"`
	ApprovedAddresses map[string]bool `protobuf:"bytes,6,rep,name=approvedAddresses,proto3" json:"approvedAddresses,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"varint,2,opt,name=value,proto3"`
}
```

## Collections

>As all NFTs belong to a specific `Collection` under `{denomID}/{tokenID}`

```go
// Collection of non fungible tokens
type Collection struct {
    Denom Denom     `json:"denom"`  // Denom of the collection; not exported to clients
    NFTs  []BaseNFT `json:"nfts"`   // NFTs that belongs to a collection
}
```

## Owners

>Owner holds the address of the user and their collection of NFTs.

```go
// Owner of non fungible tokens
type Owner struct {
    Address       string            `json:"address"`
    IDCollections []IDCollection    `json:"id_collections"`
}
```

## IDCollection
>IDCollection holds the denomId and the Ids of the NFTs (instead of the full object).

```go
// IDCollection of non fungible tokens
type IDCollection struct {
    DenomId string   `json:"denom_id"`
    TokenIds []string `json:"token_ids"`
}

```

## Denom
> The denomination is used to group NFTs under it.
```go
// Denom defines a type of NFT
type Denom struct {
	Id      string `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name    string `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	Schema  string `protobuf:"bytes,3,opt,name=schema,proto3" json:"schema,omitempty"`
	Creator string `protobuf:"bytes,4,opt,name=creator,proto3" json:"creator,omitempty"`
}
```

## Events
> The events that are emitted after certain operations.
```go
	EventTypeIssueDenom    = "issue_denom"
	EventTypeTransferNft   = "transfer_nft"
	EventTypeApproveNft    = "approve_nft"
	EventTypeApproveAllNft = "approve_all_nft"
	EventTypeRevokeNft     = "revoke_nft"
	EventTypeEditNFT       = "edit_nft"
	EventTypeMintNFT       = "mint_nft"
	EventTypeBurnNFT       = "burn_nft"
```
