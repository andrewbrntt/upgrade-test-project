import { useStateMachine } from "little-state-machine";
import React from "react";
import { useNavigate } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockFetch from "../../test/utils/mockFetch";
import Confirmation from "./Confirmation";

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

beforeAll(() => (global.fetch = jest.fn()));

beforeEach(() => {
  global.fetch.mockImplementation(mockFetch);

  jest.spyOn(window, "alert").mockImplementation(() => {});

  useStateMachine.mockImplementation(() => ({
    actions: {
      updateAction: jest.fn(),
    },
    state: INITIAL_STATE,
  }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("renders without crashing", () => {
  render(<Confirmation />);

  expect(screen.getByTestId("confirmation-form")).toBeInTheDocument();
});

it("displays all stored values", async () => {
  setup(<Confirmation />);
  await screen.findByText(INITIAL_STATE.firstname);
  await screen.findByText(INITIAL_STATE.email);
  await screen.findByText(INITIAL_STATE.password);
  await screen.findByText(INITIAL_STATE.color);
  await screen.findByText(
    INITIAL_STATE.terms ? "Agreed" : "Not Agreed"
  );
});

it("handles unchecked terms", async () => {
  useStateMachine.mockImplementation(() => ({
    actions: {
      updateAction: jest.fn(),
    },
    state: {
      ...INITIAL_STATE,
      terms: false,
    },
  }));

  setup(<Confirmation />);

  await screen.findByText("Not Agreed");
});

it("handles back button", async () => {
  const useNavigateMock = jest.fn();
  useNavigate.mockImplementation(() => useNavigateMock);

  const { user } = setup(<Confirmation />);

  await user.click(screen.getByText(/Back/i));
  expect(useNavigateMock).toHaveBeenCalled();
});

it("handles submit button with server error", async () => {
  global.fetch.mockImplementation(() => {
    throw new Error();
  });

  const alertMock = jest.spyOn(window, "alert").mockImplementation();

  const { user } = setup(<Confirmation />);

  await user.click(screen.getByText(/Submit/i));
  expect(alertMock).toHaveBeenCalled();
});

it("handles submit button with invalid input fields", async () => {
  global.fetch.mockImplementation(() => ({
    ok: false,
    status: 400,
  }));

  const useNavigateMock = jest.fn();
  useNavigate.mockImplementation(() => useNavigateMock);

  const { user } = setup(<Confirmation />);

  await user.click(screen.getByText(/Submit/i));
  expect(useNavigateMock).toHaveBeenCalledWith("../error");
});

it("handles submit button with valid input fields", async () => {
  const useNavigateMock = jest.fn();
  useNavigate.mockImplementation(() => useNavigateMock);

  const { user } = setup(<Confirmation />);

  await user.click(screen.getByText(/Submit/i));
  expect(useNavigateMock).toHaveBeenCalledWith("../success");
});
