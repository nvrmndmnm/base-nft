import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

const { expect } = require("chai");

describe("BaseNFT contract", () => {
    const name: String = "Base NFT";
    const symbol: String = "BNFT";
    const defaultURI = 'QmXNPppGehATJ75LmJtfTsdzbAzTZhexaSEsSEtyTn5frW';

    let BaseNFT: ContractFactory;
    let baseNFT: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async () => {
        BaseNFT = await ethers.getContractFactory("BaseNFT");
        [owner, addr1, addr2] = await ethers.getSigners();

        baseNFT = await BaseNFT.deploy();
    });

    describe("Deployment", () => {
        it("Should have correct name", async () => {
            expect(await baseNFT.name()).to.equal(name);
        });
        it("Should have correct symbol", async () => {
            expect(await baseNFT.symbol()).to.equal(symbol);
        });
        it("Should set the right owner", async () => {
            expect(await baseNFT.owner()).to.equal(owner.address);
        });
    });

    describe("Minting NFTs", () => {
        it("Should mint new NFTs", async () => {
            expect(await baseNFT.balanceOf(addr1.address)).to.equal('0');
            await expect(await baseNFT.mintNFT(addr1.address, defaultURI))
                .to.emit(baseNFT, 'Transfer').withArgs(ethers.constants.AddressZero, addr1.address, '1');
            expect(await baseNFT.balanceOf(addr1.address)).to.equal('1');
        });
        it("Should return minted NFT ID", async () => {
            expect(await baseNFT.callStatic.mintNFT(addr1.address, defaultURI)).to.equal('1');
        });
        it("Should increment NFT IDs", async () => {
            await baseNFT.mintNFT(addr1.address, defaultURI);
            await baseNFT.mintNFT(addr2.address, defaultURI);
            expect(await baseNFT.callStatic.mintNFT(addr1.address, defaultURI)).to.equal('3');
        });

    });
});