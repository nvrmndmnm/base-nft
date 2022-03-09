import {ethers} from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const BaseNFT = await ethers.getContractFactory("BaseNFT");
    const baseNFT = await BaseNFT.deploy();
    await baseNFT.deployed();
    
    console.log("Contract address:", baseNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });