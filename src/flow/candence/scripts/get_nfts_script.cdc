import DTNFT from "../contracts/DTNFT.cdc"

// This script checks that the Vault balances and NFT collections are correct
// for both accounts.
//
// Account 1: Vault balance = 50, No NFTs
// Account 2: Vault balance = 10, NFT ID=1
pub fun main(acc: Address) {
    // Get the accounts' public account objects
    let acct1 = getAccount(acc)
    
    // Find the public Receiver capability for their Collections
    let acct1Capability = acct1.getCapability(DTNFT.CollectionPublicPath)

    // borrow references from the capabilities
    let nft1Ref = acct1Capability.borrow<&{DTNFT.NFTReceiver}>()
        ?? panic("Could not borrow acct1 nft collection reference")

    // Print both collections as arrays of IDs
    log(acct1.address)
    log("Account NFTs")
    log(nft1Ref.getIDs())
}