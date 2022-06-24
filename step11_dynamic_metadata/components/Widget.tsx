import { useState } from 'react';
import Head from 'next/head';


function Widget({pageName}: {pageName: string}) : JSX.Element{
    const [active, setActive] = useState(false);
    if (active) {
        return (
            <>
                <Head>
                    <title> You're browsing the {pageName} page</title>
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

export default Widget;
