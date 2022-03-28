import TimerDisplay from "../components/display/TimerDisplay";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faEyeDropper,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const getStaticProps = async () => {
  const timers = await fetch("http://localhost:3000/api/timer");
  const timersJSON = await timers.json();
  return {
    props: {
      timersData: timersJSON,
    },
  };
};

const Timer = ({ timersData }) => {
  const timersArray = [];
  const [formColor, setFormColor] = useState("#eb5e28");
  const [formTitle, setFormTitle] = useState("");
  const [type, setType] = useState(false);
  const [display, setDisplay] = useState("");
  const [format, setFormat] = useState({});
  const [checked, setChecked] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
    milliseconds: false,
  });
  const [rangeValue, setRangeValue] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const url = "http://localhost:3000";
  if (
    JSON.parse(localStorage.getItem("timers")) === null ||
    JSON.parse(localStorage.getItem("timers")).length === 0
  ) {
    localStorage.setItem("timers", JSON.stringify(timersArray));
  }
  let storedTimers = JSON.parse(localStorage.getItem("timers"));
  const [timers, setTimers] = useState(storedTimers);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("yes");
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  const onSubmit = (data) => {
    // data.author = user.sub;
   
    
    data.type = type;
    if(data.type === false){

      data.values = 
      (rangeValue.days * 24 * 60 * 60 * 1000) + 
      (rangeValue.hours * 60 * 60 *1000) +
      (rangeValue.minutes * 60 * 1000 )+ 
      (rangeValue.seconds * 1000) +
      (rangeValue.milliseconds);
      data.display = "dial"
      data.checked = checked;
    } 
    else data.values = 0;
    
    console.log("data", data);
    axios
      .post(url + "/api/timer", data)
      .then((res) => {
        console.log("back", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="timerComponent">
      <div className="timersContainer">
        {timersData.map((item, index) => (
          <TimerDisplay
            currentTimer={item}
            key={index}
            timers={timers}
            setTimers={setTimers}
          />
        ))}
      </div>
      <div className="timerCreation">
        <div className="timerFormContainer">
          <h3 className="timerTitle">Créer</h3>
          <form className="timerForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="timerInputContainer">
              <div className="timerTitleAndColor">
                <input
                  className="timerFormTitle"
                  onChange={(e) => setFormTitle(e.target.value)}
                  {...register("title")}
                  placeholder="Rentrer un titre"
                  name="title"
                />
                <input
                  type="color"
                  id="color"
                  name="color"
                  {...register("color")}
                  className="timerFormColor"
                  value={formColor}
                  onChange={(e) => setFormColor(e.target.value)}
                />
                <div className="timerDirection">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setType(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setType(false);
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              </div>
              <div className="timerFlexContainer">
                {/* <div className="displayButtonContainer">
                  <button
                    className="displayChoiceButton defaultChoice"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisplay("stopwatch");
                    }}
                  >
                    <FontAwesomeIcon icon={faStopwatch} />
                  </button>
                  <button
                    className="displayChoiceButton"
                    onClick={(e) => {
                      e.preventDefault();
                      setDisplay("dial");
                    }}
                  >
                    <div>00:00</div>
                  </button>
                </div> */}
                {type === false && (
                  <div className="timePicker">
                    {/* <div>
                    <input type="text" />
                    <input type="text" />
                  </div> */}
                    <div className="timePickerContainer">
                      <div className="rangeContainer">
                        <div htmlFor="days" className="dateSelect">
                          <input
                            name="days"
                            type="checkbox"
                            onClick={() =>
                              setChecked((prevState) => ({
                                ...prevState,
                                days: !prevState.days,
                              }))
                            }
                          />
                          <h4>Jours</h4>
                        </div>
                        <div className="rangeDisplayContainer">
                          <input
                            disabled={!checked.days}
                            id="range"
                            type="range"
                            value={rangeValue.days}
                            onChange={(e) =>
                              setRangeValue((prevState) => ({
                                ...prevState,
                                days: e.target.value,
                              }))
                            }
                            name="daysRange"
                            min="0"
                            max="365"
                            step="1"
                          />
                          <div>{rangeValue.days}</div>
                        </div>
                      </div>
                      <div className="rangeContainer">
                        <div htmlFor="hours" className="dateSelect">
                          <input
                            name="hours"
                            type="checkbox"
                            onClick={() =>
                              setChecked((prevState) => ({
                                ...prevState,
                                hours: !prevState.hours,
                              }))
                            }
                          />
                          <h4>Heures</h4>{" "}
                        </div>
                        <div className="rangeDisplayContainer">
                          <input
                            id="range"
                            type="range"
                            value={rangeValue.hours}
                            onChange={(e) =>
                              setRangeValue((prevState) => ({
                                ...prevState,
                                hours: e.target.value,
                              }))
                            }
                            disabled={!checked.hours}
                            min="0"
                            max="24"
                            step="1"
                          />
                          <div>{rangeValue.hours}</div>
                        </div>
                      </div>{" "}
                      <div className="rangeContainer">
                        <div htmlFor="minutes" className="dateSelect">
                          <input
                            name="minutes"
                            type="checkbox"
                            onClick={() =>
                              setChecked((prevState) => ({
                                ...prevState,
                                minutes: !prevState.minutes,
                              }))
                            }
                          />
                          <h4>Minutes</h4>{" "}
                        </div>
                        <div className="rangeDisplayContainer">
                          <input
                            id="range"
                            type="range"
                            value={rangeValue.minutes}
                            onChange={(e) =>
                              setRangeValue((prevState) => ({
                                ...prevState,
                                minutes: e.target.value,
                              }))
                            }
                            disabled={!checked.minutes}
                            min="0"
                            max="60"
                            step="1"
                          />
                          <div>{rangeValue.minutes}</div>
                        </div>
                      </div>
                      <div className="rangeContainer">
                        <div htmlFor="seconds" className="dateSelect">
                          <input
                            name="seconds"
                            type="checkbox"
                            onClick={() =>
                              setChecked((prevState) => ({
                                ...prevState,
                                seconds: !prevState.seconds,
                              }))
                            }
                          />
                          <h4>Secondes</h4>{" "}
                        </div>

                        <div className="rangeDisplayContainer">
                          <input
                            id="range"
                            type="range"
                            value={rangeValue.seconds}
                            onChange={(e) =>
                              setRangeValue((prevState) => ({
                                ...prevState,
                                seconds: e.target.value,
                              }))
                            }
                            disabled={!checked.seconds}
                            min="0"
                            max="60"
                            step="1"
                          />
                          <div>{rangeValue.seconds}</div>
                        </div>
                      </div>{" "}
                      <div className="rangeContainer">
                        <div htmlFor="milliseconds" className="dateSelect">
                          <input
                            name="milliseconds"
                            type="checkbox"
                            onClick={() =>
                              setChecked((prevState) => ({
                                ...prevState,
                                milliseconds: !prevState.milliseconds,
                              }))
                            }
                          />
                          <h4>Millisecondes</h4>{" "}
                        </div>
                        <div className="rangeDisplayContainer">
                          <input
                            id="range"
                            type="range"
                            value={rangeValue.milliseconds}
                            onChange={(e) =>
                              setRangeValue((prevState) => ({
                                ...prevState,
                                milliseconds: e.target.value,
                              }))
                            }
                            disabled={!checked.milliseconds}
                            min="0"
                            max="100"
                            step="1"
                          />
                          <div>{rangeValue.milliseconds}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* <select {...register("format")} defaultValue="Format">
                <option value="Day">DD : HH : MM</option>
                <option value="Hour">HH : MM : SS</option>
                <option value="Minutes">MM : SS : MS</option>
              </select> */}
              {/* 
              
              {!type && (
                  
                
              )} */}
            </div>{" "}
            <input
              type="submit"
              className="timerSubmit"
             
              value="Enregistrer"
              style={{ backgroundColor: formColor }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Timer;
