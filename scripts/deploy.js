const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, Hardhat!");

  // await greeter.deployed();

  // console.log("Greeter deployed to:", greeter.address);
  const BigData = await hre.ethers.getContractFactory("BigData");
  const bigdata = await BigData.deploy();

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();  

  await bigdata.deployed();
  await token.deployed();

  console.log("BigData deployed to:", bigdata.address);
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
