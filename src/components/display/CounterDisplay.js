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
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { counter } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

const CounterDisplay = ({ data, update, counters, setCounters }) => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState(false);
  const [stream, setStream] = useState(false);
  const url = "http://localhost:3000";
  useEffect(() => {
  
  },[]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const streamCounter = (data) => {
    data.isStreamed = true;
    axios
      .put(url + "/api/counter/" + data._id, data)
      .then((res) => {
        console.log("res", res);
        refreshData();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const increment = (data) => {
    data.value += 1;
    axios
      .put(url + "/api/counter/" + data._id, data)
      .then((res) => {
        console.log("res", res);
        refreshData();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const decrement = (data) => {
    data.value > 0 ? (data.value -= 1) : (data.value = 0);
    axios
      .put(url + "/api/counter/" + data._id, data)
      .then((res) => {
        console.log("res", res);
        refreshData();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const removeCounter = (id) => {
    fetch("http://localhost:3000/api/counter/" + id, {
      method: "DELETE",
    }).then((res) => {
      setCounters(counters.filter((item) => item._id !== id));
      console.log(res);
      refreshData();
    });
  };
  const editCounter = () => {
    update({ counterData: data, update: true });
    console.log("update Data", data);
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
        {data.isStreamed === false ? (
          <div onClick={() => streamCounter(data)}>
            <FontAwesomeIcon icon={faEye} />
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
          <button className="counterOperation" onClick={() => decrement(data)}>
            {" "}
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <div>
          <button className="counterUndo">
            <FontAwesomeIcon icon={faUndo} />
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
