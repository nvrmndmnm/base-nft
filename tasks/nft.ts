import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import 'dotenv/config';

const CONTRACT_ADDRESS = `${process.env.CONTRACT_ADDRESS}`;
const REBASE_CONTRACT_ADDRESS = `${process.env.REBASE_CONTRACT_ADDRESS}`;

task("mint", "Mint a new NFT (ERC-721)")
    .addParam("to", "Recipient address")
    .addParam("uri", "IPFS metadata URI")
    .setAction(async (args, hre) => {
        const baseNFT = await hre.ethers.getContractAt("BaseNFT", CONTRACT_ADDRESS);
        await baseNFT.mintNFT(args.to, args.uri);
        console.log(`Minted an NFT to address ${args.to}.`);
    });

task("mint-batch", "Mint a batch of NFTs and FTs (ERC-1155)")
    .addParam("to", "Recipient address")
    .addParam("ids", "Array of token IDs separated by commas")
    .addParam("supply", "Array of token supply separated by commas")
    .setAction(async (args, hre) => {
        let ids = Array.from(args.ids.split(","));
        let supply = Array.from(args.supply.split(","));
        const rebaseNFT = await hre.ethers.getContractAt("RebaseNFT", REBASE_CONTRACT_ADDRESS);
        await rebaseNFT.mintBatch(args.to, ids, supply);
        console.log(`Minted tokens to address ${args.to}.`);
    })