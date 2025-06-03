# Vercel Deployment Guide for The Wealth Shift

This document provides instructions for deploying The Wealth Shift website to Vercel, including necessary environment variables and configuration settings.

## Connecting to Vercel

1. **Import from GitHub**
   - Log in to your Vercel account
   - Click "Add New" > "Project"
   - Select the GitHub repository: `Mabspro/The_Walth_Shift`
   - Vercel will automatically detect that it's a Next.js project

2. **Project Configuration**
   - Project Name: `the-wealth-shift` (or your preferred name)
   - Framework Preset: Next.js (should be auto-detected)
   - Root Directory: `./` (default)
   - Build and Output Settings: Use the default settings

## Environment Variables

For the current implementation of The Wealth Shift, you'll need the following environment variables in your Vercel project:

| Variable Name | Description | Example Value | Required |
|---------------|-------------|--------------|----------|
| `NEXT_PUBLIC_SITE_URL` | The base URL of your deployed site | `https://the-wealth-shift.vercel.app` | Yes |
| `NEXT_PUBLIC_TALLY_API_KEY` | API key for Tally forms integration (if using Tally) | `your-tally-api-key` | No* |

*Only required if you implement the actual Tally forms integration as described in the TALLY_FORM_SETUP.md document.

### Additional Variables for Future Implementation

As the project grows, you might need to add these environment variables:

| Variable Name | Description | When Needed |
|---------------|-------------|------------|
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics tracking ID | When implementing analytics |
| `NEXT_PUBLIC_MAILCHIMP_URL` | Mailchimp form endpoint | When adding email newsletter |
| `DATABASE_URL` | Connection string for database | When adding user authentication |
| `AUTH_SECRET` | Secret key for authentication | When adding user authentication |

## Build and Deployment Settings

The default build settings should work for this Next.js project:

- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`
- Development Command: `next dev`

## Domain Configuration

After deployment, you can configure a custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" tab
3. Add your custom domain (e.g., `thewealthshift.com`)
4. Follow Vercel's instructions to verify domain ownership

## Deployment Hooks

For continuous deployment:

1. Vercel will automatically deploy when changes are pushed to the main branch
2. You can create additional deployment hooks for specific branches or events

## Monitoring and Analytics

After deployment:

1. Use Vercel Analytics to monitor performance
2. Enable Web Vitals reporting in the project settings
3. Set up alerts for performance degradation

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in Vercel
2. Ensure all required environment variables are set
3. Verify that the project builds locally with `npm run build`
4. Check for any path issues (Vercel uses case-sensitive paths)

## Next Steps After Deployment

1. Test all forms and redirects on the live site
2. Verify that all pages load correctly
3. Test the site on different devices and browsers
4. Set up monitoring and analytics
5. Configure any additional integrations (e.g., Tally forms)

---

For more information on Vercel deployment options and advanced configuration, refer to the [Vercel Documentation](https://vercel.com/docs).
