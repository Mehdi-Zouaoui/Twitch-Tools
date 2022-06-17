import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GET_COUNTERS, GET_SURVEYS, GET_TIMERS } from "../../graphql/queries";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { counter } from "@fortawesome/fontawesome-svg-core";

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  const counters = await client.query({ query: GET_COUNTERS });
  const countersJSON = counters.data.getCounters;
  const timers = await client.query({ query: GET_TIMERS });
  const timersJSON = timers.data.getTimers;
  const surveys = await client.query({ query: GET_SURVEYS });
  const surveysJSON = surveys.data.getSurveys;

  return {
    props: {
      sondagesData: surveysJSON,
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
      <div className="flex flex-col w-9/12">
        <nav className="flex justify-end">
          <div className="flex">
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
