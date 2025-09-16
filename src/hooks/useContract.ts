import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { config } from '../config/env';

// Contract ABI - This should match your deployed contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_assetType", "type": "string"},
      {"internalType": "bytes", "name": "_totalValue", "type": "bytes"},
      {"internalType": "bytes", "name": "_pricePerShare", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createAsset",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "assetId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "investInAsset",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes", "name": "_totalLiquidity", "type": "bytes"},
      {"internalType": "bytes", "name": "_interestRate", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "createLendingPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "collateralValue", "type": "bytes"},
      {"internalType": "uint256", "name": "term", "type": "uint256"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "borrowFromPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "assetId", "type": "uint256"}
    ],
    "name": "getAssetInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "assetType", "type": "string"},
      {"internalType": "uint8", "name": "totalValue", "type": "uint8"},
      {"internalType": "uint8", "name": "availableShares", "type": "uint8"},
      {"internalType": "uint8", "name": "pricePerShare", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "owner", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export function useContract() {
  const { address } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Create Asset with FHE encryption
  const createAsset = async (
    name: string,
    description: string,
    assetType: string,
    totalValue: number,
    pricePerShare: number
  ) => {
    try {
      // In a real implementation, you would encrypt these values using FHE
      // For now, we'll use placeholder encrypted data
      const encryptedTotalValue = new Uint8Array(32); // Placeholder for FHE encrypted value
      const encryptedPricePerShare = new Uint8Array(32); // Placeholder for FHE encrypted value
      const inputProof = new Uint8Array(64); // Placeholder for FHE proof

      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createAsset',
        args: [
          name,
          description,
          assetType,
          encryptedTotalValue,
          encryptedPricePerShare,
          inputProof
        ],
      });
    } catch (err) {
      console.error('Error creating asset:', err);
      throw err;
    }
  };

  // Invest in Asset with FHE encryption
  const investInAsset = async (
    assetId: number,
    amount: number
  ) => {
    try {
      // Encrypt the investment amount using FHE
      const encryptedAmount = new Uint8Array(32); // Placeholder for FHE encrypted value
      const inputProof = new Uint8Array(64); // Placeholder for FHE proof

      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'investInAsset',
        args: [
          BigInt(assetId),
          encryptedAmount,
          inputProof
        ],
        value: BigInt(amount * 1e18), // Convert to wei
      });
    } catch (err) {
      console.error('Error investing in asset:', err);
      throw err;
    }
  };

  // Create Lending Pool with FHE encryption
  const createLendingPool = async (
    totalLiquidity: number,
    interestRate: number
  ) => {
    try {
      // Encrypt the liquidity and interest rate using FHE
      const encryptedLiquidity = new Uint8Array(32); // Placeholder for FHE encrypted value
      const encryptedInterestRate = new Uint8Array(32); // Placeholder for FHE encrypted value
      const inputProof = new Uint8Array(64); // Placeholder for FHE proof

      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createLendingPool',
        args: [
          encryptedLiquidity,
          encryptedInterestRate,
          inputProof
        ],
      });
    } catch (err) {
      console.error('Error creating lending pool:', err);
      throw err;
    }
  };

  // Borrow from Pool with FHE encryption
  const borrowFromPool = async (
    poolId: number,
    amount: number,
    collateralValue: number,
    term: number
  ) => {
    try {
      // Encrypt the loan amount and collateral value using FHE
      const encryptedAmount = new Uint8Array(32); // Placeholder for FHE encrypted value
      const encryptedCollateralValue = new Uint8Array(32); // Placeholder for FHE encrypted value
      const inputProof = new Uint8Array(64); // Placeholder for FHE proof

      await writeContract({
        address: config.contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'borrowFromPool',
        args: [
          BigInt(poolId),
          encryptedAmount,
          encryptedCollateralValue,
          BigInt(term),
          inputProof
        ],
      });
    } catch (err) {
      console.error('Error borrowing from pool:', err);
      throw err;
    }
  };

  return {
    createAsset,
    investInAsset,
    createLendingPool,
    borrowFromPool,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
  };
}
