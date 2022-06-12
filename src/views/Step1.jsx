import React from "react";
import { useForm } from "react-hook-form";

const Step1 = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log("next button triggered");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} className="border" />
      <input {...register("email")} />
      <input {...register("password")} />
      <button>Next</button>
    </form>
  );
};

export default Step1;
