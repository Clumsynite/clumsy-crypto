import React, { useState } from "react";
import Today from "./Components/Today";
import History from "./Components/History";

const App = () => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  return (
    <div className="App pb-5">
      <nav
        className="navbar navbar-light shadow-sm mb-3"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Clumsy Crypto
          </a>
        </div>
      </nav>
      <div className="container px-4">
        <Today currency={currency} symbol={symbol} />
        <History currency={currency} symbol={symbol} />
      </div>
    </div>
  );
};

export default App;
