// sanity/schema.ts
import { type SchemaTypeDefinition } from 'sanity'
import pet from './pet'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pet],
}
