import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import { INITIAL_STATE } from "./utils/constants";
import Layout from "./views/Layout";
import Step1 from "./views/Step1";
import Step2 from "./views/Step2";
import Confirmation from "./views/Confirmation";
import ConfirmationStatus from "./views/ConfirmationStatus";

createStore(INITIAL_STATE);

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
