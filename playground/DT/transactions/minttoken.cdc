import DTNFT from "../contract/DTNFT.cdc"


// This transaction adds an empty Vault to account 0x02
// and mints an NFT with id=1 that is deposited into
// the NFT collection on account 0x01.
transaction (requester: Address, data: {String:String}) {

  // Private reference to this account's minter resource
  let minterRef: &DTNFT.NFTMinter

  prepare(acct: AuthAccount) {

    // Borrow a reference for the NFTMinter in storage
    self.minterRef = acct.borrow<&DTNFT.NFTMinter>(from: DTNFT.MinterStoragePath)
        ?? panic("Could not borrow owner's NFT minter reference")
  }
  execute {
    // Get the recipient's public account object
    let recipient = getAccount(requester)

    // Get the Collection reference for the receiver
    // getting the public capability and borrowing a reference from it
    let receiverRef = recipient.getCapability(DTNFT.CollectionPublicPath)
                               .borrow<&{DTNFT.NFTReceiver}>()
                               ?? panic("Could not borrow nft receiver reference")

    // Mint an NFT and deposit it into account 0x01's collection
    receiverRef.deposit(token: <-self.minterRef.mintNFT(data:data))

    log("New NFT minted for account ")
    log(recipient)
  }
}