import Link from 'next/link';
import Image from 'next/image';
import { cutTextToLength, composeArticleSlug } from '../../utils';
import { Article } from '../../data/articles';

const ArticleCard = (article: Article) => {
  const articleURL = `/articles/${composeArticleSlug(article.id, article.title)}`;
  return (
    <div style={{ width: "275px", margin: "10px" }}>
      <Link href={articleURL} passHref >
        <a style={{ textDecoration: "none", color: "black" }}>
          <div>
            <Image
              src={article.image.url}
              alt={article.title}
              width="275px" height="200px"
            />
          </div>

          <div>
            <div>{article.title}</div>
            <div>{cutTextToLength(article.body, 100)}</div>
            <hr />
            <div>Written by {article.author.name}</div>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default ArticleCard;