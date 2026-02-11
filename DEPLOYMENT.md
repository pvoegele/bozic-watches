# Deployment Guide for BOZIC Watches

This guide explains how to deploy the BOZIC Watches showroom to production.

## Prerequisites

- Node.js 18+ installed
- A hosting platform account (Vercel, Netlify, or similar)
- (Optional) Shopify store with Storefront API access

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest option as it's made by the creators of Next.js.

### Steps:

1. **Push your code to GitHub** (already done)

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import `pvoegele/bozic-watches` repository

3. **Configure Environment Variables** (Optional):
   - In Vercel project settings, go to "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
     NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
     ```

4. **Deploy**:
   - Vercel will automatically build and deploy
   - Your site will be live at `https://your-project.vercel.app`

5. **Add Custom Domain** (Optional):
   - In Vercel project settings, go to "Domains"
   - Add your custom domain (e.g., `bozic-watches.com`)
   - Follow DNS configuration instructions

## Option 2: Deploy to Netlify

1. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

3. **Environment Variables**:
   - Add the same Shopify variables as above

4. **Deploy**:
   - Netlify will build and deploy automatically

## Option 3: Self-Hosted

### Using PM2 on VPS/Dedicated Server

1. **Install Node.js and PM2**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **Clone and Build**:
   ```bash
   git clone https://github.com/pvoegele/bozic-watches.git
   cd bozic-watches
   npm install
   npm run build
   ```

3. **Configure Environment**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Shopify credentials
   ```

4. **Start with PM2**:
   ```bash
   pm2 start npm --name "bozic-watches" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx as Reverse Proxy**:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Setup SSL with Let's Encrypt**:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Shopify Configuration

### Creating a Storefront API Access Token

1. Go to your Shopify Admin
2. Navigate to Settings → Apps and sales channels
3. Click "Develop apps"
4. Create a new app or select existing
5. Configure Storefront API scopes:
   - Read products
   - Read product listings
6. Install app and copy the Storefront Access Token

### Setting Up Product Metafields

In Shopify Admin, for each product:

1. Go to Products → [Select Product] → Metafields
2. Add custom metafields:
   - `custom.brand` (text)
   - `custom.model` (text)
   - `custom.reference` (text)
   - `custom.year` (text)
   - `custom.case_size_mm` (text)
   - `custom.material` (text)
   - `custom.movement` (text)
   - `custom.condition` (text)
   - `custom.availability_status` (text: available/reserved/sold)
   - `custom.show_price` (boolean)

## Post-Deployment Checklist

- [ ] Site loads correctly on production URL
- [ ] All pages render properly
- [ ] Images display correctly
- [ ] Navigation works
- [ ] Contact information is correct
- [ ] Shopify products load (if configured)
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics setup (Google Analytics, etc.)
- [ ] Performance tested (Lighthouse, GTmetrix)

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:
- Any push to `main` branch triggers a production deployment
- Pull requests get preview deployments

## Monitoring

### Vercel Analytics
- Available in Vercel dashboard
- Shows page views, performance metrics

### Custom Analytics
Add Google Analytics or similar:
1. Get tracking ID
2. Add to `app/layout.tsx`:
   ```tsx
   <Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
   <Script id="google-analytics">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'GA_ID');
     `}
   </Script>
   ```

## Troubleshooting

### Build Fails
- Check Node.js version (needs 18+)
- Verify all dependencies installed
- Check for TypeScript errors: `npm run build`

### Images Not Loading
- Verify placeholder images in `/public/placeholders/`
- Check image paths start with `/` not `./`

### Shopify Connection Issues
- Verify environment variables are set
- Check Storefront API token permissions
- Ensure store domain is correct

### Performance Issues
- Enable Vercel/Netlify CDN
- Optimize images (future: use Shopify CDN)
- Check Next.js cache settings

## Support

For issues or questions:
- Check Next.js docs: https://nextjs.org/docs
- Vercel support: https://vercel.com/support
- Repository issues: https://github.com/pvoegele/bozic-watches/issues
