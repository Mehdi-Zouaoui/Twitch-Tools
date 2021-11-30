import { useState } from "react";
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

const CounterDisplay = ({ data, update }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState(false);
  const [stream, setStream] = useState(false);
  const counters = JSON.parse(localStorage.getItem("counters"));

  counters.forEach((item, index) => {
    console.log("item", item);
  });


  const refreshData = () => {
    router.replace(router.asPath);
  };

  const setAndRedirect = (data) => {
    console.log('show' ,stream)
   
      console.log("test boolean", stream);
      counters.push({ ...data, value: index });
      localStorage.setItem("counters", JSON.stringify(counters));
      return (
        <div>
          <Link href="http://localhost:3000/stream/counter">
            <a target="_blank" id="opener" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faEye} />
            </a>
          </Link>
        </div>
      );
  };

  const removeAndUnshow = () => {
    console.log("unshow", stream);
    counters.forEach((item, index) => {
      console.log(item)
    });
    return(
      <FontAwesomeIcon icon={faEyeSlash} />
    )
  };

  const increment = () => {
    setIndex(index + 1);
    localStorage.setItem(
      `counter${data._id}`,
      JSON.stringify({ ...data, value: index })
    );
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
      <button className="counterStream" onClick={() => setStream(!stream)}>
        {stream ? setAndRedirect(data) : removeAndUnshow() }
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
