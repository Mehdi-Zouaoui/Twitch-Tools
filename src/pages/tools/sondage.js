import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

const Sondage = () => {
  const [formField, setFormFields] = useState([]);
  const { user } = useUser();
  const url = "http://localhost:3000";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional:
      name: "fields", // unique name for your Field Array
      // keyName: "id", default to "id", you can change the key name
    }
  );

  const onSubmit = (data) => {
    data.author = user.sub;
    console.log("data", data);
    // axios
    // .post(url + "/api/sondage", data)
    // .then((res) => {
    //   console.log("back", res);
    // })
    // .catch((err) => {
    //   console.log("err", err);
    // });
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h3 className="toolTitle">Sondage</h3>
        <button
          className="addField"
          onClick={() => {
            console.log("added");
            append({ name: "Entrer votre question..." });
          }}
        >
          Ajouter un réponse
        </button>
        <button className="changeFormat"> Test </button>

        <form className="toolForm" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title"> Titre : </label>
          <input className="field" {...register("title")} name="title" />
          <ul className="formInputs">
            {fields.map((item, index) => (
              <li key={item.id}>
                <div className="formField">
                  <label>Question {index + 1} :</label>
                  <div className="fieldContainer">
                    <input
                      className="field"
                      {...register(`fields.${index}.name`)}
                    />
                    <button
                      type="button"
                      className="deleteButton"
                      onClick={() => remove(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <input type="submit" className="submit" value="Enregistrer" />
        </form>
      </div>
      <div className="previewContainer">
        <h5>Preview</h5>
        {fields.length ? (
          <div className="display">
            <h3>Title</h3>
            <div className="preview">
              {fields.map((item, index) => (
                <div className="previewContent">
                  <div className="previewIndex">{index + 1}.</div>
                  <div>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Ajouter une question pour voir le preview</div>
        )}
      </div>
    </div>
  );
};

export default Sondage;
