import React from "react";

function SondageDisplay({ currentSondage, key, currentResponses, quantity , twitchConnect }) {
  return (
    <div key={key}>
      <h2>{currentSondage.title}</h2>
      <button onClick={() => {twitchConnect()}}>Connect to Twitch</button>
      <div className="sondageFlexContainer">
        {currentSondage.fields.map((field, index) => (
          <div className="sondageField" key={index}>
            {field.name}
          </div>
        ))}
      </div>
      <div>
        {quantity > 0
          ? ((currentResponses.A / quantity) * 100).toFixed(0) + "%"
          : currentResponses.A}
      </div>
      <div>
        {quantity > 0
          ? ((currentResponses.B / quantity) * 100).toFixed(0) + "%"
          : currentResponses.B}
      </div>
      <div>
        {quantity > 0
          ? ((currentResponses.C / quantity) * 100).toFixed(0) + "%"
          : currentResponses.C}
      </div>
      <div>
        {quantity > 0
          ? ((currentResponses.D / quantity) * 100).toFixed(0) + "%"
          : currentResponses.D}
      </div>
    </div>
  );
}

export default SondageDisplay;
