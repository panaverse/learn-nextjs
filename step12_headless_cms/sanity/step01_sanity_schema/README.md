## This step will get you started modeling your content by configuring your first schema for Sanity Studio.

### Step 1: Defining your first document type
Let's build a simple content model for holding a collection of pets, real or not. Sanity Studio will automatically build a user interface from the schema where you describe your content models.

A document type is similar to a “collection” if you’re used to NoSQL/document databases or a table if you know relational databases. In the JSON documents that the Studio writes to, it will appear as a _type property. It’s very common to use this property to query for your content; for example *[_type == "pet"].

Let's make a studio that can hold a collection of pets, starting with recording their names.

#### To make your first document type, do the following:
 
1. Head over to the `/sanity` folder 
2. Create a new file inside of the `sanity` folder and call it `pet.ts`
3. Open `pet.ts` and add the following code to it.

```typescript
// sanity/pet.ts
export default {
    name: 'pet',
    type: 'document',
    title: 'Pet',
    fields: [
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        }
    ]
}
```

### Step 2: Import Document Type Definition

In this step we need to import this document type definition into `schema.ts` and add it to the array of types. Open `sanity/schema.ts` and do the following:

```typescript
// sanity/schema.ts
import { type SchemaTypeDefinition } from 'sanity'
import pet from './pet'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pet],
}

```

Now, you can save and run the command npm run dev in your command line if you haven’t started it already. Head over to `http://localhost:3000/studio`. If everything went as it should, you’ll see Pet appearing to the left. Congrats, this is your first schema type!

You can now click the pencil button 📝 to create a new Pet document

### Step 3: Editing Content
As you can see, the form has just one input field that lets you type text. It could be any pet or whatever you can come up with!

When you’re editing, it activates the synchronization indicator in the bottom left corner of your document pane. This is the studio syncing your changes in real time with the hosted Content Lake. In other words, you’re editing content online, even though your studio is running locally. There’s no need to save!

#### Press the green Publish button to Publish the content

## Resources
#### [Create a Sanity project](https://www.sanity.io/docs/create-a-sanity-project)
#### [Create a schema and configure Sanity Studio](https://www.sanity.io/docs/create-a-schema-and-configure-sanity-studio#63e6f677a632)