import Web3 from "web3";
import Dex from "./contracts/Dex.json";
import ERC20Abi from "./ERC20Abi.json";
import detectEthereumProvider from "@metamask/detect-provider";

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    detectEthereumProvider()
      .then((provider) => {
        if (!provider) {
          if (process.env.REACT_APP_WEB3_PROVIDER !== "undefined") {
            try {
              resolve(new Web3(process.env.REACT_APP_WEB3_PROVIDER));
            } catch (error) {
              reject(error);
            }
          } else {
            reject("You should install Metamask");
          }
          return;
        }

        provider
          .request({ method: "eth_requestAccounts" })
          .then(() => {
            try {
              resolve(new Web3(window.ethereum));
            } catch (error) {
              reject(error);
            }
          })
          .catch(reject); // Handle errors from eth_requestAccounts
      })
      .catch(reject); // Handle errors from detectEthereumProvider
  });
};

const getContracts = async (web3) => {
  try {
    const networkId = await web3.eth.net.getId();

    const deployedNetwork = Dex.networks[networkId];

    if (!deployedNetwork || ! Dex.networks[networkId].address) {
      throw new Error(
        `No deployed contract found on network with ID ${networkId}`
      );
    }

    console.log(`Using contract address: ${deployedNetwork.address}`); // Debug log

    const dex = new web3.eth.Contract(
      Dex.abi,
      deployedNetwork && deployedNetwork.address
    );
    const tokens = await dex.methods.getTokens().call();
    const tokenContracts = tokens.reduce(
      (acc, token) => ({
        ...acc,
        [web3.utils.hexToUtf8(token.ticker)]: new web3.eth.Contract(
          ERC20Abi,
          token.tokenAddress
        ),
      }),
      {}
    );
    return { dex, ...tokenContracts };
  } catch (error) {
    console.error("Error in getContracts:", error);
    throw error; // Re-throw the error to be handled by caller
  }
};

export { getWeb3, getContracts };
