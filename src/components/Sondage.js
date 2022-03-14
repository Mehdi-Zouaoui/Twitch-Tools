import { useState, useEffect } from "react";
import SondageDisplay from "../components/display/SondageDisplay";
const tmi = require("tmi.js");

function Sondage({ sondagesData, viewersResponses, quantity }) {
  const OAUTH_BOT_TOKEN = process.env.OAUTH_BOT_TOKEN;
  const [connected, setConnected] = useState(false);

  const [answer, setAnswer] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });
  const [messagesQuantity, setMessagesQuantity] = useState(0);

  const client = new tmi.Client({
    identity: {
      username: "twoolsbot",
      password: "oauth:0qa0cemeueq7tewnhhfeqv30rq3v2w",
    },
    options: { debug: true },
    channels: ["twoolsbot"],
  });

  client.on("connected", () => {
    console.log("The bot is Online!");
  });

  client.on("disconnected", () => {
    console.log(" DISCONNECTED The bot is Offline!");
  });

  client.on("message", (channel, tags, message, self) => {
    // "Alca: Hello, World!"

    switch (message) {
      case "A":
        console.log("A");
        setMessagesQuantity((prevnumber) => prevnumber + 1);
        setAnswer((prevState) => ({ ...prevState, A: prevState.A + 1 }));
        break;
      case "B":
        console.log("B");
        setMessagesQuantity((prevnumber) => prevnumber + 1);
        setAnswer((prevState) => ({ ...prevState, B: prevState.B + 1 }));
        break;
      case "C":
        console.log("C");
        setMessagesQuantity((prevnumber) => prevnumber + 1);
        setAnswer((prevState) => ({ ...prevState, C: prevState.C + 1 }));
        break;
      case "D":
        console.log("D");
        setMessagesQuantity((prevnumber) => prevnumber + 1);
        setAnswer((prevState) => ({ ...prevState, D: prevState.D + 1 }));
        break;
      default:
        console.log("No response");
    }
    console.log("HERE IS MESSAGE", answer, messagesQuantity);

    if (self || !message.startsWith("!")) return;
    const args = message.slice(1).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "disconnect" || !connected) {
      console.log("Saw !disconnect command in chat");
      client.disconnect();
    }

    console.log(client.readyState());
    console.log(`${tags["display-name"]}: ${message}`);
    console.log("Message received");
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

  return (
    <div>
      {sondagesData.map((item, index) => (
        <SondageDisplay
          currentSondage={item}
          key={index}
          currentResponses={answer}
          quantity={quantity}
          twitchConnect={handleTwitchConnect}
        />
      ))}
    </div>
  );
}

export default Sondage;
