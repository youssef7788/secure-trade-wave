# Vercel Deployment Guide for Secure Trade Wave

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Process

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on "New Project" or "Import Project"
3. Connect your GitHub account if not already connected
4. Select the repository: `youssef7788/secure-trade-wave`

### Step 2: Configure Project Settings

1. **Framework Preset**: Select "Vite" from the dropdown
2. **Root Directory**: Leave as default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in the Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

**How to add environment variables:**
1. In your Vercel project dashboard, go to "Settings"
2. Click on "Environment Variables"
3. Add each variable with the values above
4. Make sure to set them for "Production", "Preview", and "Development"

### Step 4: Build Configuration

Create a `vercel.json` file in your project root (if not already present):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete
3. Your application will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### 1. Verify Environment Variables

Check that all environment variables are properly set:
- Chain ID: 11155111 (Sepolia)
- RPC URL: Configured for Sepolia testnet
- Wallet Connect: Project ID configured

### 2. Test Wallet Connection

1. Open your deployed application
2. Click "Connect Wallet" button
3. Test with MetaMask or other supported wallets
4. Ensure connection works on Sepolia testnet

### 3. Smart Contract Deployment

To deploy the smart contracts:

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Deploy to Sepolia (requires private key in .env)
npm run deploy
```

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that all dependencies are in package.json
   - Ensure TypeScript compilation passes
   - Verify environment variables are set

2. **Wallet Connection Issues**:
   - Verify Wallet Connect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches Sepolia (11155111)

3. **Environment Variables**:
   - Double-check all variables are set in Vercel dashboard
   - Ensure no typos in variable names
   - Verify values are correct

### Build Optimization:

1. **Bundle Size**: The application uses code splitting for optimal performance
2. **Dependencies**: All required packages are included in package.json
3. **Assets**: Images and icons are optimized for web delivery

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings for performance monitoring
2. **Error Tracking**: Consider adding Sentry or similar service
3. **Performance**: Monitor Core Web Vitals in Vercel dashboard

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **HTTPS**: Vercel automatically provides SSL certificates
3. **CORS**: Configured for secure cross-origin requests
4. **Wallet Security**: Users are responsible for wallet security

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Repository**: [github.com/youssef7788/secure-trade-wave](https://github.com/youssef7788/secure-trade-wave)
- **Project Issues**: Use GitHub Issues for bug reports

## Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Build command set to `npm run build`
- [ ] Output directory set to `dist`
- [ ] Framework preset set to "Vite"
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Wallet connection tested
- [ ] Smart contracts deployed (if needed)
- [ ] Performance monitoring enabled

## Next Steps After Deployment

1. **Test All Features**: Verify all application functionality works
2. **User Testing**: Conduct thorough testing with different wallets
3. **Documentation**: Update any deployment-specific documentation
4. **Monitoring**: Set up alerts for any issues
5. **Backup**: Ensure code is properly backed up in GitHub

Your Secure Trade Wave application should now be live and accessible via the Vercel URL!
