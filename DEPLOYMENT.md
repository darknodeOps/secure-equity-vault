# Vercel Deployment Guide for Secure Equity Vault

This guide provides step-by-step instructions for deploying the Secure Equity Vault application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository access
- Environment variables ready

## Step-by-Step Deployment

### 1. Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### 2. Import GitHub Repository

1. In the "Import Git Repository" section, find `darknodeOps/secure-equity-vault`
2. Click "Import" next to the repository
3. Vercel will automatically detect it's a Vite project

### 3. Configure Project Settings

1. **Project Name**: `secure-equity-vault` (or your preferred name)
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### 4. Environment Variables Configuration

Click "Environment Variables" and add the following:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990

# Contract Configuration (Update after deployment)
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important**: 
- Add these variables for all environments (Production, Preview, Development)
- Update `VITE_CONTRACT_ADDRESS` after deploying your smart contracts

### 5. Advanced Configuration (Optional)

If you need custom build settings, create a `vercel.json` file in the root directory:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 6. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will provide you with a deployment URL

### 7. Custom Domain (Optional)

1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Post-Deployment Configuration

### 1. Update Contract Address

After deploying your smart contracts to Sepolia:

1. Go to Vercel project settings
2. Update the `VITE_CONTRACT_ADDRESS` environment variable
3. Redeploy the application

### 2. Verify Deployment

1. Visit your deployment URL
2. Test wallet connection
3. Verify all features work correctly
4. Check console for any errors

## Environment-Specific Deployments

### Production Environment
- Use main branch
- Set all environment variables
- Enable analytics if needed

### Preview Environment
- Automatically created for pull requests
- Uses same environment variables as production
- Perfect for testing before merging

### Development Environment
- For local development
- Can use different RPC endpoints
- Separate contract addresses for testing

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID
   - Check RPC URL is accessible
   - Ensure contract address is correct

4. **404 Errors on Refresh**
   - Add `vercel.json` with rewrites configuration
   - Ensure SPA routing is properly configured

### Build Logs

Access build logs in Vercel dashboard:
1. Go to your project
2. Click on the deployment
3. View "Build Logs" tab

## Performance Optimization

### 1. Enable Edge Functions (Optional)
- For better global performance
- Reduced latency for API calls

### 2. Configure Caching
- Static assets are automatically cached
- API responses can be cached with headers

### 3. Monitor Performance
- Use Vercel Analytics
- Monitor Core Web Vitals
- Optimize bundle size

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Automatically enabled on Vercel
   - Custom domains get SSL certificates

3. **CORS Configuration**
   - Configure if making cross-origin requests
   - Whitelist necessary domains

## Monitoring and Analytics

### 1. Vercel Analytics
- Enable in project settings
- Monitor page views and performance
- Track user interactions

### 2. Error Tracking
- Integrate Sentry or similar service
- Monitor runtime errors
- Set up alerts for critical issues

## Backup and Recovery

1. **Code Backup**
   - Repository is automatically backed up on GitHub
   - Regular commits ensure code safety

2. **Environment Variables**
   - Export environment variables regularly
   - Keep backups of configuration

3. **Database Backup** (if applicable)
   - Set up automated backups
   - Test recovery procedures

## Cost Management

### Free Tier Limits
- 100GB bandwidth per month
- 100 serverless function executions
- 1 concurrent build

### Upgrade Considerations
- Monitor usage in dashboard
- Upgrade when approaching limits
- Consider Pro plan for production use

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Best Practices](https://create-react-app.dev/docs/deployment/)

## Next Steps

1. Set up monitoring and alerts
2. Configure custom domain
3. Set up CI/CD for automatic deployments
4. Implement error tracking
5. Set up performance monitoring

---

**Note**: This deployment guide assumes you have already deployed your smart contracts to the Sepolia testnet. Make sure to update the contract address in environment variables after deployment.
