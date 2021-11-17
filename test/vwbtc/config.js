'use strict'

const { getUsers, setupVPool } = require('../utils/setupHelper')
const StrategyType = require('../utils/strategyTypes')
const { getChain } = require('../utils/chains')
const PoolConfig = require(`../../helper/${getChain()}/poolConfig`)
const { ethers } = require('hardhat')
const ONE_MILLION = ethers.utils.parseEther('100000000')

function prepareConfig(_strategies) {
  const interestFee = '1500' // 15%
  const strategies = _strategies || [
    {
      name: 'EarnCompoundStrategyWBTC',
      type: StrategyType.EARN_COMPOUND,
      config: { interestFee, debtRatio: 4500, debtRate: ONE_MILLION },
    },
    {
      name: 'CompoundStrategyWBTC',
      type: StrategyType.COMPOUND,
      config: { interestFee, debtRatio: 4500, debtRate: ONE_MILLION },
    },
  ]
  beforeEach(async function () {
    const users = await getUsers()
    this.users = users
    await setupVPool(this, {
      poolConfig: PoolConfig.VAWBTC,
      feeCollector: users[7].address,
      strategies: strategies.map((item, i) => ({
        ...item,
        feeCollector: users[i + 8].address, // leave first 8 users for other testing
      })),
    })
  })
  return strategies
}

module.exports = { prepareConfig }
