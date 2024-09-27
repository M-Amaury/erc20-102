<<<<<<< HEAD
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

async function main() {
    // Validate environment variables
    if (!process.env.ARB_SEPOLIA_URL || !process.env.SEPOLIA_PRIVATE_KEY) {
        throw new Error("Please set your .env variables (SEPOLIA_RPC_URL, SEPOLIA_PRIVATE_KEY)");
    }

    // Initialize provider and wallet
    const provider = new ethers.providers.JsonRpcProvider(process.env.ARB_SEPOLIA_URL);
    const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);
=======
import { ethers } from "hardhat";

async function main() {
    // Deploying ERC20 TD Token
    console.log("Deploying ERC20 TD Token");
    const ERC20TD = await ethers.getContractFactory("ERC20TD");
    const tdToken = await ERC20TD.deploy("TD-ERC20-101", "TD-ERC20-101", BigInt("0x108b2a2c28029094000000"));

    await tdToken.waitForDeployment();

    // Deploying ERC20 Claimable Token
    console.log("Deploying Claimable Token");
    const ERC20Claimable = await ethers.getContractFactory("ERC20Claimable");
    const claimableToken = await ERC20Claimable.deploy("ClaimableToken", "CLTK", BigInt("0x108b2a2c28029094000000"));

    await claimableToken.waitForDeployment();
>>>>>>> 4a53aaa78be0bc3bed6d145aa3bcd3e15bc475a8

    // Replace with the actual address of the teacher's ERC20 contract
    const teacherERC20Address = "0x5ADeBf74a71360Be295534274041ceeD6A39977a";

<<<<<<< HEAD
    // Load the ABI and bytecode from the JSON file
    const contractPath = path.join(__dirname, "../artifacts/contracts/ExerciseSolution.sol/ExerciseSolution.json");
    const contractJSON = JSON.parse(fs.readFileSync(contractPath, "utf-8"));
=======
    await evaluator.waitForDeployment();

    // Setting Permissions for the Evaluator
    console.log("Setting Permissions for Evaluator");
    await tdToken.setTeacher((evaluator as any).target, true);
>>>>>>> 4a53aaa78be0bc3bed6d145aa3bcd3e15bc475a8

    const exerciseSolutionABI = contractJSON.abi;
    const exerciseSolutionBytecode = contractJSON.bytecode;

    // Create a ContractFactory for deploying
    const exerciseSolutionFactory = new ethers.ContractFactory(
        exerciseSolutionABI,
        exerciseSolutionBytecode,
        wallet
    );

    // Deploy the contract
    const exerciseSolutionContract = await exerciseSolutionFactory.deploy(teacherERC20Address);

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