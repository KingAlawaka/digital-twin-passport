pub contract BasicNFT {

    pub var totalSupply: UInt64

    pub resource interface NFTPublic {
        pub fun getID(): UInt64 
        pub fun getURL():String 
    }

    // Declare the NFT resource type
    pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // String mapping to hold metadata
        pub var metadata: {String: String}

        // Initialize both fields in the init function
        init(InitUrl: String) {
            self.id = BasicNFT.totalSupply
            self.metadata = {"url":InitUrl}
            BasicNFT.totalSupply = BasicNFT.totalSupply + 1
        }

        pub fun getID(): UInt64{
            return self.id
        }

        pub fun getURL(): String{
            return self.metadata["URL"]!
        }
    }

    // Function to create a new NFT
    pub fun createNFT(url: String): @NFT {
        return <-create NFT(InitUrl: url)
    }

    // Create a single new NFT and save it to account storage
    init() {
        self.totalSupply = 0
        //self.account.save<@NFT>(<-create NFT(initID: 1), to: /storage/BasicNFTPath)
    }
}