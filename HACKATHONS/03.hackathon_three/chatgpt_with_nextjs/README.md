0. clone repo 

npm i

1. Create nextjs project

npx create-next-app@latest

2. create api folder in app folder

    -src
        -app
            -api
                -prompt
                -route.ts

3. install latest openai package

npm install openai@^4.0.0

4. login to openai website and create api key

https://platform.openai.com/login

5. create .env.local file in root and paste in the key

OPENAI_API_KEY= `Your api key for openai`

6. create openai-config.ts file 

    -src
    -openai-config.ts

7. install shadcnui for frontend

8. request api to get reply from chatgpt backend

9. Demo link

https://chatgpt-h3.vercel.app/