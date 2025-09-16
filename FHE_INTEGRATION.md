# FHE Integration Guide

This document explains how to use the Fully Homomorphic Encryption (FHE) features in the Secure Equity Vault application.

## Overview

The application implements FHE encryption to protect sensitive financial data while still allowing computations on encrypted data. This ensures privacy while maintaining functionality.

## Features

### 1. FHE Encryption/Decryption
- Encrypt sensitive financial data (amounts, values, etc.)
- Decrypt data for off-chain processing
- Maintain data privacy during blockchain transactions

### 2. Homomorphic Operations
- Add encrypted values without decrypting
- Multiply encrypted values by plain numbers
- Compare encrypted values
- Generate and verify zero-knowledge proofs

### 3. Smart Contract Integration
- Submit encrypted data to blockchain
- Create assets with encrypted valuations
- Invest with encrypted amounts
- Borrow with encrypted collateral values

## Usage

### Basic Encryption/Decryption

```typescript
import { fheEncryption } from '@/lib/fhe';

// Initialize FHE system
await fheEncryption.initialize();

// Encrypt a value
const encryptedData = await fheEncryption.encryptNumber(1000);

// Decrypt the value
const decryptedValue = await fheEncryption.decryptNumber(encryptedData);
```

### Homomorphic Operations

```typescript
// Add two encrypted values
const sum = await fheEncryption.addEncrypted(encryptedA, encryptedB);

// Multiply encrypted value by plain number
const product = await fheEncryption.multiplyEncrypted(encryptedValue, 2);

// Compare encrypted values
const comparison = await fheEncryption.compareEncrypted(encryptedA, encryptedB);
```

### Contract Integration

```typescript
import { useContract } from '@/hooks/useContract';

const { createAsset, investInAsset } = useContract();

// Create asset with encrypted data
await createAsset(
  'Asset Name',
  'Description',
  'EQUITY',
  1000, // Total value
  10    // Price per share
);

// Invest with encrypted amount
await investInAsset(assetId, 100);
```

## Components

### EncryptedDataManager

The main component for managing encrypted data:

- **Input**: Enter a number to encrypt
- **Encrypt**: Encrypt the value using FHE
- **Decrypt**: Decrypt the value (for verification)
- **Create Asset**: Submit encrypted data to create a new asset
- **Invest**: Submit encrypted data for investment

### Features:
- Real-time encryption/decryption
- Visual display of encrypted data
- Integration with smart contracts
- Error handling and status messages
- Privacy controls (show/hide decrypted values)

## Smart Contract Functions

### Create Asset
```solidity
function createAsset(
    string memory _name,
    string memory _description,
    string memory _assetType,
    externalEuint32 _totalValue,
    externalEuint32 _pricePerShare,
    bytes calldata inputProof
) public returns (uint256)
```

### Invest in Asset
```solidity
function investInAsset(
    uint256 assetId,
    externalEuint32 amount,
    bytes calldata inputProof
) public payable returns (uint256)
```

### Create Lending Pool
```solidity
function createLendingPool(
    externalEuint32 _totalLiquidity,
    externalEuint32 _interestRate,
    bytes calldata inputProof
) public returns (uint256)
```

### Borrow from Pool
```solidity
function borrowFromPool(
    uint256 poolId,
    externalEuint32 amount,
    externalEuint32 collateralValue,
    uint256 term,
    bytes calldata inputProof
) public returns (uint256)
```

## Security Considerations

### Data Privacy
- All sensitive financial data is encrypted using FHE
- Data remains encrypted during blockchain transactions
- Only authorized parties can decrypt data

### Zero-Knowledge Proofs
- Proofs verify the validity of encrypted data
- No need to reveal the actual values
- Maintains privacy while ensuring correctness

### Access Control
- Only contract owner can verify assets
- Only verifier can update reputation
- Oracle provides external data validation

## Deployment

### 1. Deploy Smart Contract
```bash
# Compile contracts
npm run compile

# Deploy to Sepolia testnet
npm run deploy:sepolia
```

### 2. Update Environment Variables
```env
VITE_CONTRACT_ADDRESS=0x... # Your deployed contract address
```

### 3. Test Integration
- Connect wallet
- Use EncryptedDataManager component
- Test encryption/decryption
- Test contract interactions

## Development

### Adding New FHE Operations

1. Add method to `FHEEncryption` class
2. Update contract ABI if needed
3. Add UI components for new operations
4. Test with encrypted data

### Customizing Encryption

1. Modify `encryptNumber` method
2. Update `decryptNumber` method
3. Ensure homomorphic operations work correctly
4. Test with various data types

## Troubleshooting

### Common Issues

1. **FHE Initialization Failed**
   - Check browser compatibility
   - Ensure proper error handling
   - Verify FHE system requirements

2. **Contract Call Failed**
   - Check wallet connection
   - Verify contract address
   - Ensure sufficient gas

3. **Encryption/Decryption Errors**
   - Check input validation
   - Verify FHE system state
   - Handle errors gracefully

### Debug Mode

Enable debug logging:
```typescript
// In fhe.ts
console.log('FHE operation:', operation, 'Input:', input, 'Output:', output);
```

## Future Enhancements

- [ ] Real FHE implementation with Zama FHEVM
- [ ] Advanced homomorphic operations
- [ ] Batch encryption/decryption
- [ ] Performance optimizations
- [ ] Multi-party computation
- [ ] Advanced zero-knowledge proofs

## Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Fully Homomorphic Encryption Guide](https://en.wikipedia.org/wiki/Homomorphic_encryption)
- [Zero-Knowledge Proofs](https://z.cash/technology/zksnarks/)
- [Smart Contract Security](https://consensys.github.io/smart-contract-best-practices/)
