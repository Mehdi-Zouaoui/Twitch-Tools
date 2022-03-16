import React from "react";

function SondageDisplay({
  currentSondage,
  currentResponses,
  quantity,
  twitchConnect,
  setSelected,
}) {
  return (
    <div>
      <h2>{currentSondage.title}</h2>
      <button
        onClick={() => {
          setSelected(currentSondage);
          twitchConnect();
        }}
      >
        Connect to Twitch
      </button>
      <div className="sondageFlexContainer">
        {currentSondage.fields.map((field, index) => (
          <div className="sondageField" key={index}>
            {field.name}
          </div>
        ))}
      </div>
      <div>
        {Object.keys(currentResponses).map((key, index) => (
          <div key={key}>
            {" "}
            <div>
              ICI - {key}-{currentResponses[key]}
            </div>
            {quantity > 0
              ? ((currentResponses[key] / quantity) * 100).toFixed(0) + "%"
              : currentResponses[key]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SondageDisplay;
