let TucutiERC721 = artifacts.require('TucutiERC721');
const truffleAssert = require('truffle-assertions');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const totalSupply = 5;
    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            contractERC721 = await TucutiERC721.new({from: account_one});
        
            // TODO: mint multiple tokens
            for(let i = 0; i < totalSupply; i++) {
                await contractERC721.mint(i % 2 == 1 ? account_one : account_two, i, {from: account_one});
            }
        
        })

        it('should return total supply', async function () { 
            assert.equal(await contractERC721.totalSupply(), totalSupply, "Total supply does not match");
        })

        it('should get token balance', async function () { 
            assert.equal(await contractERC721.balanceOf(account_two), 3, "Account 2 does not have the right amount of tokens");
            assert.equal(await contractERC721.balanceOf(account_one), 2, "Account 1 does not have the right amount of tokens");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            assert.equal(await contractERC721.tokenURI(1), "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token URI should contain full url path");
        })

        it('should transfer token from one owner to another', async function () { 
            await contractERC721.safeTransferFrom(account_one, account_two, 3, {from: account_one});

            assert.equal(await contractERC721.ownerOf(3), account_two, "Transfer has not been successful");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            contractERC721 = await TucutiERC721.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            const errLabel = "This method can only be called by the owner of the contract";
            
            await truffleAssert.fails(
                contractERC721.mint(account_two , 1, {from: account_two}),
                truffleAssert.ErrorType.REVERT,
                errLabel
            );         
        })

        it('should return contract owner', async function () { 
            assert.equal(await contractERC721.getOwner(), account_one, "Owner not who is expected");
        })

    });
})