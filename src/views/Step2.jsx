import { useStateMachine } from "little-state-machine";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";
import updateAction from "../utils/updateAction";

const COLORS_ENDPOINT = "http://localhost:3001/api/colors";

const Step1 = () => {
  const [colors, setColors] = useState(null);
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateAction });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      terms: state.terms,
    },
  });

  useEffect(() => {
    const abortController = new AbortController();

    const getColors = async () => {
      try {
        const res = await fetch(COLORS_ENDPOINT, {
          signal: abortController.signal,
        });

        const colorsArr = await res.json();

        setColors(colorsArr);

        // If user refreshed screen
        if (state.color) {
          setValue("color", state.color);
        }
      } catch (e) {
        if (!abortController.signal.aborted) {
          alert("System error. Please refresh.");
        }
      }
    };

    getColors();

    return () => {
      abortController.abort();
    };
  }, []);

  const onBackButtonClick = () => {
    navigate("../");
  };

  const onSubmit = (data) => {
    actions.updateAction(data);

    navigate("../confirmation");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl text-center mb-6">Additional Info</h1>
      <div className="flex flex-col">
        <Select
          {...register("color", {
            required: "Required",
          })}
          defaultValue=""
          error={errors.color?.message}
          options={colors}
          placeholder="Select Your Favorite Color"
        />
        <Checkbox
          {...register("terms", {
            required: "Required",
          })}
          error={errors.terms?.message}
          placeholder="E-Mail"
        />
      </div>
      <Button
        className="mt-6 mr-2"
        type="button"
        onClick={() => onBackButtonClick()}
        variant="secondary"
      >
        Back
      </Button>
      <Button className="mt-6" type="submit">
        Next
      </Button>
    </form>
  );
};

export default Step1;
