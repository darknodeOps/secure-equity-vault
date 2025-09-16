const { ethers } = require("hardhat");

async function main() {
  console.log("Starting deployment of SecureEquityVault contract...");

  // Get the contract factory
  const SecureEquityVault = await ethers.getContractFactory("SecureEquityVault");

  // Deploy the contract
  // Note: You'll need to provide verifier and oracle addresses
  const verifierAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  const oracleAddress = "0x0000000000000000000000000000000000000000"; // Replace with actual oracle address

  console.log("Deploying contract with verifier:", verifierAddress);
  console.log("Deploying contract with oracle:", oracleAddress);

  const secureEquityVault = await SecureEquityVault.deploy(verifierAddress, oracleAddress);

  await secureEquityVault.waitForDeployment();

  const contractAddress = await secureEquityVault.getAddress();

  console.log("SecureEquityVault deployed to:", contractAddress);
  console.log("Contract address:", contractAddress);

  // Verify the deployment
  console.log("Verifying deployment...");
  const owner = await secureEquityVault.owner();
  const verifier = await secureEquityVault.verifier();
  const oracle = await secureEquityVault.oracle();

  console.log("Contract owner:", owner);
  console.log("Contract verifier:", verifier);
  console.log("Contract oracle:", oracle);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    owner: owner,
    verifier: verifier,
    oracle: oracle,
    deploymentTime: new Date().toISOString(),
    network: await ethers.provider.getNetwork(),
  };

  console.log("\n=== Deployment Summary ===");
  console.log("Contract Address:", contractAddress);
  console.log("Owner:", owner);
  console.log("Verifier:", verifier);
  console.log("Oracle:", oracle);
  console.log("Deployment Time:", deploymentInfo.deploymentTime);
  console.log("Network:", deploymentInfo.network.name, "Chain ID:", deploymentInfo.network.chainId);

  console.log("\n=== Next Steps ===");
  console.log("1. Update your frontend environment variables with the contract address:");
  console.log(`   VITE_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("2. Update verifier and oracle addresses in the contract if needed");
  console.log("3. Test the contract functions");
  console.log("4. Deploy to production network when ready");

  return deploymentInfo;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
