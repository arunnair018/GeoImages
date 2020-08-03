import React, { Component } from "react";
import "./App.css";
import Gmap from "./components/gmaps";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Gmap />
      </div>
    );
  }
}

export default App;
