import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";

const StreamedCounter = ({ counterData }) => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState();
  const testPos = useSpring({ x: 0, y: 0 });
  const bindPos = useDrag((params) => {
    testPos.x.set(params.offset[0]);
    testPos.y.set(params.offset[1]);
  });

  return (
    <animated.div
      key={index}
      {...bindPos()}
      style={{ x: testPos.x, y: testPos.y }}
    >
      <div>{counterData.title}</div>
      <div>{counterData.value}</div>
    </animated.div>
  );
};

export default StreamedCounter;
