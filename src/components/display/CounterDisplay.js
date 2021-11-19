import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye , faEyeSlash , faPlus , faMinus } from "@fortawesome/free-solid-svg-icons";

const CounterDisplay = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [stream , setStream] = useState(false)

  const increment = () => {
    setIndex(index + 1);
  };
  const decrement = () => {
    index > 0 ? setIndex(index - 1) : null;
  };

  return (
    <div className="counterDisplay">
      <h1>{data.title}</h1>
      <button> {stream ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> } </button>
      <button onClick={increment}> <FontAwesomeIcon icon={faPlus} /></button>
      <button onClick={decrement}> <FontAwesomeIcon icon={faMinus} /></button>
      <div>{index}</div>
    </div>
  );
};

export default CounterDisplay;
