import { useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faDownload } from "@fortawesome/free-solid-svg-icons";
const LuckyWheel = () => {
  const [wheelItems, setWheelItems] = useState([]);
  const [wheelColors, setWheelColors] = useState([]);
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
    console.log("data", data);
  };

  useEffect(() => {
    append({ name: "Entrer votre question...", percent: "0" });
    append({ name: "Entrer votre question...", percent: "0" });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
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
            value={""}
            onChange={(e) => {
              e.preventDefault();
              setColor(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="submit" value="Enregistrer">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </form>
      {wheelItems.length
        ? wheelItems.map((item, index) => <div>{item}</div>)
        : ""}
    </div>
  );
};

export default LuckyWheel;
