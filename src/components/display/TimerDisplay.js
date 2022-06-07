import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faRedo,
  faPlay,
  faPause,
  faEye,
  faEyeSlash,
  faClock,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { DELETE_TIMER, UPDATE_TIMER } from "../../../graphql/queries";

const renderTime = ({ remainingTime }) => {
  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

const TimerDisplay = ({
  currentTimer,
  timers,
  setTimers,
  opened,
  setOpened,
}) => {
  const interval = useRef();
  const router = useRouter();
  const [started, setStarted] = useState(currentTimer.started);
  const [redo, setRedo] = useState(false);
  const [time, setTime] = useState(0);
  const [key, setKey] = useState(0);
  const [stream, setStream] = useState(false);
  const [deleteTimer] = useMutation(DELETE_TIMER, {
    onCompleted: () => {
      console.log("deleted done");
      refreshData();
    },
  });
  const [updateTimer] = useMutation(UPDATE_TIMER, {
    onCompleted: () => {
      console.log("updated done", currentTimer);
      refreshData();
    },
  });

  useEffect(() => {
    if (stream) {
      setTimers((oldArray) => [...oldArray, { ...currentTimer }]);
    } else {
      setTimers(
        timers.filter((item) => {
          item._id !== null && item._id !== currentTimer._id;
        })
      );
      // counters = counters.filter((item) => item._id !== data._id);
    }
  }, [stream]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const start = (id) => {
    updateTimer({
      variables: {
        updateTimerId: id,
        input: {
          started: true,
        },
      },
    });
    // setTimers(
    //   timers.map((item) => {
    //     if (item._id === data._id) {
    //       console.log("try this", item._id, data._id);
    //       return { ...item, started: true, value: 0, restart: false };
    //     } else return item;
    //   })
    // );
    // console.log("TIMERS", timers);
    // setStarted(true);
    // setRedo(true);
  };
  const stop = (id) => {
    updateTimer({
      variables: {
        updateTimerId: id,
        input: {
          started: false,
        },
      },
    });
  };

  const restart = () => {
    setTime((prevTime) => prevTime * 0);
    setRedo(false);
    setTimers(
      timers.map((item) =>
        item._id === currentTimer._id
          ? { ...item, restart: true, started: false }
          : { ...item }
      )
    );
  };
  const removeTimer = (id) => {
    deleteTimer({
      variables: {
        deleteTimerId: id,
      },
    });
  };

  const addToBrowserSource = (id) => {
    updateTimer({
      variables: {
        updateTimerId: id,
        input: {
          isStreamed: true,
        },
      },
    });
  };

  const removeFromBrowserSource = (id) => {
    updateTimer({
      variables: {
        updateTimerId: id,
        input: {
          isStreamed: false,
        },
      },
    });
  };
  return (
    <div className="timerContainer">
      {currentTimer.display === "dial" && (
        <div className="dialContainer">
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
                  <div onClick={() => addToBrowserSource(currentTimer.id)}>
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                </div>
              ) : (
                <div onClick={() => removeFromBrowserSource(currentTimer.id)}>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </div>
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
            <button onClick={() => removeTimer(currentTimer.id)}>
              <div>X</div>
            </button>
          </div>
          <div className="dial">
            <h3>{currentTimer.title}</h3>

            <div className="dialButtonContainer">
              {!started && time === 0 && (
                <button onClick={() => start(currentTimer.id)}>
                  <FontAwesomeIcon icon={faPlay} />
                </button>
              )}
              {started && (
                <button onClick={() => stop(currentTimer.id)}>
                  <FontAwesomeIcon icon={faPause} />
                </button>
              )}
              {!started && time !== 0 && (
                <button onClick={() => start(currentTimer.id)}>
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
          </div>
          <div className="stopWatchButtonContainer">
            {!started && time === 0 && (
              <button onClick={() => start(currentTimer.id)}>
                {" "}
                <FontAwesomeIcon icon={faPlay} />
              </button>
            )}
            {started && (
              <button onClick={() => stop(currentTimer.id)}>
                {" "}
                <FontAwesomeIcon icon={faPause} />
              </button>
            )}
            {!started && time !== 0 && (
              <button onClick={() => start(currentTimer.id)}>
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
