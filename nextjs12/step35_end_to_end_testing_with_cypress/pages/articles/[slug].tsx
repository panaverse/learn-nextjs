import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../../data/articles';
import { extractArticleIdFromSlug } from '../../utils';


export const getServerSideProps = async ({ params }: any) => {
  const articleID = extractArticleIdFromSlug(params.slug);
  const articleReq = await fetch(`http://localhost:3000/api/article?id=${articleID}`);
  const article = await articleReq.json();

  if (articleReq.status === 404) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  return {
    props: {
      article,
    },
  };
}

const ArticlePage: NextPage<{ article: Article }> = ({ article }) => {
  return (
    <div style={{ margin: "20px" }}>

      <div style={{ margin: "20px 0px" }}>
        <Link href="/" passHref>
          <a>Back to homepage</a>
        </Link>
      </div>

      <div>
        <Image src={article.image.url} alt={article.title} height="300px" width="500px" objectFit="cover" />
        <div>
          Image by <span className="font-bold">{article.image.author}</span> on Unsplash
        </div>
      </div>
      <div>
        <h1>{article.title}</h1>
        <h2> Written by {article.author.name} </h2>
        <hr />
        <p>{article.body}</p>
      </div>
    </div>
  );
}

export default ArticlePage;