import Link from 'next/link';
import type { NextComponentType, NextPageContext } from "next";

//https://bestofreactjs.com/repo/avneesh0612-react-nextjs-snippets
//https://nextjs.org/docs/api-reference/next/link

interface Props {};

const Navbar : NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    return (
        <div>
            <ul>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/contact' prefetch={false}>Contact</Link></li>
            </ul>
        </div>
    );
};
export default Navbar;
