import { useState, useEffect, useRef, useCallback } from "react";
import SondageDisplay from "../components/display/SondageDisplay";
import { useUser } from "@auth0/nextjs-auth0";

const tmi = require("tmi.js");

function Sondage({ sondagesData, viewersResponses, quantity }) {
  const OAUTH_BOT_TOKEN = process.env.OAUTH_BOT_TOKEN;
  const [selectedSurvey, setSelectedSurvey] = useState({});

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    console.log("rerendered");
    console.log(Object.keys(selectedSurvey).length);
  }, [selectedSurvey]);

  const test = () => {
    console.log(client.readyState());
  };

  return (
    <div>
      {sondagesData.map((item, index) =>
        item.author === user.sub ? (
          <div key={index}>
            <SondageDisplay
              currentSondage={item}
              selectedSurvey={selectedSurvey}
              setSelectedSurvey={setSelectedSurvey}
            />
          </div>
        ) : null
      )}
    </div>
  );
}

export default Sondage;
