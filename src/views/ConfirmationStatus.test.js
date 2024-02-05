import { useStateMachine } from "little-state-machine";
import React from "react";
import { useNavigate } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmationStatus from "./ConfirmationStatus";

const INITIAL_STATE = {
  firstname: "john",
  email: "john@gmail.com",
  password: "test1234",
  color: "red",
  terms: true,
};

jest.mock("little-state-machine", () => ({
  ...jest.requireActual("little-state-machine"),
  useStateMachine: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

const updateActionMock = jest.fn();

beforeEach(() => {
  useStateMachine.mockImplementation(() => ({
    actions: {
      updateAction: updateActionMock,
    },
    state: INITIAL_STATE,
  }));
});

it("renders without crashing", () => {
  render(<ConfirmationStatus />);

  expect(screen.getByTestId("confirmation-status-view")).toBeInTheDocument();
});

it("displays success message for successful confirmation status", async () => {
  setup(<ConfirmationStatus status="success" />);

  await screen.findByText("Success!");
  await screen.findByText("You should receive a confirmation email soon.");
});

it("displays error message for unsuccessful confirmation status", async () => {
  setup(<ConfirmationStatus status="error" />);

  await screen.findByText("Error");
  await screen.findByText(
    "Uh oh, something went wrong. Please try again later."
  );
});

it("handles restart button", async () => {
  const useNavigateMock = jest.fn();
  useNavigate.mockImplementation(() => useNavigateMock);

  const { user } = setup(<ConfirmationStatus />);

  await user.click(screen.getByText(/Restart/i));
  expect(updateActionMock).toHaveBeenCalled();
  expect(useNavigateMock).toHaveBeenCalledWith("../");
});
