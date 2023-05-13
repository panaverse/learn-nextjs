import 'dotenv/config';
import { PineconeClient } from "@pinecone-database/pinecone";
//console.log(process.env.PINECONE_API_KEY!)
// Create a client
const client = new PineconeClient();
// Initialize the client
await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
});
