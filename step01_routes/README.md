# Next.js 13 Routes

[Read the routing fundamentals docs](https://beta.nextjs.org/docs/routing/fundamentals)

In Next.js 13 folders are used to define routes. A route is a single path of nested folders, following the hierarchy from the root folder down to a final leaf folder.

Files are used to create UI that is shown for the route segment.

To create a route you can create a folder in the app directory. For example, you can add app/name director with its page.tsx file.

To create a nested route, you can nest folders inside each other. For example, you can add a new app/name/address route by nesting two new folders in the app directory.

The /name/address route is composed of three segments:

/ (Root segment)

name (Segment)

address (Leaf segment)


Now lets test this, take the code in step00 and create a directory app/name and a page.tsx file in it. 

Edit app/name/page.tsx and make a very simple React component in the file. Note that it is a convention in Next.js that the page in the director is called page.tsx

Also create a directory app/name/address and a page.tsx file in it. 

Start the Server:

        npm run dev

Open the Browser:

        http://localhost:3000/name

        http://localhost:3000/name/address

Now deploy the app to Vercel and test it. 

Unlike previous versions of Next.js which used client-side routing, the router in Next.js 13 uses server-centric routing to align with [Server Components](https://beta.nextjs.org/docs/rendering/server-and-client-components) and data fetching on the server. With server-centric routing, the client does not have to download a route map and the same request for Server Components can be used to look up routes. This optimization is useful for all applications, but has a larger impact on applications with many routes.

[Watch Next.js Conf Keynote: Introducing Next.js 13 and Turbopack](https://www.youtube.com/watch?v=NiknNI_0J48)

Watch the [The Future of the Web: From Cloud to Edge](https://www.youtube.com/watch?v=HlXLVb3QCvQ)

<bold>Read the Blog [The Future of the Web is on the Edge](https://deno.com/blog/the-future-of-web-is-on-the-edge). It basically says the future is edge computing and it is evolving two trends i.e. CDN and Lambda. Server Side Components makes this easy. Also Watch [React Server Components and The Edge!](https://www.youtube.com/watch?v=qBvVQz-_U94)</bold>

Must Watch [The Future of the Web: From Cloud to Edge](https://www.youtube.com/watch?v=HlXLVb3QCvQ)

Note that all components inside the app directory are [React Server Components](https://www.plasmic.app/blog/how-react-server-components-work) by default, including special files and colocated components. This allows you to automatically adopt Server Components with no extra work, and achieve great performance out of the box.





