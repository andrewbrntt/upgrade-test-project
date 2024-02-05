import { useStateMachine } from "little-state-machine";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import updateAction from "../utils/updateAction";
import { isValidEmail, isValidFirstName } from '../utils/validation'
import { Helmet } from 'react-helmet'
import FocusableHeader from "../components/FocusableHeader";
// import FocusableHeader from '../components/FocusableHeader'

// Opted to use react-hook-form for handling form state
const Step1 = () => {
  const navigate = useNavigate();
  const { actions } = useStateMachine({ updateAction });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: '',
      email: '',
      password: '',
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
    <>
      <Helmet>
        <title>Sign Up Step (1/2) | Upgrade Challenge</title>
      </Helmet>
      <FocusableHeader className="text-2xl text-center mb-6">Sign Up (Step 1/2)</FocusableHeader>
      <p className="text-lg mb-5">Required Fields <span className="text-rose-700 font-bold">*</span></p>
      <form data-testid="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-6 min-h-[200px]">
          <div>
            <label htmlFor="firstname">First Name <span className="text-rose-700 font-bold" title="Required Field">*</span></label>
            <Input
                {...register('firstname', {
                  required: 'First Name Required',
                  pattern: {
                    value: isValidFirstName,
                    message: "Please only use letters in name.",
                  }
                })}
                error={errors.firstname?.message}
                isRequired={true}
                id="firstname"
                autoComplete="given-name"
                type="text"
            />
          </div>
          <div>
            <label htmlFor="email">E-Mail <span className="text-rose-700 font-bold"
                                                title="Required Field">*</span></label>
            <Input
                {...register('email', {
                  required: "E-Mail Required",
              pattern: {
                value: isValidEmail,
                message: "Please enter a valid e-mail",
              },
            }) }
            error={ errors.email?.message }
            id="email"
            requirements="Format: test@test.com"
            autoComplete="email"
            type="email"
          />
          </div>
          <div>
            <label htmlFor="password">Password <span className="text-rose-700 font-bold" title="Required Field">*</span></label>
            <Input
                {...register("password", {
                  required: "Password Required",
              minLength: {
                value: 8,
                message: "Please use at least 8 characters",
              },
            }) }
            error={ errors.password?.message }
            type="password"
            autoComplete="new-password"
            requirements="Password must contain at least 8 characters."
            id="password"
          />
        </div>
        </div>
        <Button cta="Next"/>
      </form>
    </>
  );
};

export default Step1;
