import { jsx, jsxFrag, load } from "@betarost/cemserver/cem.js";
import { MetaMaskSDK } from '@metamask/sdk';
import Web3 from 'web3';
// import { ethers } from 'ethers'

import svg from "@assets/svg/index.js";
import images from "@assets/images/index.js";

const sdk = new MetaMaskSDK({
  // shouldShimWeb3: false,
  // showQRCode: true,
});

function getDataFieldValue(tokenRecipientAddress, tokenAmount) {
  const web3 = new Web3();
  const TRANSFER_FUNCTION_ABI = { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" };
  return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
    tokenRecipientAddress,
    tokenAmount
  ]);
}

const start = function (data, ID) {
  load({
    ID,
    fn: () => {
      return (
        <div class="wrapper">
          <div class="main-inner">
            <div class="error">
              <div class="circle1"></div>
              <div class="circle2"></div>
              <img class="left polygon" src={svg.honeycombL}></img>
              <img class="right polygon" src={svg.honeycombR}></img>
              <div class="title-error">
                <h2>Page not found</h2>
                <h1 class="mb-25">Error 404</h1>
                <a
                  // href="/"
                  class="btn btn-green"
                  onclick={async (e) => {
                    fn.siteLink(e);
                    return
                    // const provider = new ethers.providers.Web3Provider(window.ethereum);
                    // const signer = provider.getSigner();

                    // const provider = new Web3(window.ethereum);
                    // const signer = provider.getSigner();

                    // console.log('=b18825=', provider)

                    // if (window.ethereum) {
                    //   const web3 = new Web3(window.ethereum);
                    //   try {
                    //     // Request account access if needed
                    //     await window.ethereum.enable();
                    //     // Accounts now exposed
                    //     return web3;
                    //   } catch (error) {
                    //     console.error(error);
                    //   }
                    // }
                    // // Legacy dapp browsers...
                    // else if (window.web3) {
                    //   // Use MetaMask/Mist's provider.
                    //   const web3 = window.web3;
                    //   console.log('Injected web3 detected.');
                    //   return web3;
                    // }
                    // // Fallback to localhost; use dev console port by default...
                    // else {
                    //   const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
                    //   const web3 = new Web3(provider);
                    //   console.log('No web3 instance injected, using Local web3.');
                    //   return web3;
                    // }

                    // if (window.ethereum) {
                    //   console.log('=a2a81e=', "Найден")
                    const ethereum = sdk.getProvider();
                    const accounts = await ethereum.request({
                      method: 'eth_requestAccounts',
                      params: [],
                    });

                    console.log('request accounts', sdk.Contract, ethereum.Contract);
                    console.log('=bef742=', window.ethereum)
                    window.web3 = new Web3(window.ethereum)
                    const abiJson = [
                      { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
                    ];
                    let tmp = await new window.web3.eth.Contract(abiJson, "0x55d398326f99059fF775485246999027B3197955");
                    // const balanceBnb = await tmp.methods.balanceOf('0xE7ac7f5fD08bF436d510a34d22bc2abD3a125681').call();
                    // console.log('=9fbfcb=', balanceBnb)
                    tmp.methods.transfer(
                      "0x64DF6512F3C2Ca9104727b9b45939F2c91BdA1e8", '0x' + (3.3 * 1e18).toString(16)).send({ from: accounts[0] })
                      .then((res) => {
                        console.log(res);
                      })
                    return
                    // const transactionParameters = {
                    //   from: accounts[0],
                    //   to: '0x55d398326f99059fF775485246999027B3197955',
                    //   data: getDataFieldValue("0x353d097B463e266d01eFf5bBE2fD558509247076", 1),
                    // };
                    // await ethereum.request({
                    //   method: 'eth_sendTransaction',
                    //   params: [transactionParameters],
                    // });
                    // return
                    //data parameter: '0xa9059cbb'. Receiving address processed. Transaction amount processed
                    //Processing receiving address: remove 0x from the address, and then add 0 to 64 bits in front
                    //Transaction amount processed: The transaction amount is converted to hexadecimal, if 0x is removed, 0x is omitted, and 0x is omitted, and then 0 to 64 bits are added in the front   

                    ethereum
                      .request({
                        method: 'eth_sendTransaction',
                        params: [
                          {
                            from: accounts[0],
                            // to: '0xE7ac7f5fD08bF436d510a34d22bc2abD3a125681',
                            // to: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
                            to: '0x55d398326f99059fF775485246999027B3197955',
                            value: '0x' + (0.1 * 1e18).toString(16),
                            // data: '0xa9059cbb000000000000000000000000604698770Ba3bd2a71E81f8d749f261cAe5106c500000000000000000000000000000000000000000000000000000000000f4240',
                            // data: '0xa9059cbb000000000000000000000000353d097b463e266d01eff5bbe2fd5585092470760000000000000000000000000000000000000000000000000de0b6b3a7640000',

                            gas: '0x' + (21000).toString(16),
                          },
                        ],
                      })
                      .then((txHash) => console.log(txHash))
                      .catch((error) => console.error(error));

                    //   console.log('request accounts', accounts);
                    // } else {
                    //   console.log('=a2a81e=', "Метамаск  не найден")
                    // }

                  }}
                >
                  MAIN PAGE
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
};

export default start;
