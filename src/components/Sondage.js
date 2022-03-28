import { useState, useEffect, useRef, useCallback } from "react";
import SondageDisplay from "../components/display/SondageDisplay";
const tmi = require("tmi.js");

function Sondage({ sondagesData, viewersResponses, quantity }) {
  const OAUTH_BOT_TOKEN = process.env.OAUTH_BOT_TOKEN;
  const [connected, setConnected] = useState(false);
  const [selected, setSelected] = useState(false);
  const refContainer = useRef({});
  const [count, setCount] = useState(0);
  const refQuantity = useRef(0);
  const [selectedSurvey, setSelectedSurvey] = useState({});
  const [answer, setAnswer] = useState({});
  const SECRET = process.env.SECRET;
  const [messagesQuantity, setMessagesQuantity] = useState(0);
  useEffect(() => {
    if (Object.keys(selectedSurvey).length > 0) {
      selectedSurvey.fields.forEach((field, index) => {
        console.log("currentSurvey fields", field.name, index);
        refContainer.current[field.name] = 0;
        return () => {
          setAnswer((prevState) => ({
            ...prevState,
            [field.name]: 0,
          }));
        };
      });

      handleTwitchConnect();
    }
  }, [selectedSurvey]);

  const onRefChange = useCallback(
    (node) => {
      console.log(node);
    },
    [count]
  );

  const disconnectBot = () => {
    console.log("dc function fired");
    client.say("twoolsbot", "disconnected");
  };
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
    client.say("twoolsbot", "connected");
  });

  client.on("disconnected", () => {
    console.log(" DISCONNECTED The bot is Offline!");
    client.say("twoolsbot", "disconnected");
  });

  client.on("message", (channel, tags, message, self) => {
    // if (self) return true;
    // users[tags.username] = true;
    console.log("Message sended");

    Object.keys(refContainer.current).forEach((item, index) => {
      console.log(" LE CONTENU ", item, "LA POSITION ", index + 1);
      if (message == index + 1) {
        refContainer.current[item]++;
        refQuantity.current++;
        setCount((currentValue) => currentValue + 1);
        setAnswer(refContainer.current);
      }
    });

    console.log("HERE IS MESSAGE", refContainer.current, refQuantity.current);

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
    } else {
      client.connect();

      setConnected(true);
    }
  };

  return (
    <div>
      {sondagesData.map((item, index) => (
        <div key={index}>
          <SondageDisplay
            currentSondage={item}
            currentResponses={refContainer}
            setSelectedSurvey={setSelectedSurvey}
            quantity={refQuantity}
            disconnect={disconnectBot}
            ref={onRefChange}
          />
        </div>
      ))}
    </div>
  );
}

export default Sondage;
