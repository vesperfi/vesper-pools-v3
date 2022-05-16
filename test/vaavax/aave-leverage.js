'use strict'

const { prepareConfig } = require('./config')
const { shouldBehaveLikePool } = require('../behavior/vesper-pool')
const { shouldBehaveLikeStrategy } = require('../behavior/strategy')
const { shouldMigrateStrategies } = require('../behavior/strategy-migration')
const { strategyConfig } = require('../utils/chains').getChainData()

describe('vaAVAX Pool with Aave Leverage Strategy', function () {
  const strategy = strategyConfig.AaveLeverageAvalancheStrategyAVAX
  strategy.config.debtRatio = 9000
  const strategies = [strategy]

  prepareConfig(strategies)
  shouldBehaveLikePool('vaAVAX', 'WAVAX')
  for (let i = 0; i < strategies.length; i++) {
    shouldBehaveLikeStrategy(i, strategies[i].type, strategies[i].contract)
  }
  shouldMigrateStrategies('vaAVAX')
})
