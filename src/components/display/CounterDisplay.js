import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faMinus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const CounterDisplay = ({ data, update }) => {
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState(false);
  const [stream, setStream] = useState(false);
  console.log("data", data);

  const increment = () => {
    setIndex(index + 1);
  };
  const decrement = () => {
    index > 0 ? setIndex(index - 1) : null;
  };
  const removeCounter = (id) => {
    fetch("http://localhost:3000/api/counter/" + id, {
      method: "DELETE",
    }).then((res) => console.log(res));
  };
  const editCounter = () => {
    update({ counterData: data, update: true });
  };

  return (
    <div className="counterDisplay">
      <button className="counterStream" onClick={() => setStream(!stream)}>
        {!stream ? (
          <div>
           <a target="_blank" href="http://localhost:3000/stream/counter" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEye} />
          </a>
          </div>
          
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        )}
       
      </button>
      <h1>{data.title}</h1>
      <div className="counterColor" style={{ backgroundColor: data.color }} />
      <div className="counterButtonContainer">
        <div className="counterOperationContainer">
          <button className="counterOperation" onClick={increment}>
            {" "}
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className="counterOperation" onClick={decrement}>
            {" "}
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div className="counterCrud">
          <div className="options" onClick={() => setOptions(!options)}>
            ...
          </div>
          {options && (
            <div className="counterCrud">
              <button className="counterEdit" onClick={() => editCounter()}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className="counterDelete"
                onClick={() => removeCounter(data._id)}
              >
                <FontAwesomeIcon icon={faTrash} />{" "}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounterDisplay;
