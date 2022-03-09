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
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondes, setSecondes] = useState(0);
  console.log(data);

  if (data.started) {
    console.log("running");
    console.log("Coutdown", data.values);
    let timeTest = data.values;
    console.log(time);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      let total_s = parseInt(Math.floor(timeTest / 1000));
      console.log("total S", total_s);
      let total_m = parseInt(Math.floor(total_s / 60));
      let total_h = parseInt(Math.floor(total_m / 60));
      let d = parseInt(Math.floor(total_h / 24));

      let s = parseInt(total_s % 60);
      let m = parseInt(total_m % 60);
      let h = parseInt(total_h % 24);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSecondes(s);
      timeTest = timeTest - 1000;
    }, 1000);
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
        <p>{days} </p>
        <p>{hours} : </p>
        <p>{minutes} : </p>
        <p>{secondes}  </p>
   
      </div>
    </div>
  );
};

export default StreamedTimer;
