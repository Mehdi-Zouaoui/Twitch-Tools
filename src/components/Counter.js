import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

const Counter = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formColor, setFormColor] = useState("#3b96c3");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.author = user.sub;
    console.log("data", data);
    // axios
    //   .post(url + "/api/sondage", data)
    //   .then((res) => {
    //     console.log("back", res);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
  };

  return (
    <div className="counterComponent">
      <div className="counterFormContainer">
        <h3 className="counterTitle">Counter</h3>
        <form className="counterForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="counterInputContainer">
            <input
              className="counterFormTitle"
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Rentrer un titre"
              name="title"
            />
            <input
              type="color"
              id="color"
              name="color"
              className="counterFormColor"
              value={formColor}
              onChange={(e) => setFormColor(e.target.value)}
            />
          </div>{" "}
          <input type="submit" className="counterSubmit" value="Enregistrer" />
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
  );
};

export default Counter;
