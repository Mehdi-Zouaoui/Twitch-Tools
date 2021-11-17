import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

export const getStaticProps = async () => {
  const counters = await fetch("http://localhost:3000/api/counter");
  const countersJSON = await counters.json();
 

  return {
    props: {
      countersData: countersJSON,
    },
  };
};


const Counter = ({countersData}) => {
  console.log('con' , countersData)
  const [formTitle, setFormTitle] = useState("");
  const [formColor, setFormColor] = useState("#3b96c3");
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
      
      <div className="counterFormContainer">
        <h3 className="counterTitle">Counter</h3>
        <div>
        {countersData.map((item, index) => (
           <div className="counterDisplay" key={index}>
              {item.title}
            </div>
        ))}
        </div>

        <form className="counterForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="counterInputContainer">
            <input
              className="counterFormTitle"
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

