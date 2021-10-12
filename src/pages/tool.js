import { useForm } from "react-hook-form";
const Tool = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  if ((type = 1)) {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
         
          <input {...register("title")} />
       
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
    );
  } else return <div> Non </div>;
};
export default Tool;
