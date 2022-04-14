import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { counter } from "@fortawesome/fontawesome-svg-core";

export const getStaticProps = async () => {
  const counters = await fetch("http://localhost:3000/api/counter");
  const countersJSON = await counters.json();
  const timers = await fetch("http://localhost:3000/api/timer");
  const timersJSON = await timers.json();
  const sondages = await fetch("http://localhost:3000/api/sondage");
  const sondagesJSON = await sondages.json();

  return {
    props: {
      sondagesData: sondagesJSON,
      countersData: countersJSON,
      timersData: timersJSON,
    },
  };
};

const Administration = ({ countersData, timersData, sondagesData }) => {
  const { user, error, isLoading } = useUser();
  
  let interactivToolsLength = 0;
  let displayToolsLength = 0;
  let currentDate = new Date();
  let date = {
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };

  // countersData.forEach((item) => {
  //   if (item.author === user.sub) {
  //     displayToolsLength++;
  //   }
  // });
  // timersData.forEach((item) => {
  //   if (item.author === user.sub) {
  //     displayToolsLength++;
  //   }
  // });
  // sondagesData.forEach((item) => {
  //   if (item.author === user.sub) {
  //     interactivToolsLength++;
  //   }
  // });

  if (isLoading) return <div>Loading...</div>;
  return (
    user && (
      <div className="container">
        <nav className="userOptions">
          <div className="userAccount">
            <div className="userInfos">
              <div
                className="userProfilPicture"
                style={{ backgroundImage: `url(${user.picture})` }}
              />
              <p>{user.given_name || user.nickname}</p>
              <div className="down">
                {" "}
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
            </div>
          </div>
        </nav>
        <main>
          <div className="mainContent">
            <div className="profileCard">
              <div className="details">
                <h2>
                  Bonjour{" "}
                  <span style={{ color: " #f5cb5c" }}>{user.nickname}</span> !
                </h2>
                <p>Bievenue sur votre espace Twools</p>
                <p>
                  Nous sommes le {date.day > 9 ? date.day : "0" + date.day}/
                  {date.month > 9 ? date.month : "0" + date.month}{" "}
                </p>
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
                <Card
                  title="Interactiv tools "
                  length={interactivToolsLength}
                  color="#e8ac65"
                />
                <Card
                  title="Display tools"
                  length={displayToolsLength}
                  color="#e8ac65"
                />
                <Card title="Games" length={0} color="#e8ac65" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  );
};

export default Administration;
