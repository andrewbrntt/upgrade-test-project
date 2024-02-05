import { useStateMachine } from "little-state-machine";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Select from "../components/Select";
import updateAction from "../utils/updateAction";
import { Helmet } from 'react-helmet'
import openNewTabIcon from "../images/arrow-up-right-from-square-solid.svg";
import FocusableHeader from '../components/FocusableHeader'

const COLORS_ENDPOINT = "http://localhost:3001/api/colors";

const Step2 = () => {
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

  // Opted to load the colors when user reaches this step for logic simplicity
  // If more complex, I would use react query and add queries to the initial step so that this data is pre-loaded (and to this step in case the user refreshes)
  // Potential UX enhancement with current solution would be to check if color value exists and if so, do not call getColors again to avoid an extra request
  // Assumption: getColors endpoint is quick enough that it can be called each time this step is loaded without impacting UX
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackButtonClick = () => {
    navigate("../");
  };

  const onSubmit = (data) => {
    actions.updateAction(data);

    navigate("../confirmation");
  };

  // No explicit validation in readme so added a couple basic validations based on real world apps
  // Assumption 1: Color is required
  // Assumption 2: Terms and Conditions is required
  // See Checkbox component for comment regarding rendering T&C verbiage in span instead of label
  return (
      <>
        <Helmet>
          <title>Sign Up Step (2/2) | Upgrade Challenge</title>
        </Helmet>
        <FocusableHeader className="text-2xl text-center mb-6">Sign Up (Step 2 /2)</FocusableHeader>
        <p className="text-lg mb-5">Required Fields <span className="text-rose-700 font-bold">*</span></p>
        <form data-testid="more-info-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-6 min-h-[200px]"
          >
            <label htmlFor="favorite-color">Whats Your Favorite Color? <span className="text-rose-700 font-bold"
                                                                             title="Required Field">*</span></label>
            <Select
                {...register("color", {
                  required: "Color Selection Required",
                })}
                isRequired={true}
                data-testid="color-select"
                defaultValue=""
                error={errors.color?.message}
                options={colors}
                id="favorite-color"
                placeholder="Select Color"
            />
            <Checkbox
                {...register("terms", {
                  required: "Terms Acceptance Required",
                })}
                data-testid="terms-checkbox"
                error={errors.terms?.message}
                isRequired={true}
                id="terms-checkbox"
            >
              <label htmlFor="terms-checkbox" className="ml-2 inline">
                I agree to{' '}
                <a
                    className="underline text-blue-700"
                    href="https://www.upgrade.com/funnel/borrower-documents/TERMS_OF_USE"
                    rel="noreferrer"
                    target="_blank"
                >
                  Terms and Conditions
                </a>
                <img
                    className="ml-2 w-4 h-4 inline"
                    src={openNewTabIcon}
                    alt=""
                />
                <span className="text-rose-700 font-bold ml-2" title="Required Field">*</span>

              </label>
            </Checkbox>
          </div>
          <Button
              className="mr-2"
              cta="Back"
              type="button"
              onClick={() => onBackButtonClick()}
              variant="secondary"
          />
          <Button cta="Next"/>
        </form>
      </>
  );
};

export default Step2;
