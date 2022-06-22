import { useState } from "react";
const CounterModal = ({ closeCounterModal }) => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="h-screen w-screen fixed flex items-center justify-center" style={{backgroundColor : "rgba(0, 0 , 0 ,0.9)" , zIndex : "1000"}}>
        <div className="rounded bg-white h-96 w-96 flex items-center justify-center">
        Hey i'm a modal
      <button onClick={() => closeCounterModal(false)}> Close</button>
        </div>
     
    </div>
  );
};

export default CounterModal;
