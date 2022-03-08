import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedo,
  faPlay,
  faPause,
  faEye,
  faEyeSlash,
  faTrash,
  faStopwatch,
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

const TimerDisplay = ({ currentTimer, timers, setTimers }) => {
  const interval = useRef();
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [redo, setRedo] = useState(false);
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(0);
  const [stream, setStream] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondes, setSecondes] = useState(0);

  useEffect(() => {
    if (stream) {
      setTimers((oldArray) => [...oldArray, { ...data }]);
      console.log("data", data);
    } else {
      console.log("test gettind timers", timers);
      setTimers(
        timers.filter((item) => {
          item._id !== null && item._id !== data._id;
        })
      );
      // counters = counters.filter((item) => item._id !== data._id);
    }
  }, [stream]);

  const refreshData = () => {
    router.replace(router.asPath);
  };


  const start = (data) => {
    console.log("test on start", data);
    setTimers(
      timers.map((item) => {
        if (item._id === data._id) {
          return { ...item, started: true, value: 0, restart: false };
        }
      })
    );
    console.log("timers on start", timers);
    clearInterval(interval.current);

    if (data.type === false) {
      console.log("Coutdown", data.values);

      clearInterval(interval.current);
      interval.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);

        let total_s = parseInt(Math.floor(data.values / 1000));
        console.log('total S' , total_s);
        let total_m = parseInt(Math.floor(total_s / 60));
        console.log('total M' , total_m);
        let total_h = parseInt(Math.floor(total_m / 60));
        console.log('total H' , total_h);
        let d= parseInt(Math.floor(total_h / 24));
        console.log('total D' , d)
       
        let s = parseInt(total_s % 60);
        let m = parseInt(total_m % 60);
        let h = parseInt(total_h % 24);
        

        setDays(d);
        setHours(h);
        setMinutes(m);
        setSecondes(s);
        console.log("ICI", d , ":" , h , ":", m, ":" , s);
      }, 10);
    } else {
      console.log("Timer");
      interval.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
        console.log("time", ("0" + ((time / 10) % 100)).slice(-2));
      }, 10);
    }

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
          <h3>{currentTimer.title}</h3>
          <div className="dialContainer">
            {/* <button onClick={() => startCountdown() }> Start</button> */}
            {/* <p>{days < 10 ? '0' + days : days}:</p>
            <p>{hours < 10 ? '0' + hours : hours}:</p>
            <p>{minutes < 10 ? '0' + minutes : minutes}:</p>
            <p>{secondes < 10 ? '0' + secondes : secondes}</p> */}
            {/* <p>{("0" + (time/10)%100).slice(-2)}</p> */}
            {/* <p>{("0" + (Math.floor(time / 60000) % 60)).slice(-2)} : </p>
            <p>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)} : </p>
            <p>{("0" + ((time / 10) % 100)).slice(-2)}</p> */}
          </div>
          <div className="dialButtonContainer">
            {!started && time === 0 && (
              <button onClick={() => start(currentTimer)}>
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
      {currentTimer.display === "dial" && (
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
      {currentTimer.display === "stopwatch" && (
        <div className="stopWatchContainer">
          <h3>{currentTimer.title}</h3>
          <div className="stopWatch">
            <div className="timer-wrapper">
              <CountdownCircleTimer
                className="test"
                size={90}
                strokeWidth={5}
                key={key}
                isPlaying={started}
                duration={50}
                colors={[[currentTimer.color]]}
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
              <button onClick={() => start(currentTimer)}>
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
