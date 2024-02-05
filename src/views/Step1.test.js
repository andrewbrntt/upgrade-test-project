import React from "react";
import { useNavigate } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Step1 from "./Step1";

const INITIAL_STATE = {
  firstname: "",
  email: "",
  password: "",
  color: "",
  terms: false,
};

jest.mock("little-state-machine", () => ({
  ...jest.requireActual("little-state-machine"),
  useStateMachine: () => ({
    actions: {
      updateAction: jest.fn(),
    },
    state: INITIAL_STATE,
  }),
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

it("renders without crashing", () => {
  render(<Step1 />);

  expect(screen.getByTestId("signup-form")).toBeInTheDocument();
});

it("handles invalid name input field", async () => {
  const { user } = setup(<Step1 />);

  await user.click(screen.getByText(/Next/i));
  await screen.findByText(/Name Required/i);
});

it("handles invalid email input field", async () => {
  const { user } = setup(<Step1 />);

  await user.click(screen.getByText(/Next/i));
  await screen.findByText(/E-Mail Required/i);

  await user.type(screen.getByTestId("email-input"), "john");
  await screen.findByText(/Please enter a valid e-mail/i);
});

it("handles invalid password input field", async () => {
  const { user } = setup(<Step1 />);

  await user.click(screen.getByText(/Next/i));
  await screen.findByText(/Password Required/i);

  await user.type(screen.getByTestId("password-input"), "test");
  await screen.findByText(/Please use at least 8 characters/i);
});

it("handles next button with valid input fields", async () => {
  const useNavigateMock = jest.fn();
  useNavigate.mockImplementation(() => useNavigateMock);

  const { user } = setup(<Step1 />);

  await user.type(screen.getByTestId("fname-input"), "john");
  await user.type(screen.getByTestId("email-input"), "john@gmail.com");
  await user.type(screen.getByTestId("password-input"), "test1234");
  await user.click(screen.getByText(/Next/i));
  expect(useNavigateMock).toHaveBeenCalled();
});
