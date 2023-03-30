import React from "react";

import Header from "./components/header";
import Converter from "./components/converter";

import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Converter />
      </div>
    </>
  );
}

export default App;
