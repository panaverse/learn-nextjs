# Fetching Data on the Server Dynamic

[Dynamic Data Fetching](https://beta.nextjs.org/docs/data-fetching/fetching#dynamic-data-fetching)

Note: 

Next.js extends the native Web fetch() API to support caching.

fetch(`https://...`, { cache: 'force-cache' });

fetch(`https://...`, { cache: 'no-store' });

fetch(`https://...`, { next: { revalidate: false | 0 | number } } });

The default behavior is fetch(https://..., { cache: 'force-cache' }).