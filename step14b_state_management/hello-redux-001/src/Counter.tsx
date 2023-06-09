"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { counterActions } from "./store/slice/counterSlice";

const CounterView = () => {
  const dispatch = useDispatch();

  const counterValue = useSelector(
    (state: RootState) => state.counterSlice.value
  );

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };
  return (
    <div className="py-6 flex gap-6 justify-center">
      <button className="py-4 px-3 rounded-md bg-green-500" onClick={increment}>
        Increment
      </button>
      <div>Counter Value {counterValue}</div>
      <button className="py-4 px-3 rounded-md bg-red-400" onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

export default CounterView;
