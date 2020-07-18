import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import "./App.css";
import Model from "./Components/Model";
//import PathfindingVisualizer from "./Components/PathfindingVisualizer";
import Page2 from "./Components/Page2";
function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/">
            <Model />
          </Route>
          <Route path="/algo">
            <Page2></Page2>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
