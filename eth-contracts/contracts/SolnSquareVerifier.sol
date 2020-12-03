pragma solidity ^0.5.17;

import "./ERC721Mintable.sol";
// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./SquareVerifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is TucutiERC721 {

    SquareVerifier private squareVerifier;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address solAddress;
    }

    // TODO define an array of the above struct
    Solution[] private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) submittedSolutions;

    constructor(address squareVerifierAddress) public {
        squareVerifier = SquareVerifier(squareVerifierAddress);
    }

    event SolutionAdded(uint256 index, address solAddress);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[2] calldata input
    ) external {
        bytes32 key = generateSolutionKey(input);
        require(submittedSolutions[key].solAddress == address(0), "Solution already submitted");

        bool isValid = squareVerifier.verifyTx(a, b, c, input);
        require(isValid, "Solution is not valid");

        //first solution will have a 0 index
        Solution memory solution = Solution({index: solutions.length, solAddress: msg.sender});

        solutions.push(solution);
        submittedSolutions[key] = solution;

        emit SolutionAdded(solution.index, solution.solAddress);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintToken(uint256[2] calldata input, address to) external {
        bytes32 key = generateSolutionKey(input);
        require(submittedSolutions[key].solAddress != address(0), "The solution does not exist");
        require(submittedSolutions[key].solAddress == msg.sender, "Sender is not the owner of the solution");
        require(!_exists(submittedSolutions[key].index), "Token already exists");
        super.mint(to, submittedSolutions[key].index);
    }

    function generateSolutionKey(uint256[2] memory input) internal pure returns(bytes32) {
        return keccak256(abi.encodePacked(input));
    }
}
