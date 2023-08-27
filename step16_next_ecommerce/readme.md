Read the steps in the pdf doc

https://vercel.com/blog/introducing-next-js-commerce-2-0

https://vercel.com/templates/next.js/nextjs-commerce

https://github.com/vercel/commerce

https://www.shopify.com/partners 

Create Shopify store with shopify partners account. get API credential from it. Use these credentials in environmental variables. Deploy commerce 2.0 theme on vercel with these credentials

Nextjs ecommerce 2.0 Shopify Deployment Step by Step 
First Step: Create Shopify Store and get Headless API Keys

1. Create Shopify store with shopify partners account. https://www.shopify.com/partners 
2. Create Store (choose for client option)
3. Add products. ( With title price, quantity, SKU code etc)
4. Add collections with names  (Hidden: Homepage Carousel, Hidden: Homepage Featured Items) and some products in it. (you can skip it initially)
5. Add menu in navigation  (you can skip this initially)
6. Vercel, Next.js Commerce, and Shopify Integration Guide
    https://vercel.com/docs/integrations/shopify#configure-shopify
7. Install headless app and get api keys from it. https://vercel.com/docs/integrations/shopify#install-the-shopify-headless-app
8. view store and get URL of store.    

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

Third Step: local dev

1. clone repo
2. open VS Code with admin rights. (right click and run as administrator)
3. open repo folder
4. create .env file
5. copy from .env.example and paste it in .env 
  
 
Then follow steps in Readme of Repository which are as follows
Running locally
You will need to use the environment variables defined in .env.example to run Next.js Commerce. It's recommended you use Vercel Environment Variables for this, but a .env file is all that is necessary.

npm i -g vercel
vercel link
vercel env pull  (you can skip it if you have done earlier. there should be only file either .env or .env.local)
pnpm install
pnpm dev
to run locally use:     pnpm i next@13.4.6
to deploy from local to vercel:   pnpm i next@latest


Understand Code From the Repo

Fork the Repo and start creating your own Template

Change UI by using Shadcn UI Components, and improve the UI/UX

You will develop two Templates

1. Using Shadcn UI and Shopify (or some other API)
2. Using Shadcn UI and your own API/Database etc.

