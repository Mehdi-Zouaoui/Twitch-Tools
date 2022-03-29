import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@auth0/nextjs-auth0";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import {

  faAngleDown
} from "@fortawesome/free-solid-svg-icons";
const Administration = () => {
  const { user, error, isLoading } = useUser();
  let currentDate = new Date();
  let date = {
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };

  console.log(user);
  if (isLoading) return <div>Loading...</div>;
  return (
    user && (
      <div className="container">
        <nav className="userOptions">
          <div className="userAccount">
         
            <div className="userInfos">
            <div className="userProfilPicture" 
            style={{backgroundImage :`url(${user.picture})` }}/>
              <p>{user.given_name || user.nickname }</p>
              <div className="down">  <FontAwesomeIcon icon={faAngleDown} /></div>
            </div>
         
          </div>
        </nav>
        <main>
          <div className="mainContent">
            <div className="profileCard">
              <div className="details">
                <h2>Bonjour <span style={{color:" #f5cb5c"}}>{user.nickname}</span> !</h2>
                <p>Bievenue sur votre espace Twools</p>
                <p>Nous sommes le {date.day > 9 ? date.day : "0" + date.day}/{date.month > 9 ? date.month : "0" + date.month} </p>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            {/* <div className="date">
              {" "}
              {date.month} {date.day}
            </div> */}
            <div className="content"></div>
            <div className="toolsContainer">
              <h3>Vos Twools</h3>
              <div className="tools">
                <Card title="Interactiv tools " color="#e8ac65" />
                <Card title="Display tools" color="#e8ac65" />
                <Card title="Games" color="#e8ac65" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  );
};

export default Administration;
