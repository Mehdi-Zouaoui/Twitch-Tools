import { useState, useEffect } from "react";

const Counter = ({ countersData }) => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(countersData);
    // setData(JSON.parse(localStorage.getItem("counters")));
    // function checkCounter() {
    //   console.log('Counters checked')
    //   const items = localStorage.getItem(`counters`);
    //   if (items) {
    //     setData(JSON.parse(items));
    //   }
    // }
    // window.addEventListener("storage", checkCounter);
    // return () => {
    //   window.removeEventListener("storage", checkCounter);
    // };
  }, []);

  return (
    <div className="stream">
      {data && (
        <div className="streamDisplay">
          {data.map((item, index) => (
            <div>
              {item.isStreamed ? (
                <div
                  className="counterStreamDisplay"
                  style={{ backgroundColor: item.color }}
                  key={index}
                >
                  <h1 className="streamCounterTitle">{item.title}</h1>

                  <div className="streamCounterValue">{item.value}</div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Counter;

export const getStaticProps = async () => {
  const counters = await fetch("http://localhost:3000/api/counter");
  const countersJSON = await counters.json();

  return {
    props: {
      countersData: countersJSON,
    },
  };
};
