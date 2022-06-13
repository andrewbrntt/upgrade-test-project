import { useStateMachine } from "little-state-machine";
import { oneOf } from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import errorSvg from "../images/error.png";
import successSvg from "../images/success.png";
import { INITIAL_STATE } from "../utils/constants";
import updateAction from "../utils/updateAction";

const SUCCESS_MESSAGE = "You should receive a confirmation email soon.";
const ERROR_MESSAGE = "Uh oh, something went wrong. Please try again later.";

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
      <h1 className="text-2xl text-center mb-6">
        {isSuccessfulConfirmation ? "Success!" : "Error"}
      </h1>
      <div className="flex flex-col mb-6 min-h-[200px] text-center items-center">
        <img
          className="mb-6 self-start w-11 h-11"
          src={isSuccessfulConfirmation ? successSvg : errorSvg}
          alt={isSuccessfulConfirmation ? "success logo" : "error logo"}
        />
        <span>
          {isSuccessfulConfirmation ? SUCCESS_MESSAGE : ERROR_MESSAGE}
        </span>
      </div>
      <Button cta="Restart" onClick={() => onRestartClick()} />
    </>
  );
};

ConfirmationStatus.propTypes = {
  status: oneOf(["error", "success"]),
};

export default ConfirmationStatus;
