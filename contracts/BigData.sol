// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract BigData{
    
    // declare variables
    address payable public owner;
    uint public membershipPrice = 5 ether;
    uint public discountedPrice = 1 ether;
    mapping(address => bool) public registeredUsers;
    mapping(address => bool) public whitelistUsers;

    constructor() {
        // set owner and add the owner to registeredUsers
        console.log("Deploying a BigData");
        owner = payable(msg.sender);
        registeredUsers[msg.sender] = true;
    }

    // receive() external payable
    // {
    //     buyMembership();
    // }
    
    // check if whitelist for discounted price vs full price
    function buyMembership() external payable {
        console.log(msg.sender);
        console.log(msg.value);
        require(!registeredUsers[msg.sender], "You're already registered!");
        if(whitelistUsers[msg.sender]) {
            require(msg.value >= discountedPrice, "Price below discounted!");
            registeredUsers[msg.sender] = true;
        } else {
            require(msg.value >= membershipPrice, "Price below membership!");
            registeredUsers[msg.sender] = true;
        }    
        
    }

    // add a specific wallet to the whitelist for discounted price
    function addToWhitelist(address _address) public {
        require(msg.sender == owner, "Only owner can call this!");
        whitelistUsers[_address] = true;
    }

    // giveaway a membership for free
    function giveawayMembership(address _address) public {
        require(msg.sender == owner, "Only owner can call this!");
        registeredUsers[_address] = true;
    }

    // remove a membershiper
    function removeMembership(address _address) public {
        require(msg.sender == owner, "Only owner can call this!");
        registeredUsers[_address] = false;
    }

    // remove funds from contract to a given address
    function withdrawFunds(address payable _to) public {
        require(msg.sender == owner, "Only owner can call this!");
        _to.transfer(address(this).balance);  
    }

    // change the membership price
    function setMembershipPrice(uint _price) public {
        require(msg.sender == owner, "Only owner can call this!");
        membershipPrice = _price;
    }

    // change the discount price
    function setDiscountPrice(uint _price) public {
        require(msg.sender == owner, "Only owner can call this!");
        discountedPrice = _price;
    }

    // check if member 
    function checkMember(address _address) public view returns(bool) {
        return(registeredUsers[_address]);
    }

    // check if whitelist 
    function checkWhitelist(address _address) public view returns(bool) {
        return(whitelistUsers[_address]);
    }

    // check membership price
    function checkMembershipPrice() public view returns(uint) {
        return(membershipPrice);
    }

    // check discount price 
    function checkDiscountedPriced() public view returns(uint) {
        return(discountedPrice);
    }
}