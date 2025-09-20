import { ethers } from "hardhat";

async function main() {
  console.log("Deploying SecureTradeWave contract...");

  // Get the contract factory
  const SecureTradeWave = await ethers.getContractFactory("SecureTradeWave");
  
  // Deploy the contract with a verifier address (you can change this)
  const verifierAddress = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"; // Example verifier address
  const secureTradeWave = await SecureTradeWave.deploy(verifierAddress);

  await secureTradeWave.waitForDeployment();

  const contractAddress = await secureTradeWave.getAddress();
  console.log("SecureTradeWave deployed to:", contractAddress);
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    verifierAddress,
    deploymentTime: new Date().toISOString(),
    network: "sepolia"
  };
  
  console.log("Deployment info:", JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
