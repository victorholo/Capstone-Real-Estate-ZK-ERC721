// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let SquareVerifier = artifacts.require('SquareVerifier');

const truffleAssert = require('truffle-assertions');
const { proof, inputs } = require('../../zokrates/code/square/proof.json');

contract('TestSolnSquareVerifier', accounts => {

    const owner = accounts[0];

    describe('SolnSquareVerifier tests', () => {

        before(async () => {
            squareVerifier = await SquareVerifier.new({from: owner})
            contract = await SolnSquareVerifier.new(squareVerifier.address, {from: owner});
        });

        it('Can add a solution to the contract', async () => {
            let result = await contract.addSolution(proof.a, proof.b, proof.c, inputs, {from: owner});

            truffleAssert.eventEmitted(result, 'SolutionAdded', (ev) => {
                return String(ev.index) === '0' && ev.solAddress === owner;
            });
        });

        it('Can mint a token based on a solution', async () => {
            let result = await contract.mintToken(inputs, owner, {from: owner});

            truffleAssert.eventEmitted(result, 'Transfer', (ev) => {
                return String(ev.tokenId) === '0' && ev.to === owner;
            });
        })
    })
});