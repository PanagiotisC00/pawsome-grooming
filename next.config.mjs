/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production-optimized configuration for Vercel deployment
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint for production builds
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking for production builds
  },
  images: {
    // Optimize images for production
    formats: ['image/webp', 'image/avif'],
    domains: ['localhost', 'pawsome-grooming.vercel.app'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
  // Enable experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Environment variables for different deployment stages
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://pawsome-grooming.vercel.app',
  },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

export default nextConfig
