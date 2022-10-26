import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { IArticleFields } from "../src/@types/contentful";
import ContentService from "../src/util/content-service";
import styles from "../styles/Home.module.css";

interface Props {
  article: IArticleFields;
}

export const getStaticPaths: GetStaticPaths = async () => {

  const articles = await ContentService.instance.getEntriesByType<IArticleFields>("article");
  const paths = articles.map((article) => ({
    params: {
      slug: article.fields.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (ctx) => {
  const { slug } = ctx.params!;
  const article = await ContentService.instance.getArticleBySlug(slug);

  if (!article) {
    return { notFound: true };
  }

  return {
    props: {
      article: article.fields,
    },
  };
};

const Article: NextPage<Props> = ({
  article: { title, description, publishDate, content },
}) => (
  <div className={styles.container}>
    <Head>
      <title>{title} | My awesome Harry Potter blog</title>
      <meta name="description" content={description} />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <time dateTime={publishDate} className={styles.publishDate}>
        Published on {publishDate}
      </time>

      <div className={styles.article}>{documentToReactComponents(content)}</div>
    </main>
  </div>
);

export default Article;

