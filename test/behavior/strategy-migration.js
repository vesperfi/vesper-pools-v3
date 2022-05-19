'use strict'

const { makeNewStrategy } = require('../utils/setupHelper')
const { deposit: _deposit, rebalanceStrategy } = require('../utils/poolOps')
const { expect } = require('chai')

async function shouldMigrateStrategies(poolName) {
  let pool, strategies, collateralToken
  let user1, user2, user3, gov
  const options = { skipVault: true }

  async function deposit(amount, depositor) {
    return _deposit(pool, collateralToken, amount, depositor)
  }

  async function migrateAndAssert(oldStrategy, newStrategy, receiptToken) {
    await Promise.all([deposit(50, user2), deposit(30, user1)])
    await rebalanceStrategy(oldStrategy)
    const [totalSupplyBefore, totalValueBefore, totalDebtBefore, totalDebtRatioBefore, receiptTokenBefore] =
      await Promise.all([
        pool.totalSupply(),
        pool.totalValue(),
        pool.totalDebt(),
        pool.totalDebtRatio(),
        receiptToken.balanceOf(oldStrategy.instance.address),
      ])

    await pool.connect(gov.signer).migrateStrategy(oldStrategy.instance.address, newStrategy.instance.address)
    // Rebalance will mint new shares equal to fee, to keep supply same as before set fee to 0
    const universalFee = await pool.universalFee()
    await pool.connect(gov.signer).updateUniversalFee(0)
    await newStrategy.instance.rebalance()
    // Reset universal fee
    await pool.connect(gov.signer).updateUniversalFee(universalFee)
    const [
      totalSupplyAfter,
      totalValueAfter,
      totalDebtAfter,
      totalDebtRatioAfter,
      receiptTokenAfter,
      receiptTokenAfter2,
    ] = await Promise.all([
      pool.totalSupply(),
      pool.totalValue(),
      pool.totalDebt(),
      pool.totalDebtRatio(),
      receiptToken.balanceOf(oldStrategy.instance.address),
      receiptToken.balanceOf(newStrategy.instance.address),
    ])
    expect(totalSupplyAfter).to.be.eq(totalSupplyBefore, `${poolName} total supply after migration is not correct`)

    // Some strategies incur loss during migration or during the rebalance after migration. Hence allow 0.1% deviation
    expect(totalValueAfter).to.be.closeTo(
      totalValueBefore,
      totalValueBefore.div('1000'), // 0.1% as delta
      `${poolName} total value after migration is not correct`,
    )
    expect(totalDebtAfter).to.be.closeTo(
      totalDebtBefore,
      totalDebtBefore.div('1000'), // 0.1% as delta
      `${poolName} total debt after migration is not correct`,
    )
    expect(totalDebtRatioAfter).to.be.eq(
      totalDebtRatioBefore,
      `${poolName} total debt ratio after migration is not correct`,
    )

    expect(receiptTokenAfter).to.be.eq(
      0,
      `${poolName} receipt token balance of old strategy after migration is not correct`,
    )

    expect(receiptTokenAfter2).to.be.closeTo(
      receiptTokenBefore,
      receiptTokenBefore.div('1000'), // 0.1% as delta
      `${poolName} receipt token balance of new strategy after migration is not correct`,
    )
  }

  async function assertDepositAndWithdraw(newStrategy) {
    await deposit(30, user2)
    const amountBefore = await pool.balanceOf(user2.address)
    expect(amountBefore).to.be.gt(0, 'failed to deposit in pool')
    await rebalanceStrategy(newStrategy)
    await pool.connect(user2.signer).withdraw(amountBefore)
    const amountAfter = await pool.balanceOf(user2.address)
    expect(amountAfter).to.be.lt(amountBefore, "User's pool amount should decrease after withdraw")
  }

  async function assertTotalDebt(newStrategy) {
    await deposit(40, user3)
    await rebalanceStrategy(newStrategy)
    const totalDebtBefore = await pool.totalDebtOf(newStrategy.instance.address)
    await deposit(50, user3)
    await rebalanceStrategy(newStrategy)
    const totalDebtAfter = await pool.totalDebtOf(newStrategy.instance.address)
    expect(totalDebtAfter).to.be.gt(totalDebtBefore, `Total debt of strategy in ${poolName} is wrong`)
  }

  async function strategyMigration(strategy) {
    const newStrategy = await makeNewStrategy(strategy, pool.address, options)
    await migrateAndAssert(strategy, newStrategy, strategy.token)
    await assertDepositAndWithdraw(newStrategy)
    await assertTotalDebt(newStrategy)
  }

  describe(`${poolName} Strategy Migration`, function () {
    beforeEach(async function () {
      ;[gov, user1, user2, user3] = this.users
      pool = this.pool
      strategies = this.strategies
      collateralToken = this.collateralToken
    })

    it(`Should be able to migrate strategies for ${poolName}`, async function () {
      for (const strategy of strategies) {
        await strategyMigration(strategy)
      }
    })
  })
}

module.exports = { shouldMigrateStrategies }
