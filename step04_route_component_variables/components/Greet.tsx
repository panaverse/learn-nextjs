import { useRouter } from 'next/router';

function Greet(): JSX.Element {
    const { query } = useRouter();
    console.log(query);
    return <h1>Hello {query.name}!</h1>;
}

export default Greet;