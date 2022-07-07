import React from "react";
import { useSelector } from 'react-redux'
import { AppState } from "../store/store";

const Counter = () => {

  const {counter} = useSelector((state: AppState) => state.counter)

  return (
    <div>
        Counter: <span>{counter}</span>
    </div>
  )
}

export default Counter