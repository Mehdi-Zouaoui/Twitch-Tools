import { useState, useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import CounterModal from "../components/modals/CounterModal";
import Card from "../components/Card";
import Counter from "../components/Counter";
import CoinFlip from "../components/CoinFlip";
import Timer from "../components/Timer";
import Sondage from "../components/Sondage";
import Object from "../components/Object";
import LuckyWheel from "../components/LuckyWheel";
import {
  faEye,
  faEyeSlash,
  faPlus,
  faMinus,
  faTrash,
  faEdit,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

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
  const [openCounterModal, setOpenCounterModal] = useState(false);
  const [displayedTool, setDisplayedTool] = useState(1);
  const { user, error, isLoading } = useUser();
  const [currentTool, setCurrentTool] = useState(0);
  const toolRef = useRef(null);

  useEffect(() => {
    console.log("tool changed");
  }, [displayedTool]);
  // if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container   h-[95vh] my-auto" style={{ width:"95%"}}>
        {openCounterModal && (
                  <CounterModal closeCounterModal={setOpenCounterModal} />
                )}
      <main className="h-full relative ">
        <div className="userTools h-full  ">
          <nav className="w-full bg-dark text-white rounded-tr-lg ">
            <ul className="flex justify-around py-2">
              <li onClick={() => setCurrentTool(1)}>Static</li>
              <li onClick={() => setCurrentTool(2)}>Composant 3D</li>
              <li onClick={() => setCurrentTool(3)}>Sondage</li>
              <li onClick={() => setCurrentTool(4)}>Roue de la chance</li>
            </ul>
          </nav>
          <div className="displayedTool rounded h-full">
        

            {/* <div>
                Composant 3D
                <Object />
              </div> */}
            {currentTool === 1 && (
              
              <div className="counter">

<div className="flex  h-full justify-around items-center">
              <div className="flex h-5/6 flex-col overflow-auto  w-1/4 rounded p-6 bg-gold">
                <h3 className="font-semibold pb-3 text-white">Counters</h3>
                <div
                  className="rounded bg-white"
                  onClick={() => setOpenCounterModal(true)}
                >
                  Add Counter +
                </div>
              
                {countersData.map((counter) => (
                  <div className="flex flex-col my-4 p-2  h-96 rounded relative drop-shadow-md bg-white">
                    <div className="flex w-full justify-around">
                      <div className="flex">
                        <p className="w-40 font-semibold">{counter.title}</p>
                        <div
                          className="rounded flex justify-center items-center h-8 w-8 bg-black text-white absolute"
                          style={{ top: "-10px", right: "10px" }}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-5 justify-around">
                      <div className="text-lg	">
                        {counter.value != null ? counter.value : 0}
                      </div>
                      <div
                        className="rounded-full w-5 h-5"
                        style={{ backgroundColor: counter.color }}
                      />
                    </div>
                    <div className="text-right">...</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col h-5/6 justify-around w-1/4 rounded p-6 bg-slate-600">
                <h3 className="font-semibold pb-3 text-white">Timers</h3>
                {timersData.map((timer) => (
                  <div className="flex flex-col my-4 p-2  h-36 rounded bg-white">
                    <div className="flex w-full justify-around">
                      <div className="flex">
                        <p className="w-40 font-semibold">{timer.title}</p>
                        <div>
                          <FontAwesomeIcon icon={faEye} />
                        </div>
                      </div>
                      <div
                        className="rounded-full w-5 h-5"
                        style={{ backgroundColor: timer.color }}
                      />
                    </div>
                    <div>Value</div>
                  </div>
                ))}
              </div>
            </div>
            
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
            {currentTool === 4 && (
              <div>
                Roue de la chance
                <LuckyWheel />
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
