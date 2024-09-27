import { ethers } from "hardhat";

async function main() {
	const [deployer] = await ethers.getSigners();

	// Adresses des contrats déployés
	const teacherERC20Address = "0x5ADeBf74a71360Be295534274041ceeD6A39977a";
	const exerciseSolutionAddress = "0x3be3020438835C45dB4035777B1022ac385b665B";
	const evaluatorAddress = "0xD05c425C843c327c90D2Db98Aba9B715BAA51736";

	// Obtenir les instances des contrats
	const teacherERC20 = await ethers.getContractAt("ERC20Claimable", teacherERC20Address);
	const exerciseSolution = await ethers.getContractAt("ExerciseSolution", exerciseSolutionAddress);
	const evaluator = await ethers.getContractAt("Evaluator", evaluatorAddress);

	// Obtenir l'adresse du ExerciseSolutionToken
	const exerciseSolutionTokenAddress = await exerciseSolution.getERC20DepositAddress();
	const exerciseSolutionToken = await ethers.getContractAt("ExerciseSolutionToken", exerciseSolutionTokenAddress);

	// Ex7: Vérifier la création de l'ERC20
	await evaluator.ex7_createERC20();
	console.log("Ex7 completed");

	// Ex8: Déposer et minter
	const amountToDeposit = ethers.parseEther("0.2");
	await teacherERC20.approve(exerciseSolutionAddress, amountToDeposit);
	await exerciseSolution.depositTokens(amountToDeposit);
	await evaluator.ex8_depositAndMint();
	console.log("Ex8 completed");

	// Ex9: Retirer et brûler
	const amountToWithdraw = ethers.parseEther("0.1");
	await exerciseSolutionToken.approve(exerciseSolutionAddress, amountToWithdraw);
	await exerciseSolution.withdrawTokens(amountToWithdraw);
	await evaluator.ex9_withdrawAndBurn();
	console.log("Ex9 completed");

	console.log("Toutes les opérations ont été effectuées avec succès");
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});