import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Card = ({ title, length, color }) => {
  return (
    <div className="toolCard">
      <div className="topCard">
        <h2>{title}</h2>
        <button className="addTool">
          <Link href="/tool/sondage">
            <a>
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </Link>
        </button>
        <div className="cardIcon" />
      </div>
      <div className="bottomCard">
        {length > 0 ? (
          <p> Vous en avez créé {length}</p>
        ) : (
          <p>Aucun créé pour le moment</p>
        )}
        <p>Dernier créer le : </p>
      </div>
    </div>
  );
};

export default Card;
