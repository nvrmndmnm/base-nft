import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import 'dotenv/config';

const CONTRACT_ADDRESS = `${process.env.CONTRACT_ADDRESS}`;

task("mint", "Mint a new NFT")
    .addParam("to", "Recipient address")
    .addParam("uri", "IPFS metadata URI")
    .setAction(async (args, hre) => {
        const baseNFT = await hre.ethers.getContractAt("BaseNFT", CONTRACT_ADDRESS);
        const signer = await hre.ethers.getSigner(args.signer);
        await baseNFT.mintNFT(args.to, args.uri);
        console.log(`Minted an NFT to address ${args.to}.`);
    });