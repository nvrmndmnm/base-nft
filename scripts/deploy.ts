import { ethers } from "hardhat";
import 'dotenv/config';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const BaseNFT = await ethers.getContractFactory("BaseNFT");
  const baseNFT = await BaseNFT.deploy();
  await baseNFT.deployed();

  const uri = `${process.env.PINATA_URI}`;
  const baseUri = `${process.env.PINATA_BASE_URI}`;
  const RebaseNFT = await ethers.getContractFactory("RebaseNFT");
  const rebaseNFT = await RebaseNFT.deploy(uri, baseUri);
  await rebaseNFT.deployed();

  console.log("Contract address:", rebaseNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });