import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faEnvelope,
  faChartBar,
  faSignOutAlt,
  faUser,
  faCrown
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";


const Sidebar = () => {
  return (
    <div className="sideNav">
      <Image
            className="locationsImage"
            alt=""
            width="100"
            height="50"
            src={"/logoYellowTop.svg"}
          />
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
        <li className="liPrenium">
           <FontAwesomeIcon icon={faCrown} />
       
  
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
