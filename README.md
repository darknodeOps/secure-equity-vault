# Secure Equity Vault

A privacy-first asset management platform built with Fully Homomorphic Encryption (FHE) for secure and confidential equity trading, lending, and portfolio management.

## Features

- **FHE-Encrypted Asset Management**: All sensitive financial data is encrypted using fully homomorphic encryption
- **Secure Lending Pools**: Create and participate in lending pools with encrypted valuations
- **Private Portfolio Tracking**: Monitor your investments and loans with complete privacy
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, and other popular wallets
- **Real-time Analytics**: View market trends and portfolio performance without exposing sensitive data

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia testnet)
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Encryption**: Zama FHEVM for fully homomorphic encryption
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/darknodeOps/secure-equity-vault.git
cd secure-equity-vault
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Contract Configuration
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
```

## Smart Contract Deployment

The smart contracts use Zama's FHEVM for fully homomorphic encryption. Deploy to Sepolia testnet:

```bash
# Install Hardhat dependencies
npm install --save-dev @fhevm/solidity hardhat

# Deploy contracts
npx hardhat run scripts/deploy.js --network sepolia
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── WalletConnect.tsx
├── config/             # Configuration files
│   ├── env.ts         # Environment variables
│   └── wagmi.ts       # Wallet configuration
├── pages/              # Page components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions

contracts/
└── SecureEquityVault.sol  # Main smart contract
```

## Security Features

- **FHE Encryption**: All financial data is encrypted using fully homomorphic encryption
- **Private Transactions**: Asset values and portfolio data remain confidential
- **Secure Lending**: Collateral ratios and loan amounts are encrypted
- **Reputation System**: User reputation scores are encrypted and privacy-preserving

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Integration with more DeFi protocols
- [ ] Enhanced privacy features
