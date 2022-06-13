import { useStateMachine } from "little-state-machine";
import React from "react";
import updateAction from "../utils/updateAction";

const Confirmation = () => {
  const { state } = useStateMachine({ updateAction });

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};

export default Confirmation;
