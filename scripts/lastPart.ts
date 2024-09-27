import { ethers } from "hardhat";

async function main() {

  // Adresses des contrats déployés
  const teacherERC20Address = "0x5ADeBf74a71360Be295534274041ceeD6A39977a";
  const exerciseSolutionAddress = "0x3be3020438835C45dB4035777B1022ac385b665B";
  const evaluatorAddress = "0xD05c425C843c327c90D2Db98Aba9B715BAA51736";

  // Obtenir les instances des contrats
  const teacherERC20 = await ethers.getContractAt("ERC20Claimable", teacherERC20Address);
  const exerciseSolution = await ethers.getContractAt("ExerciseSolution", exerciseSolutionAddress);
  const evaluator = await ethers.getContractAt("Evaluator", evaluatorAddress);

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });