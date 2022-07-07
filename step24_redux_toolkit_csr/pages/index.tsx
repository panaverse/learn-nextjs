import type { NextPage } from 'next';
import { useState } from 'react';
import { selectCount, useAppDispatch, useAppSelector } from '../store/hooks';
import { decrement, increment, multiply, divide, incrementByAmount, multiplyByAmount } from '../store/counterSlice';


const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  const buttonStyle = { width: "200px", marginRight: "5px" }

  return (
    <>
      <h1>Welcome to the greatest app in the world!</h1>
      <h2>
        The current number is {count}
      </h2>


      <div>
        <button style={buttonStyle} onClick={() => dispatch(increment())}>Add 1</button>
        <button style={buttonStyle} onClick={() => dispatch(decrement())}>Minus 1</button>
      </div>

      <div>
        <button style={buttonStyle} onClick={() => dispatch(multiply())}>Multily by 2</button>
        <button style={buttonStyle} onClick={() => dispatch(divide())}>Divide by 2</button>
      </div>

      <br />

      <div>
        <input
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          type="number"
        />

        <div>
          <button style={buttonStyle} onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}>
            Increment by amount
          </button>
          <button style={buttonStyle} onClick={() => dispatch(multiplyByAmount(Number(incrementAmount)))}>
            Multiply by amount
          </button>
        </div>


      </div>
    </>
  )
}

export default Home
