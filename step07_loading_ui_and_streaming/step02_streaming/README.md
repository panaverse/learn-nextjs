# Streaming with Suspense

In addition to loading.tsx, you can also use React Suspense to create custom loading UI for any component in your app. Suspense is a React feature that lets you defer rendering some components until some condition is met, such as data being fetched or code being loaded.

To use Suspense, you need to wrap your component in a <Suspense> element, and provide a fallback prop that renders the loading UI. For example, if you have a component that fetches some data from an API, you can use Suspense to show a spinner while the data is being fetched.

The component that fetches the data should use the simple fetch function to fetch the data from the API. The fetch function will return a promise that resolves to the data, or rejects with an error. You can use async/await or then/catch to handle the promise. You also need to specify the type of the data using TypeScript.

Next.js supports streaming with Suspense for both Node.js and Edge runtimes. This means that Next.js can progressively send chunks of HTML from the server to the client, as the data for each Suspense boundary is resolved. This can improve the loading performance and user experience, as the user can see parts of the page before the whole page is ready.
