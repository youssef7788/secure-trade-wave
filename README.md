# Secure Trade Wave

A confidential global trade settlement platform built with FHE (Fully Homomorphic Encryption) technology for secure letters of credit and invoice validation.

## Features

- **Confidential Trade Finance**: Secure and private trade document processing
- **FHE-Encrypted Data**: All sensitive trade data is encrypted using fully homomorphic encryption
- **Smart Contract Integration**: Blockchain-based verification and settlement
- **Multi-Wallet Support**: Connect with various Web3 wallets via RainbowKit
- **Real-time Validation**: Instant document verification and trade status updates

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3 Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/youssef7788/secure-trade-wave.git
cd secure-trade-wave
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Environment Variables

Create a `.env` file with the following variables:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Application pages
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
└── assets/             # Static assets
```

## Smart Contracts

The platform includes FHE-enabled smart contracts for:
- Secure document storage
- Encrypted trade data processing
- Confidential settlement verification
- Privacy-preserving audit trails

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Security

This platform implements state-of-the-art FHE encryption to ensure:
- Complete data privacy
- Zero-knowledge verification
- Secure multi-party computation
- Confidential trade processing

## Support

For support and questions, please open an issue in the GitHub repository.