import { useState, useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Card from "../components/Card";
import Counter from "../components/Counter";
import CoinFlip from "../components/CoinFlip";
import Timer from "../components/Timer";
import Sondage from "../components/Sondage";
import Object from "../components/Object";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { GET_COUNTERS, GET_SURVEYS, GET_TIMERS } from "../../graphql/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faClock,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import { ApiClient } from "twitch";
import axios from "axios";
const tmi = require("tmi.js");

const userTools = ({ countersData, timersData, sondagesData }) => {
  // const { user, error, isLoading } = useUser();
  const [displayedTool, setDisplayedTool] = useState(1);
  const { user, error, isLoading } = useUser();
  const [currentTool, setCurrentTool] = useState(0);
  const toolRef = useRef(null);

  useEffect(() => {
    console.log("tool changed");
  }, [displayedTool]);
  // if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container">
      <main>
        <div className="userTools">
          <nav className="toolsNavigation">
            <ul className="toolsList">
              <li onClick={() => setCurrentTool(1)}>Counter</li>
              <li onClick={() => setCurrentTool(2)}>Composant 3D</li>
              <li onClick={() => setCurrentTool(3)}>Sondage</li>
            </ul>
          </nav>
          <div className="displayedTool">
            {/* <div>
                Composant 3D
                <Object />
              </div> */}
            {currentTool === 1 && (
              <div className="counter">
                <div className="cardContainer">
                  <div>
                    <h1> Vos créations </h1>
                    <p>Outils crées : 100</p>
                  </div>

                  <div className="displayTools">
                    <div
                      className="counterCard"
                      onClick={() => setDisplayedTool(1)}
                    >
                      <div>
                        <FontAwesomeIcon icon={faCalculator} />
                      </div>
                      <h3>Counter</h3>
                      <p>Crées : 10</p>
                    </div>
                    <div
                      className="timerCard"
                      onClick={() => setDisplayedTool(2)}
                    >
                      <div>
                        <FontAwesomeIcon icon={faClock} />
                      </div>
                      <h3>Timers</h3>
                      <p>Crées : 10</p>
                    </div>
                    <div
                      className="coinFlipCard"
                      onClick={() => setDisplayedTool(3)}
                    >
                      <div>
                        <FontAwesomeIcon icon={faCoins} />
                      </div>
                      <h3>Pile ou Face</h3>
                      <p>Crées : 10</p>
                    </div>
                  </div>
                </div>
                {/* <Card title="Créer un counter" color="#e8ac65" /> */}
                {displayedTool === 1 && (
                  <div>
                    <h3>Mes counters</h3>
                    <Counter countersData={countersData} />
                  </div>
                )}
                {displayedTool === 2 && (
                  <div>
                    <h3>Mes timers</h3>
                    <Timer timersData={timersData} />
                  </div>
                )}
                {displayedTool === 3 && (
                  <div>
                    <h3>Mes coin flip</h3>
                    <CoinFlip />
                  </div>
                )}
              </div>
            )}
            {currentTool === 2 && (
              <div>
                Composant 3D
                <Object />
              </div>
            )}
            {currentTool === 3 && (
              <div>
                Sondage
                <Sondage sondagesData={sondagesData} />
              </div>
            )}
          </div>
          {/* <div className="ICI">
        <div>Bonjour</div>
        {sondages.map((item, index) => {
          if (user.sub === item.author) {
            return (
              <div key={index}>
                <div>{item.title}</div>
                {item.fields.map((field, index) => {
                  return <div key={index}> {field.name} </div>;
                })}
                <button onClick={() => handleTwitchConnect()}>
                  {connected ? "STOP" : "START"}
                </button>
              </div>
            );
          }
        })}
      </div> */}
        </div>
      </main>
    </div>
  );
};

export default userTools;

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
