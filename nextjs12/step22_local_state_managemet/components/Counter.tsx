import React, { useState } from "react";
import type { NextComponentType, NextPage, NextPageContext } from "next";

interface Props {
    initialCount?: number
}

const Counter: NextComponentType<NextPageContext, {}, Props> = ({ initialCount = 0 }: Props) => {
    const [count, setCount] = useState(initialCount);
    return (
        <div>
            <b>Count is: {count}</b><br />
            <button onClick={() => setCount(count + 1)}>
                Increment +
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement -
            </button>
        </div>
    )
}
export default Counter;