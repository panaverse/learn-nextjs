import { useState } from 'react';
import Head from 'next/head';
import type { NextComponentType, NextPageContext } from "next";

//https://bestofreactjs.com/repo/avneesh0612-react-nextjs-snippets

interface Props {
    pageName: string
};


const Widget: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    const [active, setActive] = useState(false);
    if (active) {
        return (
            <>
                <Head>
                    <title> You're browsing the {props.pageName} page</title>
                </Head>
                <div>
                    <button onClick={() =>setActive(false)}>Restore original title</button>
                    <div>Take a look at the title!</div>
                </div>
            </>
        );
    }
    return (
        <>
            <button onClick={() =>setActive(true)}>Change page title</button>
        </>
    );
}


export default Widget
