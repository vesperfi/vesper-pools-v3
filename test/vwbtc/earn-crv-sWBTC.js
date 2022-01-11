'use strict'

const { prepareConfig } = require('./config')
const { shouldBehaveLikePool } = require('../behavior/vesper-pool')
const { shouldBehaveLikeStrategy } = require('../behavior/strategy')
const { address: Address, strategyConfig } = require('../utils/chains').getChainData()

describe('veWBTC pool strategies', function () {
  const strategy1 = strategyConfig.EarnCrvSBTCPoolStrategyWBTC
  strategy1.config.interestFee = 2500
  strategy1.config.debtRatio = 9000
  const strategies = [strategy1]

  prepareConfig(strategies, { growPool: { address: Address.vaDAI } })

  describe('Pool Tests', function () {
    shouldBehaveLikePool('veWBTC', 'WBTC', true)
  })

  for (let i = 0; i < strategies.length; i++) {
    shouldBehaveLikeStrategy(i, strategies[i].type, strategies[i].contract)
  }
})
