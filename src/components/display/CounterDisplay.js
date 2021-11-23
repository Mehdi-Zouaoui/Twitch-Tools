import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye , faEyeSlash , faPlus , faMinus , faTrash , faEdit} from "@fortawesome/free-solid-svg-icons";

const CounterDisplay = ({ data , update }) => {
  const [index, setIndex] = useState(0);
  const [stream , setStream] = useState(false)
  console.log("data" , data)

  const increment = () => {
    setIndex(index + 1);
  };
  const decrement = () => {
    index > 0 ? setIndex(index - 1) : null;
  };
  const removeCounter = (id) => {
      fetch("http://localhost:3000/api/counter/" + id,{
        method : "DELETE",
      }).then(res => console.log(res))
  }
  const editCounter = () => {
   update({counterData : data , update : true})
  }

  return (
    <div className="counterDisplay" style={{ backgroundColor:data.color}}>
      <h1>{data.title}</h1>
      <div className="counterButtonContainer"> 
      <button className="counterStream"> {stream ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} /> } </button>
      <div className="counterOperationContainer">
      <button className="counterOperation" onClick={increment}> <FontAwesomeIcon icon={faPlus} /></button>
      <button className="counterOperation" onClick={decrement}> <FontAwesomeIcon icon={faMinus} /></button>
      </div>
      <div className="counterCrud">
      <button className="counterEdit" onClick={() =>editCounter()} ><FontAwesomeIcon icon={faEdit} /></button>
      <button className="counterDelete" onClick={() => removeCounter(data._id)}> <FontAwesomeIcon icon={faTrash} /> </button>
     
      </div>
      </div>
   
    </div>
  );
};

export default CounterDisplay;
