import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { IArticleFields } from "../src/@types/contentful";
import styles from "../styles/Home.module.css";
import ContentService from "../src/util/content-service";

interface Props {
  articles: IArticleFields[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = (
    await ContentService.instance.getEntriesByType<IArticleFields>("article")
  ).map((entry) => entry.fields);

  return {
    props: {
      articles,
    },
  };
};

const Home: NextPage<Props> = ({ articles }) => (
  <div className={styles.container}>
    <Head>
      <title>My awesome Harry Potter blog</title>
      <meta
        name="description"
        content="This is a blog with many intersting articles about Harry Potter."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to my Harry Potter blog!</h1>

      <p className={styles.description}>
        This is a blog with many intersting articles about Harry Potter.
      </p>

      <div className={styles.grid}>
        {articles.map((article) => (
          <a
            key={article.slug}
            href={`/${article.slug}`}
            className={styles.card}
          >
            <h2>{article.title} &rarr;</h2>
            <p>{article.description}</p>
          </a>
        ))}
      </div>
    </main>
  </div>
);

export default Home;