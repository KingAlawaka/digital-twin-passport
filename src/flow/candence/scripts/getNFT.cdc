import BasicNFT from "../contracts/BasicNFT.cdc"
pub fun main(): AnyStruct {
  let publicReference = getAccount(0x6f81bc683d61b34c).getCapability(/public/BasicNFTPath)
                                    .borrow<&BasicNFT.NFT>()
                                    ?? panic("No NFT reference found here!")
  return [publicReference.getID(), publicReference.getURL()]
}