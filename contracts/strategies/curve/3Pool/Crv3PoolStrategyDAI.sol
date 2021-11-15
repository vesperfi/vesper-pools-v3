// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "./Crv3PoolStrategy.sol";

//solhint-disable no-empty-blocks
contract Crv3PoolStrategyDAI is Crv3PoolStrategy {
    string public constant NAME = "Curve-3pool-DAI-Strategy";
    string public constant VERSION = "3.0.7";

    constructor(address _pool, address _swapManager) Crv3PoolStrategy(_pool, _swapManager, 0) {}

    /// @dev Convert from 18 decimals to token defined decimals. Default no conversion.
    function convertFrom18(uint256 amount) public pure override returns (uint256) {
        return amount;
    }
}
