import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faEnvelope,
  faChartBar,
  faSignOutAlt, 
  faUser
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  return (
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
  );
};
export default Sidebar;
