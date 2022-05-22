import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { CREATE_SURVEY } from "../../../graphql/queries";
import { useUser } from "@auth0/nextjs-auth0";
``;
import { useRouter } from "next/router";
import axios from "axios";

const Sondage = () => {
  const [formField, setFormFields] = useState([]);
  const [indexType, setIndexType] = useState("number");
  const [color, setColor] = useState("#f5cb5c");
  const { user } = useUser();
  const url = "http://localhost:3000";
  const router = useRouter();
  const [createSurvey] = useMutation(CREATE_SURVEY, {
    onCompleted: (data) => {
      console.log("completed");
    },
    // onError(err) {
    //   console.log("error here", err);
    // },
  });

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
    append({ name: "Entrer votre question...", percent: "0" });
    append({ name: "Entrer votre question...", percent: "0" });
  }, []);

  const onSubmit = (data) => {
    data.author = user.sub;
    data.index = indexType;
    data.color = color;
    data.isStreamed = false;
    console.log("data", data);
    createSurvey({
      variables: {
        survey: {
          author: user.sub,
          color: data.color,
          title: data.title,
          fields: data.fields,
          index: data.index,
          isStreamed: data.isStreamed,
          started: false,
        },
      },
    });
  };

  return (
    <div className="surveyContainer">
      <div className="formContainer">
        <h3 className="toolTitle">Créer votre Sondage</h3>

        <form className="toolForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="surveyFormHeader">
            <div className="surveyTitleContainer">
              <label htmlFor="title"> Titre </label>
              <input className="newField" {...register("title")} name="title" />
            </div>
            <input
              type="color"
              id="color"
              name="color"
              className="counterFormColor"
              value={color}
              onChange={(e) => {
                e.preventDefault();
                setColor(e.target.value);
              }}
            />
          </div>

          <h4 className="surveySubtitle">Réponses</h4>
          <ul className="surveyFormInputs">
            {fields.map((item, index) => (
              <li key={index}>
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
            type="button"
            className="addSurveyField"
            onClick={() => {
              console.log("added");
              append({ name: "Entrer votre question...", percent: "0" });
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="plusIcon" />
            Ajouter un réponse
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="indexTypeContainer">
              <div
                onClick={() => {
                  setIndexType("letter");
                }}
              >
                A.
              </div>
              <div
                onClick={() => {
                  setIndexType("number");
                }}
                className="active"
              >
                1.
              </div>
            </div>
            <div className="displayType">
              <div className="quizz">ICON DE QUIZZ</div>
              <div className="survey">ICONE DE SONDAGE</div>
            </div>
          </div>
          <button type="submit" className="submit" value="Enregistrer">
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </form>
      </div>
      <div className="previewContainer">
        {fields.length ? (
          <div className="display">
            <h3>Title</h3>
            <div className="preview">
              {/* {fields.map((item, index) => (
                <div className="previewContent" key={item.id + "00AZ0"}>
                  <div className="previewIndex">{index + 1}.</div>
                  <div>{item.name}</div>
                </div>
              ))} */}
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
