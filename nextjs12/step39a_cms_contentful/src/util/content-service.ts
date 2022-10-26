import { createClient } from "contentful";
import { config } from "dotenv";
import { IArticleFields } from "../@types/contentful";

/*
 * We tell TypeScript that those environment variables are always defined.
 * If you want to learn more about this madness, read:
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE_ID: string;
      CONTENTFUL_ACCESS_TOKEN: string;
    }
  }
}

config();

export default class ContentService {
  static get instance() {
    return new ContentService();
  }

  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  async getEntriesByType<T>(type: string) {
    return (
      await this.client.getEntries<T>({
        content_type: type,
      })
    ).items;
  }

  async getArticleBySlug(slug: string) {
    return (
      await this.client.getEntries<IArticleFields>({
        content_type: "article",
        "fields.slug": slug,
      })
    ).items[0];
  }
}