import { useState, useEffect } from "react";

const Counter = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("counters")));
    function checkCounter() {
      const items = localStorage.getItem(`counters`);
      if (items) {
        setData(JSON.parse(items));
      }
    }
    window.addEventListener("storage", checkCounter);
    return () => {
      window.removeEventListener("storage", checkCounter);
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
              <h1 className="streamCounterTitle">{item.title}</h1>

              <div className="streamCounterValue">{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Counter;
