
import { NextPage } from "next";
import { Article } from "../data/articles";
import ArticleCard from '../components/ArticleCard';

export const getServerSideProps = async () => {
  const articlesReq = await fetch('http://localhost:3000/api/articles');
  const articles: Article[] = await articlesReq.json();

  return {
    props: {
      articles
    },
  };
}

const Home: NextPage<{ articles: Article[] }> = ({ articles }) => {
  return (
    <>
      <div>
        <h1>My awesome blog</h1>
        <h2>
          This is an example blog for running unit and integration tests
        </h2>
      </div>
      <div style={{margin: "10px", display: "flex"}}>
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </>
  );
}

export default Home;