import { useRouter } from 'next/router';
import type { NextComponentType, NextPageContext } from "next";

https://bestofreactjs.com/repo/avneesh0612-react-nextjs-snippets

interface Props {}

const Greet: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    const { query } = useRouter();
    console.log(query);
    return <h1>Hello {query.name}!</h1>;
};

export default Greet;

