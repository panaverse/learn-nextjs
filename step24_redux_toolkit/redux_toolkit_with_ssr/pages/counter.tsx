import React from 'react'
import { useDispatch } from 'react-redux'
import { increment, decrement } from "../store/counterSlice";

const btnStyle = {
  margin: "5px",
  border: "1px solid black",
  width: "50px",
  height: "50px"
}

const counter = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <div style={{ marginTop: "20px" }}>
        All state changes are happening on <b>Client Side</b>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div>Change the Count</div>
        <div>
          <button style={btnStyle} onClick={() => dispatch(decrement())}>-1</button>
          <button style={btnStyle} onClick={() => dispatch(increment())}>+1</button>
        </div>
      </div>

    </div>
  )
}

export default counter