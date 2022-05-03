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
    console.log('Countdown')
    setTime(originalTime);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      let getMilliseconds = parseInt(Math.floor(time));
      const getDays = parseInt(
        Math.floor(getMilliseconds / (1000 * 3600 * 24))
      );
      getMilliseconds = getMilliseconds % (24 * 3600 * 1000);
      const getHours = parseInt(Math.floor(getMilliseconds / (3600 * 1000)));
      getMilliseconds = getMilliseconds % (3600 * 1000);
      const getMinutes = parseInt(Math.floor(getMilliseconds / (60 * 1000)));
      getMilliseconds = getMilliseconds % (60 * 1000);
      const getSeconds = parseInt(Math.floor(getMilliseconds / 1000));
      getMilliseconds = getMilliseconds % 1000;

      setDays(getDays);
      setHours(getHours);
      setMinutes(getMinutes);
      setSecondes(getSeconds);
      setMilliseconds(getMilliseconds);
      setTime(time - 10);
    }, 10000);
  }
  if (data.started && data.type === true) {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      const getMilliseconds = Math.floor(time % 1000);
      const getSeconds = Math.floor((time / 1000) % 60);

      const getMinutes = Math.floor((time / (1000 * 60)) % 60);
      const getHours = Math.floor((time / (1000 * 60 * 60)) % 24);
      setMilliseconds(getMilliseconds);
      setSecondes(getSeconds);
      setMinutes(getMinutes);
      setHours(getHours);
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p> Days : {days > 9 ? days : "0" + days} </p>
        <p> Hours : {hours > 9 ? hours : "0" + hours} </p>
        <p> Minutes : {minutes > 9 ? minutes : "0" + minutes} </p>
        <p> Secondes : {secondes > 9 ? secondes : "0" + secondes} </p>
        <p>
          {" "}
          Millisecondes :{" "}
          {millisecondes /10  > 9 ? millisecondes / 10 : "0" + millisecondes / 10}{" "}
        </p>
      </div>
    </div>
  );
};

export default StreamedTimer;
