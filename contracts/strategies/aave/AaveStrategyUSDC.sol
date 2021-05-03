// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "./AaveStrategy.sol";

//solhint-disable no-empty-blocks
contract AaveStrategyUSDC is AaveStrategy {
    string public constant NAME = "Aave-Strategy-USDC";
    string public constant VERSION = "3.0.0";

    constructor(address _pool)
        AaveStrategy(_pool, 0xBcca60bB61934080951369a648Fb03DF4F96263C) //aUSDC
    {}
}
