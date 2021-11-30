import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faMinus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { counter } from "@fortawesome/fontawesome-svg-core";

const CounterDisplay = ({ data, update , counters }) => {
  console.log("counter" , counters)
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState(false);
  const [stream, setStream] = useState(false);
 

  useEffect(() => {
    if (stream) {
      counters.push({ ...data, value: index });
      console.log("data", data);
    } else {
      counters = counters.filter((item) => item._id !== data._id);
    }

    localStorage.setItem("counters", JSON.stringify(counters));
  }, [stream]);


  const refreshData = () => {
    router.replace(router.asPath);
  };

  const increment = (data) => {
    setIndex(index + 1);
    counters = counters.map(item => item._id === data._id ? {...item , value : index} : {...item});
    console.log("yesyesyes",counters)
    localStorage.setItem("counters", JSON.stringify(counters));
  };
  const decrement = () => {
    index > 0 ? setIndex(index - 1) : null;
    localStorage.setItem(
      `counter${data._id}`,
      JSON.stringify({ ...data, value: index })
    );
  };
  const removeCounter = (id) => {
    fetch("http://localhost:3000/api/counter/" + id, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
      refreshData();
    });
  };
  const editCounter = () => {
    update({ counterData: data, update: true });
  };

  return (
    <div className="counterDisplay">
      <button
        className="counterStream"
        onClick={() => {
          console.log("before", stream);
          setStream(!stream);
        }}
      >
        {stream === false ? (
          <div>
   
              <a href="http://localhost:3000/stream/counter" target="stream">
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
          <button className="counterOperation" onClick={() => increment(data)}>
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
