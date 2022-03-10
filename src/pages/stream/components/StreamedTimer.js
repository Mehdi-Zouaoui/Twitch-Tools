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
  const [time, setTime] = useState(data.values ? data.values : 0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondes, setSecondes] = useState(0);
  const [millisecondes, setMilliseconds] = useState(0);

  if (data.started && data.type === false) {
    // let timeTest = data.values;
    // console.log(timeTest);
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      const getSeconds = parseInt(Math.floor(time / 1000));
      const getMinutes = parseInt(Math.floor(total_s / 60));
      const getHours = parseInt(Math.floor(total_m / 60));
      const d = parseInt(Math.floor(total_h / 24));

      const s = parseInt(getSeconds % 60);
      const m = parseInt(getMinutes % 60);
      const h = parseInt(getHours % 24);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSecondes(s);
      setTime(time - 1000);
    }, 1000);
  }
  if (data.started && data.type === true) {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      const getMilliseconds = Math.floor((time % 1000) / 100);
      const getSeconds = Math.floor((time / (1000 * 60)) % 60)
      const getMinutes = Math.floor((time / 1000) % 60);;
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
      setTime((prevTime) => prevTime * 0);
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
