# Running unit and integration tests

Read pages 207-215 Chapter 9 of the [Real World Next.js](https://www.packtpub.com/product/real-world-next-js/9781801073493)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Resources
- [Simplify Testing with React Testing Library by Scottie Crump](https://www.amazon.com/Simplify-Testing-React-Library-maintainable-ebook/dp/B08XK2KNWN)


## (Create a project)
Create a new Next project
```bash
npx create-next-app step34_running_unit_and_integrating_tests --ts
```

## Unit testing with Jest

## Install modules
Install the jest package by running this:
```bash
yarn add -D jest
```
Given that we're writing our functions and components using ESNext" features, we want to tell Jest to use the default Next.js babel preset for transpiling those modules correctly. We can do that by creating a .babelrc file in our project's root and adding the following content:
```bash
{
"presets": ["next/babel"]
}
```
The next/babel preset comes pre-installed with Next.js, so we don't need to install anything, and we're ready to go.

## Write a unit test
```bash
    describe("cutTextToLength", () => {
        test('Should cut a string that exceeds 10 characters', () => {
        const initialString = 'This is a 34 character long
        string';
        const cutResult = cutTextToLength(initialString, 10);
        expect(cutResult).toEqual('This is a ...');
    });
});
```

## Run tests
Once we've written all the remaining tests, we're finally ready to run our test suite. To make it easier and standard, we can create a new script inside of our package.json file:
```bash
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest"
},
```
Run tests
```bash
yarn test
```

## Testing React Components
Sadly, Jest alone is not enough for testing React components. We will need to mount and render them to test their output, and specific libraries do that incredibly well. The most popular options out there are react-testing-library and Enzyme. In this example, we will be using react-testing-library, but feel free to experiment with Enzyme and see which approach you prefer.

## Install modules
Install the react-testing-library and jest-environment-jsdom packages by running this:
```bash
yarn add @testing-library/react jest-environment-jsdom
```

## Write and run a test
use dummy data to populate the page while testing
```bash
const article = {
    id: 'u12w3o0d',
    title: 'Healthy summer melon-carrot soup',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, felis quis sagittis molestie, mi sem lobortis dui, a sollicitudin nibh erat id ex.',
    author: {
        id: '93ksj19s',
        name: 'John Doe',
    },
    image: {
        url: 'https://images.unsplash.com/photo-1629032355262-d751086c475d',
        author: 'Karolin Baitinger',
    },
};
```

Specify the testing environment by adding this comment on top level of the test file. 
```bash
/**
* @jest-environment jsdom
*/
```

Write a test
```bash
describe('ArticleCard', () => {
    test('Generated link should be in the correct format', () => {
        const component = render(<ArticleCard {...article} />);
        const link = component.getByRole('link').getAttribute('href');
        expect(link).toBe('/articles/healthy-summer-meloncarrot-soup-u12w3o0d');
    });
});
```

Run tests
```bash
yarn test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
