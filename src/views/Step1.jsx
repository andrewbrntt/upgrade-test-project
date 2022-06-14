import { useStateMachine } from "little-state-machine";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import updateAction from "../utils/updateAction";
import { isValidEmail } from "../utils/validation";

// Opted to use react-hook-form for handling form state
const Step1 = () => {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateAction });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: state.name,
      email: state.email,
      password: state.password,
    },
  });

  const onSubmit = (data) => {
    actions.updateAction(data);

    navigate("/more-info");
  };

  // No explicit validation in readme so added a couple basic validations based on real world apps
  // Assumption 1: First name is required
  // Assumption 2: E-mail is required and must match e-mail regex pattern
  // Assumption 3: Password is required, must be at least 8 characters, and will be visible to the user
  return (
    <form data-testid="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl text-center mb-6">Sign Up</h1>
      <div className="flex flex-col mb-6 min-h-[200px]">
        <Input
          {...register("name", {
            required: "Name required",
          })}
          error={errors.name?.message}
          placeholder="First Name"
        />
        <Input
          {...register("email", {
            required: "E-Mail required",
            pattern: {
              value: isValidEmail,
              message: "Please enter a valid e-mail",
            },
          })}
          error={errors.email?.message}
          placeholder="E-Mail"
        />
        <Input
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 8,
              message: "Please use at least 8 characters",
            },
          })}
          error={errors.password?.message}
          placeholder="Password"
        />
      </div>
      <Button cta="Next" />
    </form>
  );
};

export default Step1;
