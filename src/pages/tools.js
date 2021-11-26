import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Card from "../components/Card";
import Counter from "../components/Counter";
import CoinFlip from "../components/CoinFlip";
import Timer from '../components/Timer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faClock,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import { ApiClient } from "twitch";
import axios from "axios";
const tmi = require("tmi.js");

const userTools = ({ sondages, countersData , timersData }) => {
  const { user, error, isLoading } = useUser();
  const [displayedTool, setDisplayedTool] = useState(1);
  const [connected, setConnected] = useState(false);
  const [currentTool, setCurrentTool] = useState(0);
  const client = new tmi.Client({
    identity: {
      username: "TwoolsBot",
      password: "oauth:9xzeu9mexq3949592op21ku83rpixz",
    },
    options: { debug: true },
    channels: ["kamet0"],
  });

  client.on("connected", () => {
    console.log("The bot is Online!");
  });

  client.on("disconnected", () => {
    console.log(" DISCONNECTED The bot is Offline!");
  });

  client.on("message", (channel, tags, message, self) => {
    // "Alca: Hello, World!"
    if (self || !message.startsWith("!")) return;
    const args = message.slice(1).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "disconnect" || !connected) {
      console.log("Saw !disconnect command in chat");
      client.disconnect();
    }
    console.log(client.readyState());
    console.log(`${tags["display-name"]}: ${message}`);
  });

  const handleTwitchConnect = async () => {
    if (connected) {
      setConnected(false);
      client.say("TwoolsBot", "disconnected");
    } else {
      await client.connect();
      client.say("TwoolsBot", "connected");
      setConnected(true);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container">
      <main>
        <div className="userTools">
          <nav className="toolsNavigation">
            <ul className="toolsList">
              <li onClick={() => setCurrentTool(1)}>Counter</li>
              <li onClick={() => setCurrentTool(2)}>Random</li>
              <li onClick={() => setCurrentTool(3)}>Sondage</li>
            </ul>
          </nav>
          <div className="displayedTool">
            {currentTool === 1 && (
              <div className="counter">
                <div className="cardContainer">
                  <div>
                    <h1> Vos créations </h1>
                    <p>Outils crées : 100</p>
                  </div>

                  <div className="displayTools">
                    <div className="counterCard" onClick={() => setDisplayedTool(1)}>
                      <div>
                        <FontAwesomeIcon icon={faCalculator} />
                      </div>
                      <h3>Counter</h3>
                      <p>Crées : 10</p>
                    </div>
                    <div className="timerCard" onClick={() => setDisplayedTool(2)}>
                      <div>
                        <FontAwesomeIcon icon={faClock} />
                      </div>
                      <h3>Timers</h3>
                      <p>Crées : 10</p>
                    </div>
                    <div className="coinFlipCard" onClick={() => setDisplayedTool(3)}>
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
                    <Timer timersData  ={timersData}/>
                  </div>
                )}
                {displayedTool === 3 && (
                  <div>
                    <h3>Mes coin flip</h3>
                    <CoinFlip/>
                  </div>
                )}
              </div>
            )}
            {currentTool === 2 && <div>Random</div>}
            {currentTool === 3 && (
              <div>
                Sondage
                <button onClick={() => handleTwitchConnect()}>
                  Appuyer pour vous connecter au chat twitch
                </button>
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
  const res = await fetch("http://localhost:3000/api/sondage");
  const data = await res.json();
  const counters = await fetch("http://localhost:3000/api/counter");
  const countersJSON = await counters.json();
  const timers = await fetch("http://localhost:3000/api/timer");
  const timersJSON = await timers.json();

  return {
    props: {
      sondages: data,
      countersData: countersJSON,
      timersData: timersJSON
    },
  };
};
