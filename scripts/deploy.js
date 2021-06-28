const hre = require("hardhat");

async function main() {
 
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account address: ", deployer.address)

  // We get the contract to deploy
  const LearnToken = await hre.ethers.getContractFactory("LearnToken");
  const learnToken = await LearnToken.deploy("LearnToken", "LRN");

  await learnToken.deployed();

  console.log("LearnToken deployed to:", learnToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
