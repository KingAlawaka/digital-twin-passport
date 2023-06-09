import { config } from '@onflow/fcl';

config({
    "accessNode.api": "https://rest-testnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
     "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Mainnet: "https://fcl-discovery.onflow.org/authn"
     "0xProfile": "0x6f81bc683d61b34c", // The account address where the Profile smart contract lives on Testnet
    "app.detail.title": "Krushi DApp",
    "app.detail.icon": "https://w7.pngwing.com/pngs/788/138/png-transparent-farm-agriculture-tractor-agriculture-leaf-label-logo-thumbnail.png"
    })

// config()
// 	.put('accessNode.api', 'https://rest-testnet.onflow.org') // This connects us to Flow TestNet
// 	.put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn/') // Allows us to connect to Blocto & Lilico Wallet
// 	.put('app.detail.title', 'Krushi DApp') // Will be the title when user clicks on wallet
// 	.put('app.detail.icon', 'https://w7.pngwing.com/pngs/788/138/png-transparent-farm-agriculture-tractor-agriculture-leaf-label-logo-thumbnail.png'); // Will be the icon when user clicks on wallet