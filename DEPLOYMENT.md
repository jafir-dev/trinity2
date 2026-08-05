# Vercel Deployment Guide

This project has been prepared for deployment on Vercel. Follow these steps to deploy your Web Assets Builder.

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- PostgreSQL database (for production) or use Vercel Postgres

## Environment Variables

Set these environment variables in your Vercel project settings:

### Required Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Application
NODE_ENV=production
BASE_PATH=/
```

### Optional Variables
```bash
# API Configuration
PORT=3000
API_BASE_URL=https://your-app.vercel.app

# Vercel-specific
VERCEL=true
VERCEL_ENV=production
```

## Deployment Steps

### 1. Import Project to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will automatically detect the project configuration

### 2. Configure Environment Variables

In your Vercel project settings:
1. Go to Settings → Environment Variables
2. Add the required environment variables listed above
3. For different environments (Development, Preview, Production), configure accordingly

### 3. Deploy

- **Automatic**: Push to your main branch triggers automatic production deployment
- **Preview**: Every pull request gets its own preview deployment
- **Manual**: Use the Vercel CLI or dashboard to deploy manually

## Project Structure

```
├── artifacts/
│   ├── api-server/        # Express API backend
│   ├── mockup-sandbox/    # Vite frontend application
│   └── trinity-media/     # Main media application
├── lib/                   # Shared libraries
├── scripts/              # Build and utility scripts
├── vercel.json           # Vercel configuration
└── package.json          # Root package.json
```

## Build Configuration

The `vercel.json` file handles:
- **Build Command**: `pnpm run build`
- **Install Command**: `pnpm install`
- **API Routes**: Configured for serverless functions
- **Rewrites**: Proper routing for multi-app setup
- **CORS Headers**: API CORS configuration

## Local Development

To run the project locally:

```bash
# Install dependencies
pnpm install

# Run typecheck
pnpm run typecheck

# Build all packages
pnpm run build

# Run individual applications
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/trinity-media run dev
pnpm --filter @workspace/mockup-sandbox run dev
```

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Check that all environment variables are set
2. Verify that `DATABASE_URL` is correctly formatted
3. Ensure the build can access all required dependencies

### Native Module Issues

The project is configured to support both local development (macOS ARM64) and Vercel deployment (Linux). If you encounter native module issues:
1. Run `pnpm install` to rebuild native modules
2. Check `pnpm-workspace.yaml` for platform-specific configurations

### Database Connection Issues

1. Verify your `DATABASE_URL` is correct
2. Ensure your database allows connections from Vercel's IP ranges
3. Check database connection limits and pool settings

## Performance Considerations

- **Serverless Functions**: API routes are deployed as serverless functions
- **Static Assets**: Frontend apps are built and served as static files
- **Database**: Consider using connection pooling for production
- **Caching**: Vercel automatically caches static assets

## Monitoring and Analytics

Vercel provides:
- **Analytics**: Visit the Analytics tab in your dashboard
- **Logs**: Real-time logs for serverless functions
- **Performance**: Deployment performance metrics
- **Error Tracking**: Automatic error tracking

## Scaling

- **Automatic**: Vercel automatically scales based on traffic
- **Database**: Consider Vercel Postgres for managed database scaling
- **CDN**: Static assets are automatically served through Vercel's CDN

## Support

For issues specific to:
- **Vercel**: Check Vercel documentation (https://vercel.com/docs)
- **Project**: Review this README and project documentation
- **Database**: Consult your database provider's documentation

## Next Steps

1. Set up your Vercel project
2. Configure environment variables
3. Deploy and test your application
4. Set up custom domains (optional)
5. Configure analytics and monitoring