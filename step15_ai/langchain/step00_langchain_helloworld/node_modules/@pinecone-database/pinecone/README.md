# Pinecone Node.js Client

This is the Node.js client for Pinecone, written in Typescript. It is a wrapper around the Pinecone OpenAPI spec.

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)
[![Npm package version](https://badgen.net/npm/v/pinecone-ts-client)](https://npmjs.com/package/@pinecone-database/pinecone)

> **_⚠️ Warning_**
>
> This is a **public preview** ("Beta") client. Test thoroughly before
> using this client for production workloads. No SLAs or technical support
> commitments are provided for this client. Expect potential breaking
> changes in future releases.

## Installation

```
npm i @pinecone-database/pinecone
```

## Usage

Set the following environment variables:

```bash
PINECONE_API_KEY=your_api_key
PINECONE_ENVIRONMENT=your_environment
```

## Initializing the client

```typescript
import { PineconeClient } from "@pinecone-database/pinecone";

// Create a client
const client = new PineconeClient();

// Initialize the client
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
```

## Control plane operations

The Pinecone control plane allows you to perform the following operations:

1. Create, configure and delete indexes
2. Get information about an existing indexes
3. Create and delete collections
4. Select an index to operate on

## Indexes

### Create Index

```ts
const createRequest: CreateRequest = {
  name: indexName,
  dimension: dimensions,
  metric,
};

await client.createIndex({ createRequest });
```

### Delete Index

```ts
await client.deleteIndex({ indexName });
```

### Describe Index

```ts
const indexDescription = await client.describeIndex({ indexName });
```

Example result:

```json
{
  "database": {
    "name": "my-index",
    "metric": "cosine",
    "dimension": 10,
    "replicas": 1,
    "shards": 1,
    "pods": 1,
    "pod_type": "p1.x1"
  },
  "status": {
    "waiting": [],
    "crashed": [],
    "host": "my-index-[project-id].svc.[environment].pinecone.io",
    "port": 433,
    "state": "Ready",
    "ready": true
  }
}
```

### List Indexes

```ts
const list = await client.listIndexes();
```

Example result:

```json
["index1", "index2"]
```

### Select an index

To operate on an index, you must select it. This is done by calling the `Index` method on the client.

```ts
const index = client.Index(indexName);
```

## Collections

### Create Collection

```ts
const createCollectionRequest: CreateCollectionRequest = {
  name: collection,
  source: indexName,
};
await client.createCollection({ createCollectionRequest });
```

### Delete Collection

```ts
await client.deleteCollection(collection);
```

### Describe Collection

```ts
const describeCollection = await client.describeCollection({ collectionName });
```

Example result:

```json
{
  "name": "my-collection",
  "status": "Ready",
  "size": 3059815,
  "dimension": 10
}
```

### List Collections

```ts
const list = await client.listCollections();
```

Example result:

```json
["collection1", "collection2"]
```

## Index operations

The Pinecone index operations allow you to perform the following operations instances of `Vector`.

A `Vector` is defined as follows:

```ts
type Vector = {
  id: string;
  values: number[];
  metadata?: object;
  sparseValues: {
    indices: [15, 30, 11];
    values: [0.1, 0.2, 0.3];
  }; // optional sparse values
};
```

After selecting an index to operate on, you can:

### Upsert vectors

```ts
const upsertRequest: UpsertRequest = {
  vectors,
  namespace,
};
await index.upsert({ upsertRequest });
```

### Query vectors

```ts
const vector = [...] // a vector

const queryRequest: QueryRequest = {
  topK: 1,
  vector,
  namespace,
  includeMetadata: true,
  includeValues: true,
}
```

To query with a sparse vector:

```ts
const queryRequest: QueryRequest = {
  topK: 1,
  vector,
  namespace,
  includeMetadata: true,
  includeValues: true,
  sparseVector: {
    indices: [15, 30, 11],
    values: [0.1, 0.2, 0.3],
  },
};
```

To execute the query:

```ts
const queryResponse = await index.query({ queryRequest });
```

### Update a vector

```ts
const updateRequest: UpdateRequest = {
  id: vectorId, // the ID of the vector to update
  values: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // the new vector values
  sparseValues: {
    indices: [15, 30, 11],
    values: [0.1, 0.2, 0.3],
  }, // optional sparse values
  setMetadata: metadata, // the new metadata
  namespace,
};
await index.update({ updateRequest });
```

### Fetch vectors by their IDs

```ts
const fetchResult = await index.fetch({
  ids: [vectorIDs],
  namespace,
});
```

### Delete vectors

```ts
await index.delete1({
  ids: [vectorIDs],
  namespace,
});
```

### Delete all vectors in a namespace

```ts
await index.delete1({
  deleteAll: true,
  namespace,
});
```
