# This step will help you create a Sanity project.

## Step 1: Create a new Next.js project

```bash
npx create-next-app .
```

## Step 2: Install Sanity Studio

You start by setting up your content editing environment. It’s called Sanity Studio, and you can configure and customize it with JavaScript. It runs in the browser. To develop locally, we need to run a development server so you can see your changes instantly.

### To get started, run this in your command line:

```bash
npm create sanity@latest -- --template clean --create-project "learning-sanity-project" --dataset production
```

This will take you through a setup process by guiding you through the following steps:

1. Create an account. Select a login provider from the list of options, and confirm with Enter. After creating an account in the browser, come back to the command line window.
2. It will ask you the following questions.
   - Would you like to add configuration files for a Sanity project in this Next.js folder? Yes
   - Would you like an embedded Sanity Studio? Yes
   - Would you like to use the Next.js app directory for routes? Yes
   - What route do you want to use for the Studio? /studio
   - Select project template to use Clean project with no predefined schemas
   - Would you like to add the project ID and dataset to your .env file? Yes
3. Wait a bit for the installation process to complete. When you get a Success! message, you're good to move on to the next step!! 🎉

### Step 3: Run the Studio locally

```terminal
npm run dev
```

This will start the next js project. Once the build is complete, you can head over to `http://localhost:3000/studio`. It will ask you to add the URL as a CORS origin. Click on Continue to open the Sanity management dashboard. From there, you need to add the CORS origin.

#### You should now see the Sanity Studio running in your browser

As you modify and save the code, the server will automatically rebuild the studio and refresh the browser.