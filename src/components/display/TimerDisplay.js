import { useState, useRef } from "react";

const TimerDisplay = ({data}) => {
    console.log("TimerDisplay" , data)
  const interval = useRef();
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);

  const start = () => {
    interval.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
    console.log("running");
    setStarted(true);
  };
  const stop = () => {
    clearInterval(interval.current);
    console.log("timer stoped");
    setStarted(false);
  };
  return (
    <div>
        <h3>{data.title}</h3>
      <div className="stopWatch">
        {/* <p>{("0" + (time/10)%100).slice(-2)}</p> */}
        <p>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)}</p>
        <p>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}</p>
        <p>{("0" + ((time / 10) % 100)).slice(-2)}</p>
      </div>
      {!started && time === 0 && <button onClick={() => start()}>Start</button>}
      {started && <button onClick={() => stop()}>Stop</button>}
      {!started && time !== 0 && <button onClick={() => start()}>Resume</button>}
      {!started && time > 0 && <button onClick={() => setTime(0)}>Reset</button>}
    </div>
  );
};

export default TimerDisplay;
