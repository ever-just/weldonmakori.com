# Analytics & Tracking Setup Guide

The site is now configured with tracking placeholders. Follow these steps to activate tracking:

## Step 1: Create Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Click **Create Property**
4. Enter property name: `Weldon Makori Website`
5. Select timezone and currency
6. Click **Next**
7. Fill in business details
8. Click **Create**
9. Accept Terms of Service
10. Choose **Web** platform
11. Enter website URL: `https://weldonmakori.com`
12. Enter stream name: `Weldon Makori Main Site`
13. Click **Create stream**
14. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)

## Step 2: Create Google Tag Manager Account

1. Go to [Google Tag Manager](https://tagmanager.google.com/)
2. Click **Create Account**
3. Account name: `Weldon Makori`
4. Country: Select your country
5. Container name: `weldonmakori.com`
6. Target platform: **Web**
7. Click **Create**
8. Accept Terms of Service
9. **Copy your Container ID** (format: `GTM-XXXXXXX`)

## Step 3: Update the Website

Once you have both IDs, I'll update the code with your actual tracking IDs.

**Send me:**
- Google Analytics Measurement ID (G-XXXXXXXXXX)
- Google Tag Manager Container ID (GTM-XXXXXXX)

## Step 4: What Gets Tracked

Once activated, you'll track:
- **Page views**: Every time someone visits
- **User sessions**: How long people stay
- **Traffic sources**: Where visitors come from (Google, direct, social media)
- **Geographic data**: Where your visitors are located
- **Device info**: Desktop vs mobile, browsers, screen sizes
- **User behavior**: Scroll depth, clicks, time on page
- **Real-time visitors**: See who's on your site right now

## Step 5: Verify Tracking is Working

1. Go to Google Analytics
2. Click **Reports** → **Realtime**
3. Open your website in a new tab
4. You should see yourself as an active user within 30 seconds

## Optional: Enhanced Tracking

After basic setup, you can add:
- **Event tracking**: Button clicks, form submissions
- **Conversion tracking**: Goal completions
- **E-commerce tracking**: If you add payment features
- **Custom dimensions**: Track specific user attributes

## Privacy Compliance

The current setup is GDPR/CCPA compliant with:
- No personally identifiable information (PII) collected
- Anonymous IP tracking
- Cookie consent (can be added later if needed)
