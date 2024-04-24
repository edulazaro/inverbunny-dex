const { expectRevert } = require('@openzeppelin/test-helpers');
const Dai = artifacts.require('mocks/Dai.sol');
const Bat = artifacts.require('mocks/Bat.sol');
const Rep = artifacts.require('mocks/Rep.sol');
const Zrx = artifacts.require('mocks/Zrx.sol');
const Dex = artifacts.require('Dex.sol');

contract('Dex', (accounts) => {
    let dai, bat, rep, zrx, dex;

    const [trader1, trader2] = [accounts[1], accounts[2]];

    const [DAI, BAT, REP, ZRX] = ['DAI', 'BAT', 'REP', 'ZRX'].map(
        ticker =>  web3.utils.fromAscii(ticker)
    );

    beforeEach(async() => {

        [dai, bat, rep, zrx] = await Promise.all([
            Dai.new(),
            Bat.new(),
            Rep.new(),
            Zrx.new(),
        ]);

        dex = await Dex.new();

        await Promise.all([
            dex.addToken(DAI, dai.address),
            dex.addToken(BAT, bat.address),
            dex.addToken(REP, rep.address),
            dex.addToken(ZRX, zrx.address)
        ]);

        const amount = web3.utils.toWei('1000');

        const seedTokenBalance = async (token, trader) => {
            try {
                await token.faucet(trader, amount);
                await token.approve(
                    dex.address,
                    amount,
                    {from: trader}
                );
            } catch (error) {
                console.error(`Error seeding token balance: ${error.message}`);
            }
        }

        for (const token of [dai, bat, rep, zrx]) {
            await seedTokenBalance(token, trader1);
        }

        for (const token of [dai, bat, rep, zrx]) {
            await seedTokenBalance(token, trader2);
        }

        /*
        await Promise.all(
            [dai, bat, rep, zrx].map(
                token => seedTokenBalance(token, trader1)
            )
        );

        await Promise.all(
            [dai, bat, rep, zrx].map(
                token => seedTokenBalance(token, trader2)
            )
        );
        */
    });

    it('should deposit tokens', async () => {
        const amount = web3.utils.toWei('100');
    
        // Check if the contract and tokens are set up correctly
        console.log('Contract address:', dex.address);
        console.log('DAI address:', dai.address);
    
        await dex.deposit(
          amount,
          DAI,
          {from: trader1}
        );
    
        const balance = await dex.traderBalances(trader1, DAI);
        assert(balance.toString() === amount, "Balance should match the deposited amount");
    });

    it('should NOT deposit tokens if token does not exist', async () => {
        await expectRevert(
          dex.deposit(
            web3.utils.toWei('100'),
            web3.utils.fromAscii('TOKEN-DOES-NOT-EXIST'),
            {from: trader1}
          ),
          'this token does not exist'
        );
    });
});