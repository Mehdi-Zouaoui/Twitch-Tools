import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Card = ({ title , color}) => {
  return (
    <div className="toolCard" style={{backgroundColor : color}}>
        <div className="topCard">
        <h2>{title}</h2>
        <button className ="addTool"> <FontAwesomeIcon icon={faPlus} /></button>
        </div>
        <div className="bottomCard">
            <p>Aucun créé pour le moment</p>
        </div>
    
    </div>
  );
};

export default Card;
