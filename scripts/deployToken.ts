const { ethers } = require("ethers");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

async function main() {
    // Validate environment variables
    if (!process.env.ARB_SEPOLIA_URL || !process.env.SEPOLIA_PRIVATE_KEY) {
        throw new Error("Please set your .env variables (ARB_SEPOLIA_URL, SEPOLIA_PRIVATE_KEY)");
    }

    // Initialize provider and wallet
    const provider = new ethers.providers.JsonRpcProvider(process.env.ARB_SEPOLIA_URL);
    const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);


    const contractPath1 = path.join(__dirname, "../artifacts/contracts/ExerciseSolutionToken.sol/ExerciseSolutionToken.json");
    const contractJSON1 = JSON.parse(fs.readFileSync(contractPath1, "utf-8"));

    const exerciseSolutionTokenABI = contractJSON1.abi;
    const exerciseSolutionTokenBytecode = contractJSON1.bytecode;

    // Create a ContractFactory for deploying
    const exerciseSolutionFactory = new ethers.ContractFactory(
        exerciseSolutionTokenABI,
        exerciseSolutionTokenBytecode,
        wallet
    );

    // Deploy the contract
    console.log("Deploying contract...");
    const gasLimit = 3000000; // Increase the gas limit as needed
    const tx = {
        gasLimit: gasLimit, // Set the gas limit
    };
    const exerciseSolutionContract = await exerciseSolutionFactory.deploy();

    // Wait for deployment to complete
    await exerciseSolutionContract.deployed();

    console.log("ExerciseSolution deployed to:", exerciseSolutionContract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error deploying contract:", error);
        process.exit(1);
    });