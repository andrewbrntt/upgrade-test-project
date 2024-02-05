import { useStateMachine } from "little-state-machine";
import { oneOf } from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import errorPng from "../images/error.png";
import successPng from "../images/success.png";
import { INITIAL_STATE } from "../utils/constants";
import updateAction from "../utils/updateAction";
import FocusableHeader from "../components/FocusableHeader";
import {Helmet} from "react-helmet";

const SUCCESS_MESSAGE = "You should receive a confirmation email soon.";
const ERROR_MESSAGE = "Uh oh, something went wrong. Please try again later.";

// Assumption: Confirmation status can only be either success or error
const ConfirmationStatus = ({ status }) => {
  const navigate = useNavigate();
  const { actions } = useStateMachine({ updateAction });
  const isSuccessfulConfirmation = status === "success";

  const onRestartClick = () => {
    actions.updateAction(INITIAL_STATE);

    navigate("../");
  };

  return (
      <>
      <Helmet>
          <title>{`Sign Up Submit ${isSuccessfulConfirmation ? "Success" : "Error"} | Upgrade Challenge`}</title>
      </Helmet>
    <div data-testid="confirmation-status-view">
      <FocusableHeader className="text-2xl text-center mb-6">
        {isSuccessfulConfirmation ? "Success!" : "Error"}
      </FocusableHeader>
        <div className="flex flex-col mb-6 min-h-[200px] text-center items-center">
            <p>
                <img
                    className="mb-6 self-start w-11 h-11 inline"
                    src={isSuccessfulConfirmation ? successPng : errorPng}
                    alt=""
                />
                {isSuccessfulConfirmation ? SUCCESS_MESSAGE : ERROR_MESSAGE}
            </p>
        </div>
        <Button cta="Restart" onClick={() => onRestartClick()} />
    </div>
      </>
  );
};

ConfirmationStatus.propTypes = {
  status: oneOf(["error", "success"]),
};

export default ConfirmationStatus;
