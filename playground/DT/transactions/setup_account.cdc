import DTNFT from "../contract/DTNFT.cdc"

// This transaction sets up account 0x01 for the marketplace tutorial
// by publishing a Vault reference and creating an empty NFT Collection.
transaction (test: String) {
  prepare(acct: AuthAccount) {

    log(test)

    // store an empty NFT Collection in account storage
    acct.save<@DTNFT.Collection>(<-DTNFT.createEmptyCollection(), to: /storage/nftTutorialCollection)

    // publish a capability to the Collection in storage
    acct.link<&{DTNFT.NFTReceiver}>(DTNFT.CollectionPublicPath, target: DTNFT.CollectionStoragePath)

    log("Created a new empty collection and published a reference")
  }
}
