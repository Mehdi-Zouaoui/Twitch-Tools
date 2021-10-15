import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { ApiClient } from "twitch";
import axios from "axios";
const tmi = require("tmi.js");

const userTools = ({ sondages }) => {
  const { user, error, isLoading } = useUser();
  const [connected, setConnected] = useState(false);

  const client = new tmi.Client({
    options: { debug: true },

    connection: {
      reconnect: false,
      secure: true,
    },
    channels: ["zerator"],
  });

  client.on("connected", () => {
    console.log("The bot is Online!");
  });

  client.on("disconnected", () => {
    console.log("The bot is Online!");
  });

  client.on("message", (channel, tags, message, self) => {
    // "Alca: Hello, World!"
    console.log(client.readyState());
    console.log(`${tags["display-name"]}: ${message}`);
  });

  const handleTwitchConnect = async () => {
    console.log(client);
    if (connected) {
      await client.disconnect();
      setConnected(false);

      console.log(client.readyState());
    } else {
      await client.connect();
      setConnected(true);
      console.log(client.readyState());
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
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
