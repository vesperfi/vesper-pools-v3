// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "../../../interfaces/vesper/IVesperPool.sol";
import "../../Strategy.sol";
import "../CrvPoolStrategyBase.sol";

/// @title This strategy will deposit collateral token in Curve 3Pool and earn interest.
contract CrvSBTCPoolStrategy is CrvPoolStrategyBase {
    address private constant THREEPOOL = 0x7fC77b5c7614E1533320Ea6DDc2Eb61fa00A9714;
    address private constant THREECRV = 0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3;
    address private constant GAUGE = 0x705350c4BcD35c9441419DdD5d2f097d7a55410F;

    constructor(
        address _pool,
        address _swapManager,
        uint256 _collateralIdx,
        string memory _name
    ) CrvPoolStrategyBase(_pool, THREEPOOL, THREECRV, GAUGE, _swapManager, _collateralIdx, 3, _name) {
        require(
            IStableSwapV2(THREEPOOL).coins(int128(uint128(_collateralIdx))) == address(IVesperPool(_pool).token()),
            "collateral-mismatch"
        );
    }

    function _init(address _crvPool, uint256 _n) internal virtual override {
        address[] memory _coins = new address[](_n);
        uint256[] memory _coinDecimals = new uint256[](_n);
        for (uint256 i = 0; i < _n; i++) {
            _coins[i] = IStableSwapV2(_crvPool).coins(int128((uint128(i))));
            _coinDecimals[i] = IERC20Metadata(_coins[i]).decimals();
        }
        coins = _coins;
        coinDecimals = _coinDecimals;
    }

    function _setupOracles() internal virtual override {
        swapManager.createOrUpdateOracle(CRV, WETH, oraclePeriod, oracleRouterIdx);
        for (int128 i = 0; i < int128(int256(n)); i++) {
            swapManager.createOrUpdateOracle(
                IStableSwapV2(address(crvPool)).coins(i),
                WETH,
                oraclePeriod,
                oracleRouterIdx
            );
        }
    }
}
