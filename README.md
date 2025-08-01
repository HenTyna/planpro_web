This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

This project requires the following environment variables:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:9090/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production deployment, update these URLs to your actual domains:
```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_APP_URL=https://planpro.vercel.app
```

## Deployment

### Vercel Deployment

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Set the environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_API_URL` = `https://your-api-domain.com/api` (replace with your actual API URL)
     - `NEXT_PUBLIC_APP_URL` = `https://planpro.vercel.app`
4. Deploy

The build is configured to handle missing environment variables gracefully and will skip API rewrites if the API URL is not properly configured.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## ✅ Vercel Build Error Fixed

### **Problem:**
The build was failing because the environment variable `NEXT_PUBLIC_API_URL` was undefined in the Vercel build environment, causing the rewrite destination to be `undefined/:path*` instead of a valid URL.

### **Solution:**

1. **Updated `next.config.ts`:**
   - Added validation to check if the API URL is properly configured
   - Only creates rewrites if the API URL is valid and starts with `http`
   - Returns an empty array if the API URL is undefined or invalid
   - This prevents the "Invalid rewrite found" error

2. **Updated `vercel.json`:**
   - Simplified the configuration to focus on build settings
   - Removed hardcoded URLs to avoid conflicts

3. **Updated `README.md`:**
   - Added clear documentation about required environment variables
   - Provided deployment instructions for Vercel
   - Explained how to set environment variables in Vercel dashboard

### **Key Changes:**

```typescript
<code_block_to_apply_changes_from>
async rewrites() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Only add rewrites if we have a valid API URL that's not undefined
  if (apiUrl && apiUrl !== 'undefined' && apiUrl.startsWith('http')) {
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  }
  
  // Return empty array if no valid API URL
  return [];
}
```

### **For Vercel Deployment:**

1. **Set Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_API_URL` = `https://your-api-domain.com/api`
     - `NEXT_PUBLIC_APP_URL` = `https://your-app-domain.vercel.app`

2. **The build will now:**
   - ✅ Work even if environment variables are not set
   - ✅ Skip API rewrites gracefully if API URL is invalid
   - ✅ Build successfully without the "Invalid rewrite found" error

Your Next.js application should now deploy successfully on Vercel! 🎉
