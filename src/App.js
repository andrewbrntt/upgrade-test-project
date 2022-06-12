import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Step1 from "./views/Step1";

createStore({
  data: {
    firstName: "",
    email: "",
    password: "",
  },
});

class App extends Component {
  render() {
    return (
      <StateMachineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Step1 />} />
          </Routes>
        </Router>
      </StateMachineProvider>
    );
  }
}

export default App;
