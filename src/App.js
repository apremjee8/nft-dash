import { useState } from 'react';
import { ethers } from 'ethers'
import Web3 from 'web3'
import './App.css';
import BigData from './artifacts/contracts/BigData.sol/BigData.json'
import Token from './artifacts/contracts/Token.sol/Token.json'
// import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'

// const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// web3.eth.getAccounts().then(console.log);
const bigdataAddress = "0x68B1D87F95878fE05B998F19b66F4baba5De1aed"
const tokenAddress = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c"


function App() {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  web3.eth.getAccounts().then(console.log); 
  const [userAccount, setUserAccount] = useState()
  const [amount, setAmount] = useState()
  
  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  

  // // call the smart contract, read the current greeting value
  // async function fetchGreeting() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
  //     try {
  //       const data = await contract.greet()
  //       console.log('data: ', data)
  //     } catch (err) {
  //       console.log("Error: ", err)
  //     }
  //   }    
  // }

  // call the smart contract
  async function connectAccount() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      // const contract = new ethers.Contract(bigdataAddress, BigData.abi, signer)
      const contract = new web3.eth.Contract(BigData.abi, bigdataAddress)
      console.log(contract)
      const walletAddress = signer.getAddress()
      console.log(walletAddress)
      const registered = await contract.checkMember(walletAddress)
      const whitelisted = await contract.checkWhitelist(walletAddress)
      const membershipPrice = await contract.checkMembershipPrice()
      const discountedPriced = await contract.checkDiscountedPriced()
      console.log("Reg " + registered)
      console.log("White " + whitelisted)
      console.log("Member Price: " + membershipPrice)
      console.log("Discount Price: " + discountedPriced)
      
      if (registered) {
        console.log("registered true")
        const transaction = await contract.buyMembership()
        await transaction.wait()
        console.log("hellooo? " + transaction)
        // console.log(msg.sender)
        // console.log(msg.value)
      } else if (whitelisted) {
        console.log("whitelisted")
      } else {
        console.log("new user")
        // const amount = ethers.utils.parseEther("6.0")
        // console.log(amount)
        const formatted_amount = web3.utils.toWei('0.01', "ether")
        console.log(formatted_amount)
        const transaction = await contract.buyMembership({ value: formatted_amount })
        console.log("did it work?" + transaction)
        await transaction.wait()
      }
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={connectAccount}>Connect</button>

        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      </header>
    </div>
  );
}

export default App;
