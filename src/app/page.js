'use client';
import Head from 'next/head'
import styles from '../styles/page.module.css'
import Nav from '@/components/Nav';
import { useState,useEffect } from 'react';
import * as fcl from '@onflow/fcl';

// import {getNFT} from "../flow/cadence/scripts/getNFT.js"
import {getNFT} from "../flow/candence/scripts/getNFT.js"


export default function Home() {
  const [newGreeting, setNewGreeting] = useState('');
  const [greeting,setGreeting] = useState('');
  const [ranNum,setRandomNumber] = useState(0);
  const [txStatus,setTxStatus] = useState('Run Transaction');
  const [nftDetails,setNFTDetails] = useState('no');
  const [user, setUser] = useState();

  // function runTransaction(){
  //   console.log("Hellow");
  //   console.log(newGreeting);
  // }

  async function getRandomNumber(){
    const response = await fcl.query({
      cadence: `
      
      import SimpleTest from 0x6c0d53c676256e8c

      pub fun main(): Int {
        return SimpleTest.number
      }
      `,
      args:(arg, t) => []
    });
    setRandomNumber(response)
  }

  async function getNFTDetails(){
    const response = await fcl.query({
      cadence: `
      
      import BasicNFT from 0x6f81bc683d61b34c
pub fun main(account: Address): AnyStruct {
  let publicReference = getAccount(account).getCapability(/public/BasicNFTPath)
                                    .borrow<&BasicNFT.NFT>()
                                    ?? panic("No NFT reference found here!")
  return [publicReference.getID(), publicReference.getURL()]
}
      
      `,
      args:(arg, t) => [arg(user.addr,fcl.t.Address)]
    });
    setNFTDetails(response)
  }

  async function executeScript() {
    const response = await fcl.query({
      cadence: `
      import HelloWorld from 0x6f81bc683d61b34c

      pub fun main(m:String): String {
          return HelloWorld.greeting.concat("--").concat(m).concat("!!")
      }
      `, // CADENCE CODE GOES IN THESE ``
      args: (arg, t) => [arg("na uba hodai",t.String)] // ARGUMENTS GO IN HERE
    });

    setGreeting(response);

    console.log('Response from our script: ' + response);
  }

  async function sendNumber(){
    const tID = await fcl.mutate(
      {
        cadence:`
        
        import SimpleTest from 0x6c0d53c676256e8c

transaction(num: Int) {

  prepare(signer: AuthAccount) {}

  execute {
    SimpleTest.updateNumber(newNumber: num)
  }
}

        `,
        args: (arg,t) => [arg(1000,t.Int)],
        proposer: fcl.authz,
        payer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 999
      }
    );
    console.log("Transaction ID "+ tID);
    await fcl.tx(tID).onceSealed();
    getRandomNumber();
  }

  async function runTransaction(){

    const transactionID = await fcl.mutate(
      {
        cadence:`
        
        import HelloWorld from 0x6f81bc683d61b34c

transaction(myNewGreeting: String) {

  prepare(signer: AuthAccount) {}

  execute {
    HelloWorld.changeGreeting(newGreeting: myNewGreeting)
  }
}

        `,
        args: (arg,t) => [arg(newGreeting,t.String)],
        proposer: fcl.authz,
        payer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 999
      }
    );
    console.log("Transaction ID "+ transactionID);
    fcl.tx(transactionID).subscribe((res) => {
      console.log(res);
      if (res.status === 0 || res.status === 1) {
        setTxStatus('Pending...');
      } else if (res.status === 2) {
        setTxStatus('Finalized...');
      } else if (res.status === 3) {
        setTxStatus('Executed...');
      } else if (res.status === 4) {
        setTxStatus('Sealed!');
        setTimeout(() => setTxStatus('Run Transaction'), 2000);
      }
    });
    await fcl.tx(transactionID).onceSealed();
    executeScript();
  }

  useEffect(() => {
    executeScript();
  }, []);

  function m2(){
    console.log("bye");
  }

  async function createNFT(){

    fcl.currentUser().subscribe(setUser);

    const transactionID = await fcl.mutate(
      {
        cadence:`
        
        import BasicNFT from 0x6f81bc683d61b34c

transaction (url: String){
  prepare(acct: AuthAccount) {
  
    acct.save(<-BasicNFT.createNFT(url: url), to: /storage/BasicNFTPath)
    //acct.link<&BasicNFT.NFT{BasicNFT.NFTPublic}>(/public/BasicNFTPath, target: /storage/BasicNFTPath)
  
  }
  execute {
    log("NFT Created!")
  }
}

        `,
        args: (arg,t) => [arg(newGreeting,t.String)],
        proposer: fcl.authz,
        payer: fcl.authz,
        authorizations: [fcl.authz],
        limit: 999
      }
    );
    console.log("Transaction ID "+ transactionID);
    fcl.tx(transactionID).subscribe((res) => {
      console.log(res);
      if (res.status === 0 || res.status === 1) {
        setTxStatus('Pending...');
      } else if (res.status === 2) {
        setTxStatus('Finalized...');
      } else if (res.status === 3) {
        setTxStatus('Executed...');
      } else if (res.status === 4) {
        setTxStatus('Sealed!');
        setTimeout(() => setTxStatus('Run Transaction'), 2000);
      }
    });
    await fcl.tx(transactionID).onceSealed();
    executeScript();
  }

  const GetMyNFT = async () =>{

    const result = await fcl.send([
      fcl.script(getNFT), fcl.args([fcl.arg(user.addr, fcl.t.Address)])
    ]).then(fcl.decode)

    setNFTURL(result[1])
    console.log(result[1])

  }

  const logIn =  () => {
    fcl.authenticate();
    fcl.currentUser().subscribe(setUser);
    // GetTotalSupply()
    console.log(user.addr);
  }

	return (
		<div className={styles.container}>
			<Head>
				<title>Emerald DApp</title>
				<meta name="description" content="Created by Emerald Academy" />
				<link rel="icon" href="https://i.imgur.com/hvNtbgD.png" />
			</Head>

      <Nav />

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to my{' '}
					<a href="https://academy.ecdao.org" target="_blank">
						Emerald DApp!
					</a>
				</h1>
        <input onChange={(e) => setNewGreeting(e.target.value)} placeholder="Hello, Idiots!" />
        
        <p>test p tag {greeting} </p>
        <p> Random Number {ranNum} </p>
        <button onClick={runTransaction}>{txStatus}</button>
        <button onClick={getRandomNumber}>button2</button>
        <button onClick={sendNumber}>Send Number</button>
        <p>---------------</p>
        <button onClick={createNFT}>Create NFT</button>
        <p>{nftDetails}</p>
        <button onClick={getNFTDetails}>Get NFT details</button>
        <p>--- Second way---</p>
        <button onClick={() => logIn()}>LogIn</button>
        <button onClick={() => GetMyNFT()}>GetMyNFT</button>
			</main>
		</div>
	);
}