# Vercel Static Website Deployment Guide

This project is a **static website** built with Vite and React, designed for simple deployment on Vercel. No database or backend server required!

## Quick Start

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click **Deploy**

That's it! Vercel will automatically detect and deploy your static site.

## Project Overview

**Trinity Media** is a modern static website built with:
- **React 19** - Latest React with new features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Modern utility-first CSS framework
- **TypeScript** - Type-safe development
- **Radix UI** - High-quality accessible UI components

## Environment Variables (Optional)

For a basic static site, you don't need any environment variables. However, you can add these if needed:

```bash
# Optional: Custom configuration
NODE_ENV=production
BASE_PATH=/
```

## Development

### Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm --filter @workspace/trinity-media run dev

# Build for production
pnpm --filter @workspace/trinity-media run build

# Preview production build
pnpm --filter @workspace/trinity-media run serve
```

### Build Output

The production build creates optimized static files in `artifacts/trinity-media/dist/public/`:
- **HTML**: Pre-rendered HTML files
- **CSS**: Minified and bundled CSS
- **JavaScript**: Optimized and code-split JS
- **Assets**: Images, fonts, and other static assets

## Vercel Configuration

The `vercel.json` file handles:
- **Build Command**: Builds the static site with Vite
- **Output Directory**: Points to the built static files
- **Rewrites**: Ensures client-side routing works properly

## Deployment Features

### Automatic Deployment
- Push to `main` branch → Production deployment
- Pull requests → Preview deployments
- Zero configuration required

### Performance
- **CDN**: All files served from Vercel's global CDN
- **Caching**: Automatic asset caching and optimization
- **Compression**: Brotli and gzip compression
- **HTTPS**: Automatic SSL certificates

### Custom Domains (Optional)
1. Go to your project settings in Vercel
2. Add your custom domain
3. Update DNS records
4. Vercel handles SSL automatically

## Project Structure

```
artifacts/trinity-media/
├── src/              # Source code
│   ├── components/   # React components
│   ├── pages/        # Page components
│   └── styles/       # Global styles
├── public/           # Static assets
├── dist/public/      # Build output (deployed)
└── vite.config.ts    # Vite configuration
```

## Adding External Services

Even though this is a static site, you can integrate external services:

### Analytics
```html
<!-- Add Google Analytics, Vercel Analytics, etc. -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### Contact Forms
Use services like:
- **Formspree** - Form backend for static sites
- **Netlify Forms** - Form handling
- **EmailJS** - Direct email integration

### APIs & External Data
Fetch data in React components:
```javascript
const data = await fetch('https://api.example.com/data');
```

## Troubleshooting

### Build Errors
- **Dependencies not found**: Run `pnpm install` locally and push updated `pnpm-lock.yaml`
- **Type errors**: Run `pnpm run typecheck` locally first
- **Build timeout**: Optimize images or reduce bundle size

### Deployment Issues
- **404 errors**: Check that `outputDirectory` in `vercel.json` is correct
- **Routing issues**: The rewrites rule handles client-side routing
- **Asset loading**: Ensure all assets are in the `public/` folder

### Performance
- **Large bundle**: Use dynamic imports for code splitting
- **Slow images**: Optimize and compress images
- **Unused CSS**: Review Tailwind CSS usage

## Cost & Limits

**Vercel Free Tier** (perfect for static sites):
- Unlimited deployments
- 100GB bandwidth per month
- Fast global CDN
- Automatic HTTPS
- No credit card required

Paid plans only needed for:
- Custom teams/enterprise features
- Advanced analytics
- Edge functions (not needed for static sites)

## Next Steps

1. **Customize Content**: Edit the React components in `src/`
2. **Add Pages**: Create new page components
3. **Styling**: Modify Tailwind CSS classes
4. **Deploy**: Push to GitHub for automatic deployment
5. **Custom Domain**: Add your own domain (optional)

## Support & Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Guide**: [vitejs.dev](https://vitejs.dev)
- **React Docs**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

## Migration from Replit

This project was successfully migrated from Replit to Vercel:
- ✅ Removed all Replit-specific dependencies
- ✅ Simplified to static website deployment
- ✅ Optimized for Vercel's CDN
- ✅ Maintained local development experience
- ✅ Zero-config deployment

Your static site is ready for professional hosting on Vercel! 🚀