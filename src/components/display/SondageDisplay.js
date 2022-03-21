import React from "react";
import { useState, useEffect, useCallback } from "react";

function SondageDisplay({
  currentSondage,
  currentResponses,
  quantity,
  setSelectedSurvey,
}) {
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <h2>{currentSondage.title}</h2>
      <button
        onClick={() => {
          setSelected(true);
          setSelectedSurvey(currentSondage);
        }}
      >
        Connect to Twitch
      </button>

      <div className="sondageFlexContainer">
        {selected ? (
          <div className="sondageFieldsContainer">
            {Object.keys(currentResponses.current).map((key, index) => (
              <div key={key} className="sondageField">
                <div>{[key]}</div>

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
          <div className="sondageFlexContainer">
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
