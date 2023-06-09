import DTNFT from "../contract/DTNFT.cdc"

transaction(recipient: Address, withdrawID: UInt64) {

/// Reference to the withdrawer's collection
    let withdrawRef: &DTNFT.Collection

    /// Reference of the collection to deposit the NFT to
    //let depositRef: &DTNFT.CollectionPublicPath

prepare(signer: AuthAccount) {

self.withdrawRef = signer
            .borrow<&DTNFT.Collection>(from: DTNFT.CollectionStoragePath)
            ?? panic("Account does not store an object at the specified path")

// get the recipients public account object
        let recipient = getAccount(recipient)

        // borrow a public reference to the receivers collection
        let receiverRef = recipient.getCapability(DTNFT.CollectionPublicPath)
                               .borrow<&{DTNFT.NFTReceiver}>()
                               ?? panic("Could not borrow nft receiver reference")

 receiverRef.deposit(token: <-self.withdrawRef.withdraw(withdrawID:withdrawID))

log("transfer")
log(self.withdrawRef)

}
execute {}


}