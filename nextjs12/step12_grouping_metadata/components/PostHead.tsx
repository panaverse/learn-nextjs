import Head from 'next/head';
import type { NextComponentType, NextPageContext } from "next";

//https://bestofreactjs.com/repo/avneesh0612-react-nextjs-snippets

interface Props {
    title: string;
    subtitle: string;
    image: string;
    description?: string;
}
    

const PostHead: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    return (
        <Head>
            <title> {props.title} </title>
            <meta name="description" content={props.subtitle} />
            {/* open-graph meta */}
            <meta property="og:title" content={props.title} />
            <meta property="og:description"
            content={props.subtitle} />
            <meta property="og:image" content={props.image} />
            {/* twitter card meta */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.image} />
        </Head>
    );
}
export default PostHead;
