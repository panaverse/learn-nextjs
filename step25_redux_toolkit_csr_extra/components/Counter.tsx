import React from "react";
import { useSelector } from 'react-redux'
import { RootState } from "../store/store";

const Counter = () => {

  const { counter } = useSelector((state: RootState) => state.reducer.counter)

  return (
    <div>
        Counter: <span>{counter}</span>
    </div>
  )
}

export default Counter