# Next.js 13 Hello World

[Download and Install Node.js LTS Version](https://nodejs.org/en/download/)

[Download and Install VS Code](https://code.visualstudio.com/download)

[Check out the Next.js 13 Installation Docs](https://beta.nextjs.org/docs/installation)

Open the Command Line and create the Typescript project by give this command:

        npx create-next-app@latest --experimental-app

Change to project directory:

        cd step00_helloworld

The app directory is where you define routes, create UI and colocate files such as components, tests, or stylesheets.

Read the following React Documentation:

[What is a React Component](https://beta.reactjs.org/learn#components)

[How to Write Markup with JSX](https://beta.reactjs.org/learn#writing-markup-with-jsx)

Note: Our file extension is not jsx but tsx becuase we are using
TypeScript

In the app/page.tsx file delete the previous React component and replace it with the following simple hello world component:  

        export default function Home() {
                return (
                        <div>Hello World</div>
                )
        }

We wrote a very simple hello world React component in the file. Note that it is a convention in Next.js that the html page in the director is called page.tsx

Comment out the styles import in app/page.tsx file

Comment out the styles import in app/layout.tsx file

Start the Server:

        npm run dev

Note that the development server created a layout.tsx file by itself even if you delete it. This means the Next.js requires that there must be RootLayout component in the app folder for the app to function.

The app/layout.tsx, app/header.tsx, and app/page.tsx files will be rendered when the user visits the root of your application.

The file app/layout.tsx is used to define UI that is shared across multiple pages. A layout accepts another layout or a page as its child. You can nest layouts to create nested routes.

The file app/page.tsx is used to define the unique UI of a route. Pages represent the leaf of the route and are needed for the path to be accessible.

Open the Browser to see the results locally:

        http://localhost:3000/

## Manual Deployment through [CLI](https://vercel.com/cli)

npm i -g vercel

Now go to the Next.js project directory and give the following command to deploy to cloud:

        vercel 

In my case the web app is deployed to:

        https://step00-helloworld.vercel.app

[CLI Docs](https://vercel.com/docs/cli)


## Project config with vercel.json

[vercel.json](https://vercel.com/docs/project-configuration)

[example](https://github.com/grand-stack/grand-stack-starter/blob/master/vercel.json)

[Rewrite Example](https://stackoverflow.com/questions/73607646/problems-mounting-a-vercel-nextjs-project-as-a-subdirectory-of-a-different-verce)

