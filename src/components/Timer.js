import TimerDisplay from "../components/display/TimerDisplay";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faEyeDropper } from "@fortawesome/free-solid-svg-icons";
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
              <select {...register("format")} defaultValue="Format">
                <option value="Day">DD : HH : MM</option>
                <option value="Hour">HH : MM : SS</option>
                <option value="Minutes">MM : SS : MS</option>
              </select>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplay("stopwatch");
                  }}
                >
                  <FontAwesomeIcon icon={faStopwatch} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setDisplay("dial");
                  }}
                >
                  <div>00:00</div>
                </button>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setType(true);
                  }}
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setType(false);
                  }}
                >
                  {" "}
                  -
                </button>
              </div>
              {!type && (
                <input type="time" placeholder="Saisir le début"></input>
              )}
            </div>{" "}
            <input
              type="submit"
              className="counterSubmit"
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
