import { useForm } from "react-hook-form";

const Input = ({ label, register, required }) => {
  return (
    <div className="formField">
      <label>{label} :</label>
      <input className="field" {...register(label.toLowerCase().replace(/\s/g, '_'), { required })} />
    </div>
  );
};

const Tool = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  if ((type = 1)) {
    return (
      <div className="container">
        <div className="formContainer">
          <h3 className="toolTitle">Sondage</h3>
          <button className="addField">Ajouter un réponse</button>

          <form className="toolForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="formInputs">
              <Input label="Title" id="Title" register={register} />
              <Input label="Reponse 1" id="Title" register={register} />
              <Input label="Reponse 2" id="Title" register={register} />
              <Input label="Reponse 3" id="Title" register={register} />
              <Input label="Reponse 4" id="Title" register={register} />
            </div>
            {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" className="submit" value="Enregistrer" />
          </form>
        </div>
        <div className="previewContainer">
        <h5>Preview</h5>
          <div className="display">
        
            <h3>Title</h3>
            <div className="preview">
                <div>Test</div>
                <div>Test</div>
                <div>Test</div>
                <div>Test</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div> Non </div>;
};
export default Tool;
