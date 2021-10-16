import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@auth0/nextjs-auth0";

import { faUser } from "@fortawesome/free-regular-svg-icons";
const Administration = () => {
  const { user, error, isLoading } = useUser();
  let currentDate = new Date();
  let date = {
    month : currentDate.getMonth() + 1,
    day : currentDate.getDate()
  }
  if (isLoading) return <div>Loading...</div>;
  return (
    user && (
      <div className="container">
        <main>
          <div className="mainContent">
            <div className="profileCard">
              <div className="details">
                <h2>Bonjour {user.name} !</h2>
                <p>Bievenue sur votre espace Twitch Tools</p>
              </div>
              <div className="icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            <div className="date">   {date.month} {date.day}</div>
            <div className="content"></div>
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
    )
  );
};

export default Administration;
