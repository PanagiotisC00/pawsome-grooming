<!-- Update: brief README + SEO notes -->

## Pawsome Grooming Cyprus 🐾

Modern, multilingual pet grooming website with admin dashboard built on Next.js (App Router), TypeScript, Tailwind, and shadcn/ui.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/pet-grooming-website)

### Stack
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4, Radix/shadcn UI, Lucide React icons
- **Internationalization**: JSON files in `public/locales` (English, Greek)
- **Deployment**: Optimized for Vercel

### Features
✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **Multilingual** - English & Greek language support  
✅ **SEO Optimized** - OpenGraph, Twitter Cards, sitemap, robots.txt  
✅ **Admin Dashboard** - Complete business management system  
✅ **Performance** - Image optimization, compression, caching  
✅ **Accessibility** - WCAG compliant, screen reader friendly  

### Key Routes
**Public Website:**
- `/` - Homepage with services preview
- `/services` - Complete service catalog with pricing
- `/gallery` - Before & after photo gallery
- `/booking` - Online appointment booking
- `/contact` - Contact information & inquiry form

**Admin Dashboard:**
- `/dashboard` - Business metrics & overview
- `/dashboard/appointments` - Booking management
- `/dashboard/clients` - Customer database
- `/dashboard/services` - Service management
- `/dashboard/revenue` - Financial reporting
- `/dashboard/gallery` - Photo management

### Development

#### Windows PowerShell
```powershell
npm install
npm run dev   # http://localhost:3000
```

#### Production Build
```powershell
npm run build
npm run start
```

#### Additional Commands
```powershell
npm run lint          # Check code quality
npm run lint:fix       # Fix linting issues
npm run type-check     # TypeScript validation
npm run preview        # Build and preview locally
```

### Deployment to Vercel

#### One-Click Deploy
Click the "Deploy with Vercel" button above for instant deployment.

#### Manual Deployment
1. Fork/clone this repository
2. Connect to Vercel via GitHub
3. Set environment variables (see below)
4. Deploy automatically

#### Required Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://pawsome-grooming.vercel.app
```

#### Optional Environment Variables
```env
NEXT_PUBLIC_BUSINESS_PHONE=+357 22 123456
NEXT_PUBLIC_BUSINESS_EMAIL=info@pawsomegrooming.cy
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Project Structure
```
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/       # Admin dashboard routes  
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── public/               # Static assets
│   ├── data/            # Mock data (JSON)
│   ├── gallery/         # Pet photos
│   ├── locales/         # Translation files
│   └── logos/           # Brand assets
├── lib/                 # Utilities
└── hooks/              # Custom React hooks
```

### Customization

#### Branding
- Logo: Replace files in `public/logos/`
- Colors: Update CSS variables in `app/globals.css`
- Content: Edit translation files in `public/locales/`

#### Contact Information
- Update phone/email in translation files
- Modify contact details in `components/footer.tsx`
- Set environment variables for dynamic content

#### Services & Pricing  
- Edit `public/data/services.json` for pricing
- Update service descriptions in translation files
- Modify service pages as needed

### SEO & Performance

#### Built-in Optimizations
- ✅ Automatic sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt configuration
- ✅ OpenGraph & Twitter Card meta tags
- ✅ Image optimization with WebP/AVIF
- ✅ Compression & caching headers
- ✅ Security headers (CSP, HSTS, etc.)

#### Analytics
Add your Google Analytics ID to environment variables:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Support & Documentation

- 📖 **Deployment Guide**: See `DEPLOYMENT.md`
- 🔧 **Component Documentation**: Check `components/ui/`
- 🌐 **Translation System**: See `lib/i18n.tsx`
- 🎨 **Design System**: Based on shadcn/ui + Tailwind

### License
This project is private and proprietary.

### Contact
- **Business**: Pawsome Grooming Cyprus
- **Phone**: +357 22 123456  
- **Email**: info@pawsomegrooming.cy
- **Developer**: [Panagiotis Chrysanthou](https://panagiotis-webdev.vercel.app/)