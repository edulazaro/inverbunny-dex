import Web3 from 'web3';
import Dex from './contracts/Dex.json';
import ERC20Abi from './ERC20Abi.json';
import detectEthereumProvider from '@metamask/detect-provider';

const getWeb3 = () => {
    return new Promise((resolve, reject) => {
      detectEthereumProvider().then(provider => {
        if (!provider) {
          if (process.env.REACT_APP_WEB3_PROVIDER !== 'undefined') {
            try {
              resolve(new Web3(process.env.REACT_APP_WEB3_PROVIDER));
            } catch (error) {
              reject(error);
            }
          } else {
            reject('You should install Metamask');
          }
          return;
        }
  
        provider.request({ method: 'eth_requestAccounts' }).then(() => {
          try {
            resolve(new Web3(window.ethereum));
          } catch (error) {
            reject(error);
          }
        }).catch(reject);  // Handle errors from eth_requestAccounts
      }).catch(reject);  // Handle errors from detectEthereumProvider
    });
  }

const getContracts = async web3 => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Dex.networks[networkId];
  const dex = new web3.eth.Contract(
    Dex.abi,
    deployedNetwork && deployedNetwork.address,
  );
  const tokens = await dex.methods.getTokens().call();
  const tokenContracts = tokens.reduce((acc, token) => ({
    ...acc,
    [web3.utils.hexToUtf8(token.ticker)]: new web3.eth.Contract(
      ERC20Abi,
      token.tokenAddress
    )
  }), {});
  return { dex, ...tokenContracts };
}

export { getWeb3, getContracts };