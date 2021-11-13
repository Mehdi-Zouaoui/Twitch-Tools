import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faEnvelope,
  faChartBar,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="sideNav">
      <h3>Twitch Tools</h3>
      <ul className="list">
        <li>
          <Link href="/administration">
            <a>
              <FontAwesomeIcon icon={faUser} />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/tools">
            <a>
              <FontAwesomeIcon icon={faDatabase} />
            </a>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faChartBar} />
        </li>
        <li>
          <FontAwesomeIcon icon={faEnvelope} />
        </li>
      </ul>
      <div className="logOut">
        <a href="/api/auth/logout" className="logout">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </a>
      </div>
    </div>
  );
};
export default Sidebar;
