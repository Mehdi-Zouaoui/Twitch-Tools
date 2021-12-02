import { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import StreamedTimer from "./components/StreamedTimer";
const Timer = () => {
  const [index, setIndex] = useState(0);
  const interval = useRef();
  const [data, setData] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("timers")));
    function checkTimers() {
      const items = localStorage.getItem(`timers`);
      if (items) {
        setData(JSON.parse(items));
      }
    }
    window.addEventListener("storage", checkTimers);
    return () => {
      window.removeEventListener("storage", checkTimers);
    };
  }, []);

  return (
    <div className="stream">
      {data && (
        <div className="streamDisplay">
          {data.map((item, index) => (
            <StreamedTimer data={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Timer;
