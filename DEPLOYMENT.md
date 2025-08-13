# Pawsome Grooming Cyprus - Vercel Deployment Guide

This guide covers deploying the pet grooming website to Vercel.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/pet-grooming-website)

## Manual Deployment Steps

### 1. Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### 2. Environment Variables

Set these environment variables in your Vercel dashboard:

**Required:**
- `NEXT_PUBLIC_SITE_URL` = `https://pawsome-grooming.vercel.app` (or your custom domain)

**Optional:**
- `NEXT_PUBLIC_BUSINESS_PHONE` = `+357 22 123456`
- `NEXT_PUBLIC_BUSINESS_EMAIL` = `info@pawsomegrooming.cy`
- `NEXT_PUBLIC_BUSINESS_ADDRESS` = `"123 Pet Street, Nicosia, Cyprus"`
- `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX` (Google Analytics)

### 3. Domain Configuration

1. Add your custom domain in Vercel dashboard
2. Update DNS records as shown in Vercel
3. Wait for SSL certificate provisioning

### 4. Performance Optimization

The project is pre-configured with:
- ✅ Image optimization
- ✅ Compression enabled  
- ✅ CSS optimization
- ✅ Security headers
- ✅ Caching strategies

### 5. SEO Configuration

The site includes:
- ✅ OpenGraph meta tags
- ✅ Twitter Cards
- ✅ Structured data
- ✅ Robots.txt
- ✅ Sitemap (auto-generated)

## Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## Troubleshooting

### Build Errors
- Ensure TypeScript and ESLint pass
- Check all imports are correct
- Verify all required environment variables are set

### Performance Issues  
- Images are auto-optimized by Vercel
- Static assets are cached for 1 year
- API routes use no-cache headers

### Custom Domain Issues
- Verify DNS records are correct
- Wait 24-48 hours for DNS propagation
- Check domain is not already in use

## Support

For deployment issues:
- Check Vercel build logs
- Review environment variables
- Test locally with `npm run build`

For business inquiries:
- Phone: +357 22 123456
- Email: info@pawsomegrooming.cy
