// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "../strategies/maker/AaveMakerStrategy.sol";

//solhint-disable no-empty-blocks
contract AaveMakerStrategyETH_A is AaveMakerStrategy {
    string public constant NAME = "Aave-Maker-Strategy-ETH_A";
    string public constant VERSION = "3.0.0";

    // aDAI = 0x028171bCA77440897B824Ca71D1c56caC55b68A3
    constructor(
        address _pool,
        address _cm,
        address _swapManager
    ) AaveMakerStrategy(_pool, _cm, _swapManager, 0x028171bCA77440897B824Ca71D1c56caC55b68A3, "ETH-A") {}

    /// @dev Convert from 18 decimals to token defined decimals. Default no conversion.
    function convertFrom18(uint256 amount) public pure override returns (uint256) {
        return amount;
    }
}
