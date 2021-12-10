import Web3 from 'web3';
import BigData from './artifacts/contracts/BigData.sol/BigData.json';

let selectedAccount;
let bigdataAddress; 
let contract; 
let isInitialized = false;
let amountToSend; 
let membershipPrice;
let discountedPrice;

export const init = async () => {
    let provider = window.ethereum;

    if(typeof provider !== 'undefined') {
      // Metamask is installed

      provider
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          selectedAccount = accounts[0];  
          console.log('Selected Account is ' + selectedAccount);
        })
        .catch(err => {
          console.log(err); 
          return;
        });

      window.ethereum.on('accountsChanged', function (accounts){
        selectedAccount = accounts[0];  
        console.log('Selected Account changed to ' + selectedAccount);
      })
    }

    const web3 = new Web3(provider);
    
    bigdataAddress = "0xc5a5C42992dECbae36851359345FE25997F5C42d"; // update contract address here
    contract = new web3.eth.Contract(BigData.abi, bigdataAddress);
    
    membershipPrice = contract.methods.checkMembershipPrice();
    discountedPrice = contract.methods.checkDiscountedPriced();
    // discountedPriced = web3.utils.toBN(discountedPriced);

    amountToSend = web3.utils.fromWei("5", "ether");
    // amountToSend = discountedPrice.toString();

    isInitialized = true;
};

export const getMembership = async () => {
    if (!isInitialized) {
        await init();
    }

    return contract.methods.buyMembership().send({ from: selectedAccount, value: amountToSend })
} 