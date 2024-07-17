## Packages Required:-
- Truffle 
- Ganache 
- Solidity 
- Node 
- Web3.js 
- npm

- ## Other Requirements:-
1. Any chromium based browser i.e. Chrome 
2. Metamask browser extension

-## To run Project 
1. Clone the project
```
git clone https://github.com/RITIK-SAINI23/Detection-of-counterfeit-product-using-blockchain-using-html-css-js-solidity.git
```
2. Go to the project folder, open terminal there and run following command to install required node_modules:-
```
npm install
```
3. Open Ganache, (to setup local blockchain)
    - crerate new workspace
    - add truffle-config.js  in truffle project 
    - change port to 7545 in server settings
  
4. In chrome, open metamask 
   - add new test network using  
        - NETWORK ID (i.e. 5777 ,from Ganache Server settings) 
        - RPC SERVER (i.e HTTP://127.0.0.1:8545 ,from Ganache Server settings)
        - CHAIN CODE (i.e. 1337)
   - import account using private key of any account from local blockchain available in Ganache.
  
5. You can use below link for deployment of smart contract and can also connect metamask to
   Remix instead of ganache but i have use ganche for my local blockchain testnet and remix only for
    deploment of smart contract and getting the contract address and pasting it in my product.js in contractAdresss
   and u also need ContractABI for the smart contract it is also in the product.js
```
https://remix.ethereum.org/
```

