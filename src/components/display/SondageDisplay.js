import React from "react";
import { useState, useEffect, useCallback } from "react";

function SondageDisplay({
  currentSondage,
  currentResponses,
  quantity,
  setSelectedSurvey,
}) {
  const [test ,setTest] = useState(false);
  
  
 
  return (
    <div>
      <h2>{currentSondage.title}</h2>
      <button
        onClick={() => {
          setSelectedSurvey(currentSondage)
        }}
      >
        Connect to Twitch
      </button>
      <button onClick={() =>{
        console.log(currentResponses.current , quantity.current)
        setTest(!test)
      }}> Tester les référence</button>
      <div className="sondageFlexContainer">
        {currentSondage.fields.map((field, index) => (
          <div className="sondageField" key={index}>
            {field.name}
          </div>
        ))}
      </div>
      <div>
        {Object.keys(currentResponses.current).map((key, index) => (
          <div key={key}>
            {" "}
            <div>
              ICI - {key}-{currentResponses.current[key]}
            </div>
            {quantity.current > 0
              ? ((currentResponses.current[key] / quantity.current) * 100).toFixed(0) + "%"
              : currentResponses.current[key]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SondageDisplay;
