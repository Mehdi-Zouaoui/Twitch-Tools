import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Card from "../components/Card";
import Counter from "../components/Counter";

import { ApiClient } from "twitch";
import axios from "axios";
const tmi = require("tmi.js");



const userTools = ({ sondages , countersData }) => {
 

  const { user, error, isLoading } = useUser();
  const [connected, setConnected] = useState(false);
  const [currentTool, setCurrentTool] = useState(0);
  const client = new tmi.Client({
    identity: {
      username: "TwoolsBot",
      password: "oauth:9xzeu9mexq3949592op21ku83rpixz",
    },
    options: { debug: true },
    channels: ["moooz_"],
  });

  client.on("connected", () => {
    console.log("The bot is Online!");
  });

  client.on("disconnected", () => {
    console.log("The bot is Offline!");
  });

  client.on("message", (channel, tags, message, self) => {
    // "Alca: Hello, World!"
    if (self || !message.startsWith("!")) return;
    const args = message.slice(1).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "disconnect") {
      console.log("Saw !disconnect command in chat");
      client.disconnect();
    }
    console.log(client.readyState());
    console.log(`${tags["display-name"]}: ${message}`);
  });

  const handleTwitchConnect = async () => {
    if (connected) {
      client.say("moooz_", "!disconnect");
      setConnected(false);
    } else {
      await client.connect();
      client.say("moooz_", "connected");
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
              <h3>Counter</h3>
              <div>
              
                <Card title="Créer un counter" color="#e8ac65" />
                <h3>Mes counters</h3>
                <Counter countersData = {countersData}/>
              </div>
            </div>
          )}
          {currentTool === 2 && <div>Random</div>}
          {currentTool === 3 && <div>Sondage</div>}
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
  console.log('counters data' , countersJSON)

  return {
    props: {
      sondages: data,
      countersData: countersJSON,
    },
  };
};
