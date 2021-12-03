import { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const StreamedTimer = ({ data }) => {
  const [index, setIndex] = useState(0);
  const interval = useRef();
  const [time, setTime] = useState(0);
  console.log(data);
  if (data.started) {
    console.log('running')
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      console.log("started");
      setTime(time+1)
    }, 1000);
  }
  if(data.started === false) {
    clearInterval(interval.current);
  }

  return (
    <div className="stream">
      <div>{data.title}</div>
      <div>{time}</div>
    </div>
  );
};

export default StreamedTimer;
