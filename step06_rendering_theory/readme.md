# Rendering Theory

With Next.js 13 you can interleave Server and Client Components in your application, and behind the scenes, React will seamlessly merge the work of both environments.

[Watch Next.js 13 - Server & Client Component Basics](https://www.youtube.com/watch?v=IcexKbnTEAM&list=PLxCkFZQohykk8ejbV94XbigHSONNq4m3C)

## Static and Dynamic Rendering on the Server

In addition to client-side and server-side rendering with React components, Next.js gives you the option to optimize rendering on the server with Static and Dynamic Rendering.

### Static Rendering

With Static Rendering, both Server and Client Components can be prerendered on the server at build time. The result of the work is cached and reused on subsequent requests. The cached result can also be revalidated.

Note: This is equivalent to Static Site Generation (SSG) and Incremental Static Regeneration (ISR).

### Dynamic Rendering

With Dynamic Rendering, both Server and Client Components are rendered on the server at request time. The result of the work is not cached.

Note: This is equivalent to Server-Side Rendering (getServerSideProps()).

[Read Rendering Fundamentals](https://beta.nextjs.org/docs/rendering/fundamentals)

## Server and Client Components

Server and Client Components allow developers to build applications that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering.

### Server Components

All components inside the app directory are React Server Components by default, including special files and colocated components. This allows you to automatically adopt Server Components with no extra work, and achieve great performance out of the box.

Server Components (RFC) allow developers to better leverage server infrastructure. For example, large dependencies that previously would impact the JavaScript bundle size on the client can instead remain entirely on the server, leading to improved performance. However, the app directory does still require JavaScript.

When a route is loaded, the Next.js and React runtime will be loaded, which is cacheable and predictable in size. This runtime does not increase in size as your application grows. Further, the runtime is asynchronously loaded, enabling your HTML from the server to be progressively enhanced on the client.

Additional JavaScript is only added as client-side interactivity is needed in your application through the use of Client Components.

### Client Components

Client Components are rendered on the client. With Next.js, Client Components can also be pre-rendered on the server and hydrated on the client.

To use a Client Component, create a file inside app and add the "use client" directive as the first line of code of your component.

```
'use client';

```

You only need to mark components as 'use client' when they use client hooks such as useState or useEffect. It's best to leave components that do not depend on client hooks without the directive so that they can automatically be rendered as a Server Component when they aren't imported by another Client Component. This helps ensure the smallest amount of client-side JavaScript.

[When to use Server vs. Client Components?](https://beta.nextjs.org/docs/rendering/server-and-client-components#when-to-use-server-vs-client-components)

### Moving Client Components to the Leaves

To improve the performance of your application, we recommend moving Client Components to the leaves of your component tree where possible.

For example, you may have a Layout that has static elements (e.g. logo, links, etc) and an interactive search bar that uses state.

Instead of making the whole layout a Client Component, move the interactive logic to a Client Component (e.g. <SearchBar />) and keep your layout as a Server Component. This means you don't have to send all the component Javascript of the layout to the client.

### Importing Server Components into Client Components

Server and Client Components can be interleaved in the same component tree. Behind the scenes, React will merge the work of both environments.

However, in React, there's a restriction around importing Server Components inside Client Components because Server Components might have server-only code (e.g. database or filesystem utilities).

You can pass a Server Component as a child or prop of a Client Component. You can do this by wrapping both components in another Server Component.

[Read Server and Client Components](https://beta.nextjs.org/docs/rendering/server-and-client-components)

## Static and Dynamic Rendering

In Next.js, a route can be statically or dynamically rendered.

1. In a static route (default), components are rendered on the server at build time. The result of the work is cached and reused on subsequent requests.
2. In a dynamic route, components are rendered on the server at request time.

### Static Rendering (Default)

Static rendering (default) improves performance because all the rendering work is done ahead of time and can be served from a Content Delivery Network (CDN) geographically closer to the user.

You can opt into dynamic rendering by using a dynamic function or dynamic data fetching in a layout or page. This will cause Next.js to render the whole route dynamically, at request time.

[Read Static Rendering Deals](https://beta.nextjs.org/docs/rendering/static-and-dynamic-rendering#static-rendering-default)







