
Nextjs ecommerce 2.0 Shopify Deployment Step by Step 

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

