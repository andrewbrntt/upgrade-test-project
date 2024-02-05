import { useStateMachine } from "little-state-machine";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import updateAction from "../utils/updateAction";
import { Helmet } from 'react-helmet'

const FORM_SUBMIT_ENDPOINT = "http://localhost:3001/api/submit";

const Confirmation = () => {
  const [loading, setLoading] = useState(false);
  const { state } = useStateMachine({ updateAction });
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const onBackButtonClick = () => {
    navigate("../more-info");
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(FORM_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      res.status === 200 ? navigate("../success") : navigate("../error");
    } catch (e) {
      alert("System error. Please try again.");

      setLoading(false);
    }
  };
  // Assumption: All fields are visible to the user on load (even password)
  return (
    <>
      <Helmet>
        <title>Sign Up Confirmation | Upgrade Challenge</title>
      </Helmet>
      <h1 className="text-2xl text-center mb-6">Confirmation</h1>
      <form data-testid="confirmation-form" onSubmit={ handleSubmit(onSubmit) }>
        <div className="flex flex-col mb-6 min-h-[200px] items-center">
          <ul className="list-disc">
              <li><span className='font-bold'>First Name:</span> { state.firstname }</li>
              <li><span className='font-bold'>E-Mail:</span> {state.email}</li>
              <li><span className='font-bold'>Password:</span> {state.password}</li>
              <li><span className='font-bold'>Favorite Color:</span> {state.color}</li>
              <li><span className='font-bold'>Terms and Conditions:</span> {state.terms ? "Agreed" : "Not Agreed" }</li>
          </ul>
        </div>
        <Button
          className="mr-2"
          cta="Back"
          type="button"
          onClick={ () => onBackButtonClick() }
          variant="secondary"
        />
        <Button cta="Submit" loading={ loading }/>
      </form>
      </>
      );
      };

      export default Confirmation;
