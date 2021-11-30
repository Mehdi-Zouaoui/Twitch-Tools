import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import CounterDisplay from "./display/CounterDisplay";
import { useRouter } from 'next/router';




const Counter = ({ countersData }) => {
  const router = useRouter();
  const [formTitle, setFormTitle] = useState("");
  const [formColor, setFormColor] = useState("#eb5e28");
  const [formUpdate, setFormUpdate] = useState({
    counterData: {},
    update: false,
  });
  const [formCreation, setFormCreation] = useState(false);
  const countersArray = [];
  localStorage.setItem('counters' , JSON.stringify(countersArray))

  // const { user, error, isLoading } = useUser();
  const url = "http://localhost:3000";
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const onSubmit = (data) => {
    // data.author = user.sub;
    console.log("data", data);
    axios
      .post(url + "/api/counter", data)
      .then((res) => {
        console.log("back", res);
        refreshData();
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
                style={{ backgroundColor: formUpdate.counterData.color }}
                className="counterSubmit"
                value="Enregistrer"
              />
            </form>
          </div>
        </div>
      )}
      {!formUpdate.update && (
        <div className="counterCreation">
          <div className="counterFormContainer">
            <h3 className="counterTitle">Créer</h3>
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
              <input
                type="submit"
                className="counterSubmit"
                value="Enregistrer"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Counter;
