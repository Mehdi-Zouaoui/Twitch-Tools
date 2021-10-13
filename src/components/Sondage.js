import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Sondage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional:
      name: "field", // unique name for your Field Array
      // keyName: "id", default to "id", you can change the key name
    }
  );

  const onSubmit = (data) => console.log(data);

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

        <form className="toolForm">
          <ul className="formInputs">
            {fields.map((item, index) => (
              <li key={item.id}>
                <div className="formField">
                  <label>Question {index + 1} :</label>
                  <div className="fieldContainer">
                    <input
                      className="field"
                      {...register(`field.${index}.name`)}
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
        <div className="display">
          <h3>Title</h3>
          <div className="preview">
            <div>{register.title}</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sondage;
