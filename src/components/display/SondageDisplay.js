import React from "react";
import { useState, useEffect, useCallback } from "react";

function SondageDisplay({
  currentSondage,
  currentResponses,
  quantity,
  test,
  connected,
  selectedSurvey,
  setSelectedSurvey,
}) {

  useEffect(() => {
    console.log("HEYO" , connected);
  }, [selectedSurvey]);
  return ( 
    <div >
      <h2>{currentSondage.title}</h2>
      <button
        onClick={() => {
          
          setSelectedSurvey(currentSondage);
        }}
      >
        Connect to Twitch
      </button>
      <button
        onClick={() => {
          test();
        }}
      >
        DC
      </button>

      <div className="sondageFlexContainer" >
        {connected ? (
          <div className="sondageFieldsContainer" style={{backgroundColor:currentSondage.color}}>
            {Object.keys(currentResponses.current).map((key, index) => (
              <div key={key} className="sondageField">
                <div>{index + 1}.</div>
                <div> {[key]}</div>

                <div>
                  {quantity.current > 0
                    ? (
                        (currentResponses.current[key] / quantity.current) *
                        100
                      ).toFixed(0) + "%"
                    : currentResponses.current[key]}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="sondageFlexContainer" style={{backgroundColor:currentSondage.color}}>
            {currentSondage.fields.map((field, index) => (
              <div className="sondageField" key={index}>
                {field.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SondageDisplay;
