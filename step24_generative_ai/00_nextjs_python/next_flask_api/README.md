0. Clone the repo 

npm i
npm run dev

1. Create Nextjs 13 project

npx create-next-app@latest

2. Check python installation and create virtual envoirnment and activate it

python --version
python -m venv venv (any name you want)

3. Check pip version and packages and install flask

pip --version
pip list
pip install flask

4. Create api directory in root folder and index.py

(in root of your folder)

	-src
	-api
	  -index.py

5. Install concurrently

npm install concurrently

6. Add scripts update in package.json

"flask-dev": "python -m flask --app api/index run -p 8000 --reload",
"next-dev": "next dev",
"dev": "concurrently \"npm run next-dev\" \"npm run flask-dev\"",

7. proxy request at localhost:3000 to 127.0.0.1:8080

/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [
        {
            source: '/api/:path*',
            destination:
            process.env.NODE_ENV === 'development'
                ? 'http://127.0.0.1:8000/api/:path*'
                : '/api/',
        },
        ]
  },
}

module.exports = nextConfig

8. Run project and verify that flask api is working

9. Create routes for CRUD in api

10. Add zustand and create store folder

11. Create frontend for the todo with shadcnui

npx shadcn-ui@latest init

12. Link state update from frontend to api using zustand


13. Before deployment to vercel add CORS in flask (for POST, DELETE and PUT/PATCH)

pip install flask-cors

14. Check the working demo
https://next-with-flask.vercel.app/