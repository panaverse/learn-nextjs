import Link from 'next/link';
import type { NextComponentType, NextPageContext } from "next";

//https://bestofreactjs.com/repo/avneesh0612-react-nextjs-snippets

interface Props {};

const PrivateComponent: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    return (
        <div>
           This is private component.
        </div>
    );
};
export default PrivateComponent;

