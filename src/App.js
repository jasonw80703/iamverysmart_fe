import React from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SentencesList from "./components/SentencesList";

function App() {
  return (
    <div className="App">
      <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={SentencesList} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
