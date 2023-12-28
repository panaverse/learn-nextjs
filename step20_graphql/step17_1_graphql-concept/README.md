## GraphQL Schema

The GraphQL schema is defined in `graphql/schema.graphql` and includes the following types:

- `Date`: A custom scalar type to represent dates.
- `Query`: Contains a `getTodos` field that can accept an optional `id` argument and returns an array of `todo` objects.
- `todo`: Represents a to-do item and includes fields like `id`, `title`, `description`, `isCompleted`, and `createdAt`.
- `Mutation`: Contains a `createTodo` field that takes a `todoInput` as an argument and returns a newly created `todo`.

## Using GraphQL

To interact with the GraphQL API, you can use tools like Apollo Client. The GraphQL endpoint for this app is available at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) when your app is running.

## Learning Resources

To deepen your understanding of the technologies used in this project, consider exploring the following resources:
- [Video Series](https://www.youtube.com/watch?v=3NFbMpDrJEU&list=PLOfLYVXrwqXqByJIeE1ZJH9XbqRZYEE7h)
- [Next.js Documentation](https://nextjs.org/docs)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)


