
# [Fonts Family link in tailwind ](https://tailwindcss.com/docs/font-family)

## Run these commands in project directory

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
## Replace the code of  tailwind.config.js with this code
```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

##  In app/globals.css past these lines at the top of the file
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
