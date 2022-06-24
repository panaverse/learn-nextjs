import PostHead from '../../components/PostHead';
import {Post} from '../../components/PostHead';
import posts from '../../data/posts';
import { GetServerSideProps } from 'next';



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.params;
    const post: Post = posts.find((p) => p.slug === slug);
    return {
        props: {
            post
        }
    };
  }

function Post({ post }: Post): JSX.Element {
    return (
        <div>
            <PostHead {...post} />
            <h1>{post.title}</h1>
            <p>{post.subtitle}</p>
        </div>
    );
}

export default Post;