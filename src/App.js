import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Layout from "./views/Layout";
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
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Step1 />} />
            </Route>
          </Routes>
        </Router>
      </StateMachineProvider>
    );
  }
}

export default App;
