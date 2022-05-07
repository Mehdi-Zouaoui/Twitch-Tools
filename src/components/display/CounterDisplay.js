import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@apollo/client";
import { DELETE_COUNTER, UPDATE_COUNTER } from "../../../graphql/queries";
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
  const [deleteCounter] = useMutation(DELETE_COUNTER, {
    onCompleted: (data) => {
      console.log("completed");
      refreshData();
    },
    // onError(err) {
    //   console.log("error here", err);
    // },
  });
  const [updateCounter] = useMutation(UPDATE_COUNTER, {
    onCompleted: (data) => {
      console.log("completed");
      refreshData();
    },
    // onError(err) {
    //   console.log("error here", err);
    // },
  });
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState(false);
  const [stream, setStream] = useState(false);
  const url = "http://localhost:3000";
  useEffect(() => {}, []);

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
    console.log(data.id)
   
    updateCounter({
      variables: {
        id: data.id,
        counter: {
          value: data.value,
        },
      },
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
    deleteCounter(id);
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
