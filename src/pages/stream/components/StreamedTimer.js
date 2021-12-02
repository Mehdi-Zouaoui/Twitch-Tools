import { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const StreamedTimer = ({ data }) => {
  const [index, setIndex] = useState(0);
  const interval = useRef();
  const [time, setTime] = useState(0);
  console.log(data);
  if (data.started) {
    interval.current = setInterval(() => {
      console.log("started");
    }, 1000);
  }
  if(data.started === false) {
    clearInterval(interval.current);
  }

  return (
    <div className="stream">
      <div>{data.title}</div>
    </div>
  );
};

export default StreamedTimer;
