import React, { useEffect, useState } from 'react';
import { init, getMembership } from './Web3Client';
import { ethers } from 'ethers'
import Web3 from 'web3'
import './App.css';
import BigData from './artifacts/contracts/BigData.sol/BigData.json'

// const bigdataAddress = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d"

function App() {
  // const providerUrl = process.env.PROVIDER_URL || "http://localhost:8545"; // this is where you would tie in infura or alchemy or moralis

  const [minted, setMinted] = useState(false);

  const getMember = () => {
    getMembership().then(tx => {
      console.log(tx);
      setMinted(true);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {  
    init();
  }, [])

  // const account = web3.eth.getAccounts().then(console.log); 
  
  // // request access to the user's MetaMask account
  // async function requestAccount() {
  //   await window.ethereum.request({ method: 'eth_requestAccounts' });
  // }

  // // call the smart contract
  // async function connectAccount() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     await requestAccount()
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     // const signer = provider.getSigner()
  //     // const contract = new ethers.Contract(bigdataAddress, BigData.abi, signer)
  //     const contract = new web3.eth.Contract(BigData.abi, bigdataAddress)
  //     // console.log(contract)
  //     // const walletAddress = signer.getAddress()
  //     // console.log(walletAddress)
  //     const registered = contract.methods.checkMember(account)
  //     const whitelisted = contract.methods.checkWhitelist(account)
  //     const membershipPrice = contract.methods.checkMembershipPrice()
  //     const discountedPriced = contract.methods.checkDiscountedPriced()
  //     console.log("Wallet:" + account)
  //     console.log("Reg " + registered)
  //     console.log("White " + whitelisted)
  //     console.log("Member Price: " + membershipPrice)
  //     console.log("Discount Price: " + discountedPriced)
  //     console.log(ethers.BigNumber.isBigNumber(membershipPrice))
  //     console.log(ethers.BigNumber.isBigNumber(discountedPriced))
      
  //     if (registered) {
  //       console.log("registered true")
  //       const transaction = await contract.methods.buyMembership()
  //       // await transaction.wait()
  //       console.log("hellooo? " + transaction)
  //       // console.log(msg.sender)
  //       // console.log(msg.value)
  //     } else if (whitelisted) {
  //       console.log("whitelisted")
  //     } else {
  //       console.log("new user")
  //       // const amount = ethers.utils.parseEther("6.0")
  //       // console.log(amount)
  //       const formatted_amount = web3.utils.fromWei(membershipPrice, "ether")
  //       console.log(formatted_amount)
  //       const transaction = await contract.buyMembership({ value: formatted_amount })
  //       console.log("did it work?" + transaction)
  //       await transaction.wait()
  //     }
  //   }
  // }
  
  return (
    <div className="App">
      {!minted 
        ? <button onClick={() => getMember()}>Buy Membership</button>
        : <p>Membership bought successfully</p>
      }
      {/* <header className="App-header">
        <button onClick={connectAccount}>Connect</button>

        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header> */}
    </div>
  );
}

export default App;
