# Loading UI

When you navigate to a new page in Next.js, you might see a blank screen or a loading indicator while the page data is being fetched and rendered. This can create a poor user experience, especially if the page takes a long time to load.

To improve the perceived loading performance, Next.js allows you to create a loading state for each page by adding a loading.tsx file inside the page folder. For example, if you have a page at app/blog/[id].tsx, you can create a loading state at app/blog/loading.tsx.

The loading.tsx file should export a React component that renders the fallback UI for the page. You can use any UI library or component that you like, such as skeletons, spinners, placeholders, etc.

The loading.tsx component will be shown immediately when the user navigates to the page, without waiting for the data to be fetched or the page to be rendered. This gives the user instant feedback and a sense of progress.

Next.js will automatically wrap the page.tsx file and any children below in a <Suspense> boundary, and use the loading.tsx component as the fallback prop. This means that when the page data is ready and the page component is rendered, the loading state will be replaced by the actual page content.
