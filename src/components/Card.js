import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Card = ({ title , color}) => {
  return (
    <div className="toolCard" >
        <div className="topCard">
        <h2>{title}</h2>
        <button className ="addTool"> 
        <Link href="/tools/sondage">
            <a>
            <FontAwesomeIcon icon={faPlus} />
            </a>
          </Link>
          </button>
       
        </div>
        <div className="bottomCard">
            <p>Aucun créé pour le moment</p>
        </div>
    
    </div>
  );
};

export default Card;
