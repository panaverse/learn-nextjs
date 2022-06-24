import Head from 'next/head';

interface PostMetaProps{
    title: string;
    subtitle: string;
    image: string;
    description: string;
}

function PostMeta({title, subtitle, image, description}: PostMetaProps): JSX.Element {
    return (
        <Head>
            <title> {title} </title>
            <meta name="description" content={subtitle} />
            {/* open-graph meta */}
            <meta property="og:title" content={title} />
            <meta property="og:description"
            content={subtitle} />
            <meta property="og:image" content={image} />
            {/* twitter card meta */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
export default PostMeta;