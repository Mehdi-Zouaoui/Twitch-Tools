import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { ApiClient } from "twitch";
import axios from "axios";
const tmi = require("tmi.js");

const userTools = ({ sondages }) => {
  const { user, error, isLoading } = useUser();
  const [connected, setConnected] = useState(false);

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
      <nav>
        <ul className="toolsNavigation">
          <li>Counter</li>
          <li>Chrono</li>
          <li>Random Number</li>
          <li>Sondage</li>
        </ul>
      </nav>
      <div className="ICI">
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
      </div>
    </div>
  );
};

export default userTools;

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/sondage");
  const data = await res.json();

  return {
    props: {
      sondages: data,
    },
  };
};
