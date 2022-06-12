import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import { isValidEmail } from "../utils/validation";

const Step1 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log("next button triggered");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl text-center mb-6">Sign Up</h1>
      <div className="flex flex-col">
        <Input
          {...register("firstName", {
            required: "Required",
          })}
          placeholder="First Name"
          error={errors.firstName?.message}
        />
        <Input
          {...register("email", {
            required: "Required",
            pattern: {
              value: isValidEmail,
              message: "Please enter a valid email",
            },
          })}
          placeholder="E-Mail"
          error={errors.email?.message}
        />
        <Input
          {...register("password", {
            required: "Required",
            minLength: {
              value: 8,
              message: "Please use at least 8 characters",
            },
          })}
          placeholder="Password"
          error={errors.password?.message}
        />
      </div>
      <Button className="mt-6">Next</Button>
    </form>
  );
};

export default Step1;
