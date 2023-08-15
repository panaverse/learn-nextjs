import 'dotenv/config';
import { PineconeClient } from "@pinecone-database/pinecone";

//console.log(process.env.PINECONE_API_KEY!)

const indexName = "ziaindex"

// Create a client
const client = new PineconeClient();

// Initialize the client
//https://docs.pinecone.io/docs/node-client#init
await client.init({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: process.env.PINECONE_ENVIRONMENT!,
});

async function createIndex(){
  //https://docs.pinecone.io/docs/node-client#createindex
  await client.createIndex({
    createRequest: {
      name: indexName,
      dimension: 4,
    },
  });
  console.log("Index Created");
}

async function upsertVectors(){
    //https://docs.pinecone.io/docs/node-client#indexupsert
    const index = client.Index(indexName);
    const upsertRequest = {
      vectors: [
        {
          id: "vec1",
          values: [0.1, 0.2, 0.3, 0.4],
        },
        {
          id: "vec2",
          values: [0.2, 0.3, 0.4, 0.5],
        },
      ],
      namespace: "zia-namespace",
    };
    const upsertResponse = await index.upsert({ upsertRequest });
    console.log("Vector Upserted");
}

async function queryIndex(){
      //Search a namespace using a query vector. 
      //Retrieves the ids of the most similar items in a namespace,
      //along with their similarity scores.
      //https://docs.pinecone.io/docs/node-client#indexquery
      const index = client.Index(indexName);
      const queryRequest = {
        vector: [0.1, 0.2, 0.3, 0.4],
        topK: 10,
        includeValues: true,
        includeMetadata: true,
        namespace: "zia-namespace",
      };
      const queryResponse = await index.query({ queryRequest });
      console.log("Index Quered");
      console.log(queryResponse);
}

async function deleteIndex(){
  //https://docs.pinecone.io/docs/node-client#deleteindex
  await client.deleteIndex({
    indexName: indexName,
  });
  console.log("Index Deleted");
}



await createIndex();
//Run the program and go to portal to check the portal to see
//if the index is Ready, it will be initializing and take some time
//to become ready.
//Once ready comment the createIndex command and uncomment the three
//line below

//await upsertVectors();
//await queryIndex();
//await deleteIndex();


