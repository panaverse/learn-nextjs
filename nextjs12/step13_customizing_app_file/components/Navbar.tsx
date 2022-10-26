import Link from 'next/link';
import type { NextComponentType, NextPageContext } from "next";

//https://bestofreactjs.com/repo/avneesh0612-react-nextjs-snippets

interface Props {};

const Navbar: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    return (
    <div>
        <div>My Website</div>
        <div>
            <Link href="/">Home </Link>
            <Link href="/about">About </Link>
            <Link href="/contacts">Contacts </Link>
        </div>
    </div>
    );
};

export default Navbar;


