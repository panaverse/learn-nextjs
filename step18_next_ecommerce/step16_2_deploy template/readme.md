
Nextjs ecommerce 2.0 Shopify Deployment Step by Step 

Second step deploy Vercel ecommerce 2.0 template

1. https://vercel.com/new/templates/next.js/nextjs-commerce
2. Click Deploy
3. Click Create
4. Set environmental variables using keys and URL of your shopify store

For example
   
COMPANY_NAME="KvobjeSoft"
TWITTER_CREATOR="@vercel"
TWITTER_SITE="https://nextjs.org/commerce"
SITE_NAME="Next.js Commerce"

# Private access token from Shopify Headless/ Store Front API token
SHOPIFY_REVALIDATION_SECRET="shpat_xxxxxxxxxxxxxxxxxx"
 
# Public access token from Shopify Headless/ Store Front API token
SHOPIFY_STOREFRONT_ACCESS_TOKEN="xxxxxxxxxxxxxx"  
SHOPIFY_STORE_DOMAIN="xxxxxx.myshopify.com"

