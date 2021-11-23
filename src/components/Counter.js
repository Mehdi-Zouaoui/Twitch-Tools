import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import CounterDisplay from "./display/CounterDisplay";

export const getStaticProps = async () => {
  const counters = await fetch("http://localhost:3000/api/counter");
  const countersJSON = await counters.json();

  return {
    props: {
      countersData: countersJSON,
    },
  };
};

const Counter = ({ countersData }) => {
  const [formTitle, setFormTitle] = useState("");
  const [formColor, setFormColor] = useState("#3b96c3");
  const [formUpdate, setFormUpdate] = useState({
    counterData: {},
    update: false,
  });
  const [formCreation, setFormCreation] = useState(false);

  // const { user, error, isLoading } = useUser();
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
    axios
      .post(url + "/api/counter", data)
      .then((res) => {
        console.log("back", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="counterComponent">
      <div className="counterData">
        {countersData.map((item, index) => (
          <CounterDisplay data={item} key={index} update={setFormUpdate} />
        ))}
      </div>
      {formUpdate.update && (
        <div className="counterCreation">
          <div className="counterFormContainer">
            <h3 className="counterTitle">
              Modifier {formUpdate.counterData.title}
            </h3>
            <form className="counterForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="counterInputContainer">
                <input
                  className="counterFormTitle"
                  onChange={(e) => setFormTitle(e.target.value)}
                  {...register("title")}
                  placeholder={formUpdate.counterData.title}
                  name="title"
                />
                <input
                  type="color"
                  id="color"
                  name="color"
                  {...register("color")}
                  className="counterFormColor"
                  value={formUpdate.counterData.color}
                  onChange={(e) =>
                    setFormUpdate((prevState) => ({
                      counterData: {
                        ...prevState.counterData,
                        color: e.target.value,
                      },
                    }))
                  }
                />
              </div>{" "}
              <input
                type="submit"
                className="counterSubmit"
                value="Enregistrer"
              />
            </form>
          </div>
          <div className="counterPreviewContainer">
            <h5>Preview</h5>
            <div className="counterPreview">
              <h3>{formTitle}</h3>
              <div className="count" style={{ backgroundColor: formColor }}>
                {" "}
                0
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counter;
