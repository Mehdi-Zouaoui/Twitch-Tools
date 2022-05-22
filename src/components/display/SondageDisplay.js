import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_SURVEY } from "../../../graphql/queries";
const SondageDisplay = ({
  currentSondage,
  selectedSurvey,
  setSelectedSurvey,
}) => {
  const [streamed, setStreamed] = useState(false);
  const [started, setStarted] = useState(false);
  const [updateSurvey] = useMutation(UPDATE_SURVEY, {
    onCompleted: (data) => {
      console.log("completed");
    },
    // onError(err) {
    //   console.log("error here", err);
    // },
  });
  useEffect(() => {}, []);

  const handleStart = () => {
    setStarted(true);
    updateSurvey({
      variables: {
        updateSurveyId: currentSondage.id,
        input: {
          started: true,
        },
      },
    });
  };
  const handleStop = () => {
    setStarted(false);
    updateSurvey({
      variables: {
        updateSurveyId: currentSondage.id,
        input: {
          started: false,
        },
      },
    });
  };
  const handleCurrentSurvey = () => {
    if (Object.keys(selectedSurvey).length) {
      console.log("already streamed");
      if (streamed) {
        setSelectedSurvey({});
        setStreamed(false);
        updateSurvey({
          variables: {
            updateSurveyId: currentSondage.id,
            input: {
              isStreamed: false,
            },
          },
        });
      }
    } else {
      setSelectedSurvey(currentSondage);
      setStreamed(true);
      updateSurvey({
        variables: {
          updateSurveyId: currentSondage.id,
          input: {
            isStreamed: true,
          },
        },
      });
    }
  };
  return (
    <div>
      <h2>{currentSondage.title}</h2>
      {streamed === false ? (
        ""
      ) : (
        <button
          onClick={() => {
            started ? handleStop() : handleStart();
          }}
        >
          {started ? <div>Stop</div> : <div>Start</div>}
        </button>
      )}

      <button
        onClick={() => {
          handleCurrentSurvey();
        }}
      >
        {!streamed ? <div>Stream</div> : <div>Unstream</div>}
      </button>

      <div className="sondageFlexContainer">
        <div
          className="sondageFieldsContainer"
          style={{ backgroundColor: currentSondage.color }}
        ></div>

        <div
          className="sondageFlexContainer"
          style={{ backgroundColor: currentSondage.color }}
        >
          {currentSondage.fields.map((field, index) => (
            <div className="sondageField" key={index}>
              {field.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SondageDisplay;
