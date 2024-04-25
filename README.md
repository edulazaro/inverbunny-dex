# ERC Token Exchange

An ERC20 token exchange integrated with MetaMask, developed with Truffle, Solidity and React.

The exchange runs with the stablecoin DAI as the main currency for the trades, allowing to deposit and get back tokens, as well as to create both limit and market orders. Some ERC20 tokens are included by default, but real tokens should be added when deployed on the testnet or on the mainnet.

# Running

Make sure you have Truffle installed globally on your system. Then access the aconsole:

```
truffle console
```

Then run the migrations of the Solidity and start with some data on the blockchain, run this command:

```
truffle migrate --reset
```

Then access the `client` folder, and start the development server:

```
npm run dev
```