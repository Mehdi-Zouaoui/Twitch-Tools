import { useState, useEffect, useRef } from "react";
import SondageDisplay from "../components/display/SondageDisplay";
const tmi = require("tmi.js");

function Sondage({ sondagesData, viewersResponses, quantity }) {
  const OAUTH_BOT_TOKEN = process.env.OAUTH_BOT_TOKEN;
  const [connected, setConnected] = useState(false);
  const [test, setTest] = useState(0);
  const refContainer = useRef({});
  const [selectedSurvey, setSelectedSurvey] = useState({});
  const [answer, setAnswer] = useState({});
  const SECRET = process.env.SECRET;
  const [messagesQuantity, setMessagesQuantity] = useState(0);
  useEffect(() => {
    if (Object.keys(selectedSurvey).length > 0) {
      selectedSurvey.fields.forEach((field, index) => {
        console.log("currentSurvey fields", field.name, index);
        refContainer.current[field.name] = 0;
      });

      handleTwitchConnect();
    }
  }, [selectedSurvey]);

  const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
      reconnect: true,
      secure: true,
    },
    identity: {
      username: "twoolsbot",
      password: "oauth:3v5b2me2u2xxq390nmub33xrhyhcxe",
    },
    channels: ["twoolsbot"],
  });

  client.on("connected", () => {
    console.log("The bot is Online!");
  });

  client.on("disconnected", () => {
    console.log(" DISCONNECTED The bot is Offline!");
  });

  client.on("message", (channel, tags, message, self) => {
    // if (self) return true;
    // users[tags.username] = true;
    Object.keys(refContainer.current).forEach((item) => {
      if (message === item) {
        refContainer.current[item]++;
      }
      setMessagesQuantity((prevnumber) => prevnumber + 1);
    });

    console.log("HERE IS MESSAGE", refContainer.current, messagesQuantity);

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

  const handleTwitchConnect = async (survey) => {
    if (connected) {
      setConnected(false);
      client.say("TwoolsBot", "disconnected");
    } else {
      client.connect();
      client.say("TwoolsBot", "connected");
      setConnected(true);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log(answer);
        }}
      ></button>
      {sondagesData.map((item, index) => (
        <div key={index}>
          <SondageDisplay
            currentSondage={item}
            currentResponses={answer}
            setSelectedSurvey={setSelectedSurvey}
            quantity={quantity}
          />
        </div>
      ))}
    </div>
  );
}

export default Sondage;
