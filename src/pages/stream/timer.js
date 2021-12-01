import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const Timer = () => {
  const [index, setIndex] = useState(0);
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
            <div
              className="counterStreamDisplay"
              style={{ backgroundColor: item.color }}
              key={index}
            >
              {item.display === "dial" && (
                <div className="dial">
                  <h3>{item.title}</h3>
                  <div>BONJOUR DIAL</div>
                  <div className="dialContainer">
                      <div>{item.value}</div>
                    {/* <p>{("0" + (time/10)%100).slice(-2)}</p> */}
                    {/* <p>
                      {("0" + (Math.floor(time / 60000) % 60)).slice(-2)} :{" "}
                    </p>
                    <p>{("0" + (Math.floor(time / 1000) % 60)).slice(-2)} : </p>
                    <p>{("0" + ((time / 10) % 100)).slice(-2)}</p> */}
                  </div>
                
                </div>
              )}
          
              <h1 className="streamCounterTitle">{item.title}</h1>

              <div className="streamCounterValue">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timer;
