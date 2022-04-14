import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus , faDownload  } from "@fortawesome/free-solid-svg-icons";
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

useEffect(() => {

  append({ name: "Entrer votre question..." });
  append({ name: "Entrer votre question..." });
}, [])

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
    <div className="surveyContainer">
      <div className="formContainer">
        <div className="surveyFormHeader">
        <h3 className="toolTitle">Créer votre Sondage</h3>
        <button type="submit" className="submit" value="Enregistrer" >
        <FontAwesomeIcon icon={faDownload}/>
        </button>
        </div>
  
        <form className="toolForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="surveyTitleContainer">
            <label htmlFor="title"> Titre  </label>
            <input className="newField" {...register("title")} name="title" />
          </div>

          <h4 className="surveySubtitle">Réponses</h4>
          <ul className="surveyFormInputs">
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
          <button
            className="addSurveyField"
            onClick={() => {
              console.log("added");
              append({ name: "Entrer votre question..." });
            }}
          >
                   <FontAwesomeIcon icon={faPlus} className="plusIcon" />

            Ajouter un réponse
          </button>
          <div className="indexTypeContainer">
            <div>A.</div>
            <div  className="active">1.</div>
          </div>
   
        </form>
      </div>
      <div className="previewContainer">
      
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
