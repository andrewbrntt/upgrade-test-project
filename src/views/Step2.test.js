import { useStateMachine } from "little-state-machine";
import React from "react";
import { useNavigate } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockFetch from "../../test/utils/mockFetch";
import Step2 from "./Step2";

const INITIAL_STATE = {
  name: "john",
  email: "john@gmail.com",
  password: "test1234",
  color: "",
  terms: false,
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

afterAll(() => global.fetch.mockClear());

it("renders without crashing", async () => {
  render(<Step2 />);

  expect(await screen.findByRole("status")).not.toBeInTheDocument();
  expect(screen.getByTestId("more-info-form")).toBeInTheDocument();
});

it("handles invalid colors select field", async () => {
  const { user } = setup(<Step2 />);

  await user.click(screen.getByText(/Next/i));
  await screen.getByTestId("color-select");
});

it("handles invalid terms checkbox field", async () => {
  const { user } = setup(<Step2 />);

  await user.click(screen.getByText(/Next/i));
  await screen.findByText(/Terms Acceptance Required/i);
});

it("handles stored color value", async () => {
  useStateMachine.mockImplementation(() => ({
    actions: {
      updateAction: jest.fn(),
    },
    state: {
      ...INITIAL_STATE,
      color: "white",
    },
  }));

  setup(<Step2 />);

  expect(await screen.findByRole("status")).not.toBeInTheDocument();
  await screen.findByText(/white/i);
});

it("handles failed getColors endpoint", async () => {
  global.fetch.mockImplementation(() => {
    throw new Error();
  });

  const alertMock = jest.spyOn(window, "alert").mockImplementation();

  setup(<Step2 />);

  expect(alertMock).toHaveBeenCalled();
});

it("handles unfulfilled getColors promise", async () => {
  global.fetch.mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 5000))
  );

  const alertMock = jest.spyOn(window, "alert").mockImplementation();

  const { unmount } = setup(<Step2 />);
  unmount();

  expect(alertMock).not.toHaveBeenCalled();
});

it("handles back button", async () => {
  const useNavigateMock = jest.fn();
  useNavigate.mockImplementation(() => useNavigateMock);

  const { user } = setup(<Step2 />);

  await user.click(screen.getByText(/Back/i));
  expect(useNavigateMock).toHaveBeenCalled();
});

it("handles next button", async () => {
  const useNavigateMock = jest.fn();
  useNavigate.mockImplementation(() => useNavigateMock);

  const { user } = setup(<Step2 />);

  expect(await screen.findByRole("status")).not.toBeInTheDocument();

  await user.selectOptions(screen.getByTestId("color-select"), "red");
  await user.click(screen.getByTestId("terms-checkbox"));

  await user.click(screen.getByText(/Next/i));
  expect(useNavigateMock).toHaveBeenCalled();
});
