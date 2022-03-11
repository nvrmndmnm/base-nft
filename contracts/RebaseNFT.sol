// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RebaseNFT is ERC1155, Ownable {
    string baseUri;

    constructor(string memory _uri, string memory _baseUri) ERC1155(_uri) {
        baseUri = _baseUri;
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return (
            string(
                abi.encodePacked(baseUri, Strings.toString(tokenId), ".json")
            )
        );
    }

    function mintBatch(
        address recipient,
        uint256[] memory ids,
        uint256[] memory totalSupply
    ) public onlyOwner {
        for (uint256 i = 0; i < ids.length; i++) {
            _mint(recipient, ids[i], totalSupply[i], "");
        }
    }
}
