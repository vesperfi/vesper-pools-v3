'use strict'

const Address = require('./address')

const setup = {}
const rewards = { contract: 'PoolRewards', tokens: [] }

const PoolConfig = {
  VUSDC: {
    contractName: 'VPool',
    poolParams: ['vUSDC Pool', 'vUSDC', Address.USDC],
    setup: { ...setup }, // Shallow copy
    rewards: { ...rewards },
  },
}

module.exports = Object.freeze(PoolConfig)
