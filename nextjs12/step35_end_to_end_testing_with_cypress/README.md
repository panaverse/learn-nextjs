# End-to-end testing with Cypress

Read pages 215-222 Chapter 9 of the [Real World Next.js](https://www.packtpub.com/product/real-world-next-js/9781801073493)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Resources
- [Cypress Official Documentation](https://docs.cypress.io/)

## (Create a project)
Create a new Next project
```bash
npx create-next-app step34_running_unit_and_integrating_tests --ts
```

## Install modules
Install the jest package by running this:
```bash
yarn add -D cypress
```

## Cypress configuration
Once Cypress is installed, we can edit our main package.json file by adding the following script:
```bash
    "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest",
    "cypress:open": "cypress open"
}
```
run
```bash
yarn cypress:open
```
Successful configuration will make a new directory with name "cypress", a file with name cypress.config.ts in the root of the project and also open up a GUI to run tests.


## Write Tests
Inside "cypress" folder, make a new directory "e2e" and inside this, make the first test file with name "api.cy.ts" and poplulate it with this test.

```bash
describe('articles APIs', () => {
    it('should correctly return a 200 status code', () => {
        cy.request('http://localhost:3000/api/articles')
            .its('status')
            .should('be.equal', 200);
    });
});
```

Finally, run the test from GUI

Note: Test files should have extention ".cy.ts" or ".cy.js" and test files should be in e2e directory. 


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
