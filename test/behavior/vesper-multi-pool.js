'use strict'

const {deposit: _deposit, rebalance} = require('../utils/poolOps')
const {expect} = require('chai')
const DECIMAL = '1000000000000000000'
async function shouldBehaveLikeMultiPool(poolName) {
  let pool, strategies, collateralToken
  let user1, user2, gov

  async function deposit(amount, depositor) {
    return _deposit(pool, collateralToken, amount, depositor)
  }

  describe(`${poolName} multi-pool`, function () {
    beforeEach(async function () {
      ;[gov, user1, user2] = this.users
      pool = this.pool
      strategies = this.strategies
      collateralToken = this.collateralToken
      await pool.connect(gov.signer).updateDebtRatio(strategies[0].instance.address, 4800)
      await pool.connect(gov.signer).updateDebtRatio(strategies[1].instance.address, 4500)
    })

    describe(`${poolName}: Withdraw queue`, function () {
      beforeEach(async function () {
        await deposit(250, user1)
        await deposit(200, user2)
      })

      it('Should withdraw everything from 0th strategy.', async function () {
        await rebalance(strategies)
        let tokenHere = await pool.tokensHere()
        let debt0 = (await pool.strategy(strategies[0].instance.address)).totalDebt
        const debt1Before = (await pool.strategy(strategies[1].instance.address)).totalDebt
        const withdrawAmount = await pool.balanceOf(user1.address)
        const poolSharePrice = await pool.pricePerShare()
        const expectedAmount = withdrawAmount.mul(poolSharePrice).div(DECIMAL)
        const expectedFromS1 = expectedAmount.sub(tokenHere).sub(debt0)

        await pool.connect(user1.signer).withdraw(withdrawAmount)
        const debt1After = (await pool.strategy(strategies[1].instance.address)).totalDebt
        const actualWithdrawFromS1 = debt1Before.sub(debt1After)

        debt0 = (await pool.strategy(strategies[0].instance.address)).totalDebt
        tokenHere = await pool.tokensHere()
        expect(actualWithdrawFromS1).to.be.eq(expectedFromS1, 'Withdraw from Strategy 1 is wrong')
        expect(debt0).to.be.eq(0, 'Withdraw from Strategy 1 is wrong')
      })

      it('Should be able to shuffle withdraw queue', async function () {
        await pool
          .connect(gov.signer)
          .updateWithdrawQueue([strategies[1].instance.address, strategies[0].instance.address])
        await rebalance(strategies)
        let tokenHere = await pool.tokensHere()
        let debt1 = (await pool.strategy(strategies[1].instance.address)).totalDebt
        const debt0Before = (await pool.strategy(strategies[0].instance.address)).totalDebt
        const withdrawAmount = await pool.balanceOf(user1.address)
        const poolSharePrice = await pool.pricePerShare()
        const expectedAmount = withdrawAmount.mul(poolSharePrice).div(DECIMAL)
        const expectedFromS0 = expectedAmount.sub(tokenHere).sub(debt1)
        await pool.connect(user1.signer).withdraw(withdrawAmount)
        const debt0After = (await pool.strategy(strategies[0].instance.address)).totalDebt
        const actualWithdrawFromS0 = debt0Before.sub(debt0After)
        debt1 = (await pool.strategy(strategies[1].instance.address)).totalDebt
        tokenHere = await pool.tokensHere()
        expect(actualWithdrawFromS0).to.be.eq(expectedFromS0, 'Withdraw from Strategy 2 is wrong')
        expect(debt1).to.be.eq(0, 'Withdraw from Strategy 2 is wrong')
      })
    })

    describe(`${poolName}: total debt`, function () {
      it('Total of debt should not be more than total debt given to all strategy', async function () {
        // TODO:
      })

      it('Should decrease total debt of each strategy and withdraw from strategies', async function () {
        // TODO:
      })
    })
  })
}

module.exports = {shouldBehaveLikeMultiPool}
