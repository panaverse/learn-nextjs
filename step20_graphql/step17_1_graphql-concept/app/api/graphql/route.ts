import { ApolloServer } from "@apollo/server"
import gql from "graphql-tag"
import { startServerAndCreateNextHandler } from '@as-integrations/next';

type todo = {
    id: Number,
    title: String,
    description: String,
    isCompleted: Boolean,
    createdAt: Date
}

var todos: todo[] = [{
    id: 2,
    title: 'Grocery Shopping',
    description: `Buy groceries for the week, including fruits, vegetables, milk, eggs, and bread. Don't forget to check for any discounts or special offers at the store.`,
    isCompleted: false,
    createdAt: new Date
},
{
    id: 3,
    title: 'Prepare for Presentation',
    description: 'Get ready for the upcoming presentation at work. Create an outline of key points, gather supporting data and statistics, and practice the presentation at least twice to ensure confidence during the meeting.',
    isCompleted: true,
    createdAt: new Date
}
]

const typeDefs = gql`
    scalar Date
    type Query{
        getTodos(id:Int): [todo]
    }
 
    type todo{
        id:Int 
        title: String,
        description:String,
        isCompleted:Boolean
        createdAt: Date
    }

    type Mutation{
        createTodo(todo:todoInput): todo
    }

    input todoInput{
        title: String,
        description:String,
    }
`

const resolvers = {
    Query: {
        getTodos: (root: {}, args: { id: Number }) => {
            console.log("args", args)
            if (args.id) {
                return todos.filter((todo) => todo.id === args.id)
            }
            return todos
        }
    },
    Mutation: {
        createTodo: async (root: {}, args: { todo: todo }, context: {}, info: {}) => {
            console.log('args', args)
            let newTodo: todo = {
                id: Math.round(Math.random() * 1000),
                title: args.todo.title,
                description: args.todo.description,
                isCompleted: false,
                createdAt: new Date()
            }

            todos.push(newTodo)
            return newTodo
        }
    }
}

const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };



