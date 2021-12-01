import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedo,
  faPlay,
  faPause,
  faEye,
  faEyeSlash,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useRouter } from "next/router";
const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

const TimerDisplay = ({ data, timers, setTimers }) => {
  const router = useRouter();
  const interval = useRef();
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(0);
  const [stream, setStream] = useState(false);

  useEffect(() => {
    if (stream) {
      setTimers((oldArray) => [...oldArray, { ...data }]);
      console.log("data", data);
    } else {
      setTimers(timers.filter((item) => item._id !== data._id));
      // counters = counters.filter((item) => item._id !== data._id);
    }
  }, [stream]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const start = () => {
    setTimers(
      timers.map((item) =>
        item._id === data._id
          ? { ...item, started: true, value: 0 }
          : { ...item }
      )
    );

    interval.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
      console.log("time", ("0" + ((time / 10) % 100)).slice(-2));
      setTimers(
        timers.map((item) =>
          item._id === data._id
            ? {
                ...item,
                started: true,
                value: ("0" + ((time / 10) % 100)).slice(-2),
              }
            : { ...item }
        )
      );
    }, 10);
    console.log("running");
    setStarted(true);
  };
  const stop = () => {
    clearInterval(interval.current);
    setTimers(
      timers.map((item) =>
        item._id === data._id ? { ...item, started: false } : { ...item }
      )
    );
    console.log("timer stoped");
    setStarted(false);
  };

  const removeTimer = (id) => {
    fetch("http://localhost:3000/api/timer/" + id, {
      method: "DELETE",
    }).then((res) => {
      setTimers(timers.filter((item) => item._id !== id));

      refreshData();
    });
  };

  return (
    <div className="timerContainer">
      <button
        className="timerStream"
        onClick={() => {
          console.log("before", stream);
          setStream(!stream);
        }}
      >
        {stream === false ? (
          <div>
            <a href="http://localhost:3000/stream/timer" target="stream">
              <FontAwesomeIcon icon={faEye} />
            </a>
          </div>
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} />
        )}
      </button>
      <button className="counterDelete" onClick={() => removeTimer(data._id)}>
        <FontAwesomeIcon icon={faTrash} />{" "}
      </button>
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
