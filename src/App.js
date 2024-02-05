import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { INITIAL_STATE } from "./utils/constants";
import Layout from "./views/Layout";
import Step1 from "./views/Step1";
import Step2 from "./views/Step2";
import Confirmation from "./views/Confirmation";
import ConfirmationStatus from "./views/ConfirmationStatus";
// import { Helmet } from 'react-helmet'

// Opted to use a small state management library for this multi-step wizard form
// The benefit of this is mainly user experience, to not have to restart the form on accidental refresh or window close
// The other solution would be to track form state locally at the parent level and pass update functions to children components
createStore(INITIAL_STATE);

// Based on the readme, each step has its own route but there is no requirement for guarding specific routes so all are accessible
// If there was guarding needed, I would add logic to point the user to a previous step to complete the form if the previous step form values were empty
// Assumption: all routes are accessible but app logic follows happy path and mainly focuses on users starting from the initial step
class App extends Component {
  render() {
    return (
      <StateMachineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Step1 />} />
              <Route path="/more-info" element={<Step2 />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route
                path="/success"
                element={<ConfirmationStatus status="success" />}
              />
              <Route
                path="/error"
                element={<ConfirmationStatus status="error" />}
              />
            </Route>
          </Routes>
        </Router>
      </StateMachineProvider>
    );
  }
}

export default App;
