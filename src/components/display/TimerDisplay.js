import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faPlay, faPause, } from "@fortawesome/free-solid-svg-icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer" >
      <div className="value">{remainingTime}</div>
    </div>
  );
};

const TimerDisplay = ({ data }) => {
  console.log("TimerDisplay", data);
  const interval = useRef();
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(0);

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
    <div className="timerContainer">
      {data.display === "dial" && (
        <div className="dial">
          <h3>{data.title}</h3>
          <div className="dialContainer">
            {/* <p>{("0" + (time/10)%100).slice(-2)}</p> */}
            <p>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)} : </p>
            <p>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)} : </p>
            <p>{("0" + ((time / 10) % 100)).slice(-2)}</p>
          </div>
          <div className="dialButtonContainer">
            {!started && time === 0 && (
              <button onClick={() => start()}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            )}
            {started && (
              <button onClick={() => stop()}>
                <FontAwesomeIcon icon={faPause} />
              </button>
            )}
            {!started && time !== 0 && (
              <button onClick={() => start()}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            )}
            {!started && time > 0 && (
              <button onClick={() => setTime((prevTime) => prevTime + 1)}>
                <FontAwesomeIcon icon={faRedo} />
              </button>
            )}
          </div>
        </div>
      )}
      {data.display === "stopwatch" && (
        <div className="stopWatchContainer">
          <h3>{data.title}</h3>
          <div className="stopWatch">
            <div className="timer-wrapper">
              <CountdownCircleTimer
                className="test"
                size={90}
                strokeWidth={5}
             
                key={key}
                isPlaying={started}
                duration={50}
                colors={[[data.color]]}
                onComplete={() => [false, 1000]}
              >
                {renderTime}
              </CountdownCircleTimer>
            </div>
            {/* <p>{("0" + (time/10)%100).slice(-2)}</p> */}
            {/* <p>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)}</p>
            <p>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}</p>
            <p>{("0" + ((time / 10) % 100)).slice(-2)}</p> */}
          </div>
          <div className="stopWatchButtonContainer">

     
          {!started && time === 0 && (
            <button onClick={() => start()}>
              {" "}
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          {started && (
            <button onClick={() => stop()}>
              {" "}
              <FontAwesomeIcon icon={faPause} />
            </button>
          )}
          {!started && time !== 0 && (
            <button onClick={() => start()}>
              <FontAwesomeIcon icon={faPlay} />
            </button>
          )}
          {!started && time > 0 && (
            <button onClick={() => setKey((prevKey) => prevKey + 1)}>
              {" "}
              <FontAwesomeIcon icon={faRedo} />
            </button>
          )}
               </div>
        </div>
      )}
    </div>
  );
};

export default TimerDisplay;
