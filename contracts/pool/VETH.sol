// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "./VTokenBase.sol";
import "../interfaces/token/IToken.sol";

contract VETH is VTokenBase {
    TokenLike public immutable weth;
    bool private withdrawInETH = false;

    // WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    constructor() VTokenBase("vETH Pool", "vETH", 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) {
        weth = TokenLike(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);
    }

    /// @dev Handle incoming ETH to the contract address.
    receive() external payable {
        if (msg.sender != address(weth)) {
            deposit();
        }
    }

    /// @dev Burns tokens/shares and returns the ETH value, after fee, of those.
    function withdrawETH(uint256 _shares) external whenNotShutdown nonReentrant {
        withdrawInETH = true;
        _withdraw(_shares);
        withdrawInETH = false;
    }

    /**
     * @dev After burning hook, it will be called during withdrawal process.
     * It will withdraw collateral from strategy and transfer it to user.
     */
    function _afterBurning(uint256 _amount) internal override returns (uint256) {
        if (withdrawInETH) {
            weth.withdraw(_amount);
            Address.sendValue(payable(_msgSender()), _amount);
        } else {
            super._afterBurning(_amount);
        }
        return _amount;
    }

    /**
     * @dev Receives ETH and grants new tokens/shares to the sender depending
     * on the value of pool's share.
     */
    function deposit() public payable whenNotPaused nonReentrant {
        uint256 shares = _calculateShares(msg.value);
        // Wraps ETH in WETH
        weth.deposit{value: msg.value}();
        _mint(_msgSender(), shares);
    }
}
