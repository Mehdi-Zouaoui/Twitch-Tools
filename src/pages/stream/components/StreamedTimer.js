import { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

const StreamedTimer = ({ data }) => {
  const [index, setIndex] = useState(0);
  const interval = useRef();
  const [time, setTime] = useState(0);
  console.log(data);

  if (data.started) {
    console.log("running");
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
      console.log("time", ("0" + ((time / 10) % 100)).slice(-2));
    }, 10);
  }
  if (data.started === false) {
    clearInterval(interval.current);
    if (data.restart === true) {
      console.log("stoped , you wanna restart ?");
      setTime((prevTime) => prevTime * 0);
      data.restart = false;
    }
  }

  return (
    <div className="stream">
      <div>{data.title}</div>
      <div style={{ display: "flex" }}>
        <p>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)} : </p>
        <p>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)} : </p>
        <p>{("0" + ((time / 10) % 100)).slice(-2)}</p>
      </div>
    </div>
  );
};

export default StreamedTimer;
