# Loading UI and Streaming in Next.js

Next.js is a framework for building web applications with React. One of the features that Next.js offers is the ability to create meaningful loading UI with React Suspense and streaming data from the server to the client.

## Loading UI with loading.tsx

When you navigate to a new page in Next.js, you might see a blank screen or a loading indicator while the page data is being fetched and rendered. This can create a poor user experience, especially if the page takes a long time to load.

To improve the perceived loading performance, Next.js allows you to create a loading state for each page by adding a `loading.tsx` file inside the page folder. For example, if you have a page at `app/dashboard/page.tsx`, you can create a loading state at `app/dashboard/loading.tsx`.

The `loading.tsx` file should export a React component that renders the fallback UI for the page. You can use any UI library or component that you like, such as skeletons, spinners, placeholders, etc.

The `loading.tsx` component will be shown immediately when the user navigates to the page, without waiting for the data to be fetched or the page to be rendered. This gives the user instant feedback and a sense of progress.

Next.js will automatically wrap the `page.tsx` file and any children below in a `<Suspense>` boundary, and use the `loading.tsx` component as the fallback prop. This means that when the page data is ready and the page component is rendered, the loading state will be replaced by the actual page content.

## Streaming with Suspense

In addition to `loading.tsx`, you can also use React Suspense to create custom loading UI for any component in your app. Suspense is a React feature that lets you defer rendering some components until some condition is met, such as data being fetched or code being loaded.

To use Suspense, you need to wrap your component in a `<Suspense>` element, and provide a fallback prop that renders the loading UI. For example, if you have a component that fetches some data from an API, you can use Suspense to show a spinner while the data is being fetched.

The component that fetches the data should use the simple fetch function to fetch the data from the API. The fetch function will return a promise that resolves to the data, or rejects with an error. You can use async/await or then/catch to handle the promise. You also need to specify the type of the data using TypeScript.

Next.js supports streaming with Suspense for both Node.js and Edge runtimes. This means that Next.js can progressively send chunks of HTML from the server to the client, as the data for each Suspense boundary is resolved. This can improve the loading performance and user experience, as the user can see parts of the page before the whole page is ready.
