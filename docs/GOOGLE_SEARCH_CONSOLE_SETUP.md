# Google Search Console Setup Guide

## Automatic Indexing (Already Done)
✅ Sitemap created at: https://weldonmakori.com/sitemap.xml
✅ Robots.txt configured at: https://weldonmakori.com/robots.txt
✅ IndexNow API notification sent to search engines

## Manual Setup Steps

### 1. Add Property to Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Choose "URL prefix" and enter: `https://weldonmakori.com`
4. Click "Continue"

### 2. Verify Ownership
Choose one of these verification methods:

#### Option A: HTML File Upload (Easiest)
1. Google will provide an HTML verification file
2. Download it
3. Upload to the root of this repo
4. Deploy with `netlify deploy --prod`
5. Click "Verify" in Google Search Console

#### Option B: HTML Tag
1. Google will provide a meta tag
2. Add it to the `<head>` section of `index.html`
3. Deploy with `netlify deploy --prod`
4. Click "Verify" in Google Search Console

#### Option C: DNS Verification
1. Google will provide a TXT record
2. Add it to GoDaddy DNS (we can automate this if needed)
3. Click "Verify" in Google Search Console

### 3. Submit Sitemap
1. Once verified, go to "Sitemaps" in the left menu
2. Enter: `sitemap.xml`
3. Click "Submit"

### 4. Request Indexing
1. Go to "URL Inspection" in the left menu
2. Enter: `https://weldonmakori.com`
3. Click "Request Indexing"

## Additional Domains to Add
- `https://weldon.lol` (redirect domain)
- `https://www.weldonmakori.com` (www subdomain)

## Expected Timeline
- **Initial crawl**: 1-3 days
- **First appearance in search**: 3-7 days
- **Full indexing**: 1-2 weeks

## Monitoring
Check these metrics in Google Search Console:
- Total clicks
- Total impressions
- Average CTR
- Average position
- Coverage issues
- Mobile usability

## SEO Features Already Implemented
✅ Meta tags (title, description, keywords)
✅ Open Graph tags (Facebook, LinkedIn)
✅ Twitter Card tags
✅ Structured data (JSON-LD Schema.org)
✅ Semantic HTML5 (main, h1, p tags)
✅ Mobile responsive design
✅ Fast loading time
✅ HTTPS/SSL enabled
✅ Canonical URL
✅ Robots.txt
✅ XML Sitemap
