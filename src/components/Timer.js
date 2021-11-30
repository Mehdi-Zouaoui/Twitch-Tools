import TimerDisplay from "../components/display/TimerDisplay";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
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
  const url = "http://localhost:3000";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // data.author = user.sub;
    console.log("data", data);
    data.type = type;
    data.display = display;
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
          <TimerDisplay data={item} key={index} />
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
                <div className="displayButtonContainer">
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
                </div>
                <div className="checkboxContainer">
                  <label>
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
                    Jours
                  </label>
                  <label>
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
                    Heures
                  </label>
                  <label>
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
                    Minutes
                  </label>
                  <label>
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
                    Secondes
                  </label>
                  <label>
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
                    Millisecondes
                  </label>
                </div>
              </div>
              {/* <select {...register("format")} defaultValue="Format">
                <option value="Day">DD : HH : MM</option>
                <option value="Hour">HH : MM : SS</option>
                <option value="Minutes">MM : SS : MS</option>
              </select> */}
              {/* 
              
              {!type && (
                  
                
              )} */}
              <div className="timerDataContainer">
                {checked.days && <div><h5>Jours</h5><input type="number"/></div>}
                {checked.hours && <div><h5>Heures</h5><input type="number"/></div>}
                {checked.minutes && <div><h5>Minutes</h5><input type="number"/></div>}
                {checked.seconds && <div><h5>Secondes</h5><input type="number"/></div>}
                {checked.milliseconds && <div><h5>Millisecondes</h5><input type="number"/></div>}
              </div>
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
