
import { useState } from "react";

const Counter = ({ data }) => {
  const [index, setIndex] = useState(0);

  const increment = () => {
    setIndex(index + 1);
  };
  const decrement = () => {
    index > 0 ? setIndex(index - 1) : null;
  };

  return (
    <div className="counterDisplay">
      <h1>Counter</h1>
      <div className="counterButtonContainer">
      <button>Display</button>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      </div>
      <div>{index}</div>
    </div>
  );
};

export default Counter;
