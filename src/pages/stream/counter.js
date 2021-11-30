import { useState, useEffect } from "react";

const Counter = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   setData(JSON.parse(localStorage.getItem("counter")));
  //   console.log("here", data);
  // }, []);

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
    <div>
      {data && (
        <div>
          {data.map((item, index) => (
            <div
              className="counterDisplay"
              style={{ backgroundColor: item.color }}
              key={index}
            >
              <h1>{item.title}</h1>

              <div>{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Counter;
