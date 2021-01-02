import React from "react";
import Navbar from "./Components/Navbar";
import Today from "./Components/Today";
import History from "./Components/History";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Today />
      <History />
    </div>
  );
};

export default App;
