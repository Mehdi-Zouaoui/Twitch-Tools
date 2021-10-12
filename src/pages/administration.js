import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faEnvelope,
  faChartBar,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
const Administration = () => {
  return (
    <div>
      <main>
        <div className="sideNav">
          <h3>Twitch Tools</h3>
          <ul className="list">
            <li>
              <FontAwesomeIcon icon={faUser} />
            </li>
            <li>
              <FontAwesomeIcon icon={faDatabase} />
            </li>
            <li>
              <FontAwesomeIcon icon={faChartBar} />
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
            </li>
          </ul>
          <div className="logOut">
      
              <FontAwesomeIcon icon={faSignOutAlt} />
          
          </div>
        </div>
        <div className="mainContent">
          <div className="profileCard">
            <div className="details">
              <h2>Bonjour User !</h2>
              <p>Bievenue sur votre espace Twitch Tools</p>
            </div>
            <div className="icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
            <div className="content">

            
            </div>
          <div className="toolsContainer">
            <h3>Créer un Tool</h3>
            <div className="tools">
              <Card title="Sondage" color="#e8ac65" />
              <Card title="Quizz" color="#e8ac65" />
              <Card title="Coin Flip" color="#e8ac65" />
              <Card title="Dice Roll" color="#e8ac65" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Administration;
