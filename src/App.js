import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SentencesList from "./components/SentencesList";

function App() {
  return (
    <div className="App">
      <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/sentences"]} component={SentencesList} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
