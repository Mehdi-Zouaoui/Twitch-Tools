import { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// const renderTime = ({ remainingTime }) => {
//   return (
//     <div className="timer">
//       <div className="value">{remainingTime}</div>
//     </div>
//   );
// };

const StreamedTimer = ({ data }) => {
  const [index, setIndex] = useState(0);
  const interval = useRef();
  const [originalTime, setOriginalTime] = useState(
    data.values ? data.values : 0
  );
  const [time, setTime] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondes, setSecondes] = useState(0);
  const [millisecondes, setMilliseconds] = useState(0);

  if (data.started && data.type === false) {
    // let timeTest = data.values;
    // console.log(timeTest);
    console.log("values in loop", time);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      let getSeconds = parseInt(Math.floor(time / 1000));
      const getHours = parseInt(Math.floor(getSeconds / 360));
      getSeconds = getSeconds % 3600; // seconds remaining after extracting hours
      const getMinutes = parseInt(Math.floor(getSeconds / 60));
      getSeconds = getSeconds % 60;

      const d = parseInt(Math.floor(getSeconds / 60 / 60 / 24));
      getSeconds = getSeconds % 86400;

      setDays(d);
      setHours(getHours);
      setMinutes(getMinutes);
      setSecondes(getSeconds);
      setTime(time - 1000);
    }, 1000);
  }
  if (data.started && data.type === true) {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      const getMilliseconds = Math.floor((time % 1000) / 100);
      const getSeconds = Math.floor((time / (1000 * 60)) % 60);
      const getMinutes = Math.floor((time / 1000) % 60);
      const getHours = Math.floor((time / (1000 * 60 * 60)) % 24);
      setMilliseconds(getMilliseconds);
      setHours(getSeconds);
      setMinutes(getMinutes);
      setSecondes(getHours);
      // setDays(getDays);
      setTime(time + 10);
    }, 10);
  }
  if (data.started === false) {
    clearInterval(interval.current);
    if (data.restart === true) {
      console.log("stoped , you wanna restart ?");
      data.type === false
        ? setTime(originalTime)
        : setTime((prevTime) => prevTime * 0);
      console.log("values", time, originalTime);
      data.restart = false;
    }
  }

  return (
    <div className="stream">
      <div>{data.title}</div>
      <div style={{ display: "flex" }}>
        <p>{days} : </p>
        <p>{hours} : </p>
        <p>{minutes} : </p>
        <p>{secondes} </p>
        <p>{millisecondes} </p>
      </div>
    </div>
  );
};

export default StreamedTimer;
