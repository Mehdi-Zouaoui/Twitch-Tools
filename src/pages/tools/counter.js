import { useState } from "react";
const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");
  const increase = () => {
    setCounter(counter + 1);
  };
  const deacrease = () => {
    setCounter(counter - 1);
  };
  return (
    <div>
      <h4>{title} :</h4>
      <div>
        <div>{counter}</div>
        <div>
          <button onClick={() => increase()}>+</button>
          <button onClick={() => deacrease()}>-</button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
