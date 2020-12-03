# Udacity Blockchain Capstone

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

## How to interact with code

+ To test the code

1. Run command `npm install`
2. Run `truffle test`

+ To deploy to rinkeby network

1. Create a *.env* file in *eth-contracts* folder
2. Add `RINKEBY_INFURA_URL` and `MNEMONIC` params in the *.env* file
3. Run `npm install`
4. Run `truffle test --network rinkeby` 

## Contracts

ERC-721 Contract address can be found on rinkeby network at `0x140f76964f8b52a1a22896B8650949ad52378584`

More info: https://rinkeby.etherscan.io/address/0x140f76964f8b52a1a22896b8650949ad52378584 

Verifier address can be found at: https://rinkeby.etherscan.io/address/0xbDc967202e9d1F88a09426F781531fDe41DB4195 

## OpenSea Storefront

https://testnets.opensea.io/collection/unidentified-contract-9nrwflsucn 

Token 5 'Floating House' has been sold on OpenSea and the transaction can be found here: https://rinkeby.etherscan.io/tx/0x204af368d4f0bd1a4c714315c41d0b7646070f96ea4781deff1184c1ea591565 

Token 0 'Luxury Condo' is currently listed for sale.

## Generate tokens with Zokrates 

Run the following commants in the terminal:

1. `docker run -v <path to your project folder-zokrates/code>:/home/zokrates/code -ti zokrates/zokrates /bin/bash`
2. `/path/to/zokrates compute-witness -a <a> <b>`
3. `/path/to/zokrates generate-proof`

A new *proof.json* file will be generated with which you can call the contract method `addSolution` after which `mintToken`.

(Examples can also be found in the tests)

## Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
