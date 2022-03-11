import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

const { expect } = require("chai");

describe("RebaseNFT contract", () => {
    const uri = "https://gateway.pinata.cloud/ipfs/Qmein1KdwUnF2o4JqDdiipU9ssraAZqr3uPJMyKiN3fZiu/{id}.json";
    const baseUri = "https://gateway.pinata.cloud/ipfs/Qmein1KdwUnF2o4JqDdiipU9ssraAZqr3uPJMyKiN3fZiu/";
    const zeroUri = "https://gateway.pinata.cloud/ipfs/Qmein1KdwUnF2o4JqDdiipU9ssraAZqr3uPJMyKiN3fZiu/0.json";

    let RebaseNFT: ContractFactory;
    let rebaseNFT: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async () => {
        RebaseNFT = await ethers.getContractFactory("RebaseNFT");
        [owner, addr1, addr2] = await ethers.getSigners();

        rebaseNFT = await RebaseNFT.deploy(uri, baseUri);
    });


    describe("Minting NFTs", () => {
        it("Should return right URI", async () => {
            expect(await rebaseNFT.uri(0)).to.equal(zeroUri);
        });

        it("Should mint multiple tokens at once", async () => {
            await rebaseNFT.mintBatch(
                owner.address,
                [0, 1, 2],
                [100, 1, 3]
            );
            expect(await rebaseNFT.balanceOf(owner.address, 0)).to.equal("100");
            expect(await rebaseNFT.balanceOf(owner.address, 1)).to.equal("1");
            expect(await rebaseNFT.balanceOf(owner.address, 2)).to.equal("3");
        });

        it("Should revert non-admin minting", async () => {
            await expect(rebaseNFT.connect(addr1).mintBatch(
                addr2.address,
                [0, 1, 2],
                [100, 1, 3]))
                .to.be.revertedWith('Ownable: caller is not the owner');
        })
    });
});