import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedo,
  faPlay,
  faPause,
  faEye,
  faEyeSlash,
  faTrash,
  faStopwatch
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
  const interval = useRef();
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [redo, setRedo] = useState(false);
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
      timers.map((item) => {
        if (item._id === data._id) {
          return { ...item, started: true, value: 0, restart: false };
        }
      })
    );
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
      console.log("time", ("0" + ((time / 10) % 100)).slice(-2));
    }, 10);
    console.log("running");
    setStarted(true);
    setRedo(true);
  };
  const stop = () => {
    clearInterval(interval.current);
    setTimers(
      timers.map((item) =>
        item._id === data._id
          ? { ...item, started: false, restart: false }
          : { ...item }
      )
    );

    setStarted(false);
  };

  const restart = () => {
    setTime((prevTime) => prevTime * 0);
    setRedo(false);
    setTimers(
      timers.map((item) =>
        item._id === data._id
          ? { ...item, restart: true, started: false }
          : { ...item }
      )
    );
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
      {/* <button
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
      </button> */}
      <div className="buttonFormatContainer">
        <button
          className="displayChoiceButton defaultChoice"
          onClick={(e) => {
            e.preventDefault();
            // setDisplay("stopwatch");
          }}
        >
          <FontAwesomeIcon icon={faStopwatch} />
        </button>
        <button
          className="displayChoiceButton"
          onClick={(e) => {
            e.preventDefault();
            // setDisplay("dial");
          }}
        >
          <div>00:00</div>
        </button>
      </div>
      <div className="displayTimerContainer">
      <div className="dial">
          <h3>{data.title}</h3>
          <div className="dialContainer">
            {/* <p>{("0" + (time/10)%100).slice(-2)}</p> */}
            {/* <p>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)} : </p>
            <p>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)} : </p>
            <p>{("0" + ((time / 10) % 100)).slice(-2)}</p> */}
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
            {!started && redo > 0 && (
              <button onClick={() => restart()}>
                <FontAwesomeIcon icon={faRedo} />
              </button>
            )}
          </div>
        </div>
      </div>
      {data.display === "dial" && (
     <div></div>
        // <div className="dial">
        //   <h3>{data.title}</h3>
        //   <div className="dialContainer">
        //     {/* <p>{("0" + (time/10)%100).slice(-2)}</p> */}
        //     {/* <p>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)} : </p>
        //     <p>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)} : </p>
        //     <p>{("0" + ((time / 10) % 100)).slice(-2)}</p> */}
        //   </div>
        //   <div className="dialButtonContainer">
        //     {!started && time === 0 && (
        //       <button onClick={() => start()}>
        //         <FontAwesomeIcon icon={faPlay} />
        //       </button>
        //     )}
        //     {started && (
        //       <button onClick={() => stop()}>
        //         <FontAwesomeIcon icon={faPause} />
        //       </button>
        //     )}
        //     {!started && time !== 0 && (
        //       <button onClick={() => start()}>
        //         <FontAwesomeIcon icon={faPlay} />
        //       </button>
        //     )}
        //     {!started && redo > 0 && (
        //       <button onClick={() => restart()}>
        //         <FontAwesomeIcon icon={faRedo} />
        //       </button>
        //     )}
        //   </div>
        // </div>
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
