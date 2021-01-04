import React, { useState } from "react";
import Today from "./Components/Today";
import History from "./Components/History";

const App = () => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState(36);
  const symbols = { USD: 36, INR: 8377 };
  return (
    <div className="App pb-5">
      <nav
        className="navbar navbar-light shadow-sm mb-3 navbar-expand-sm sticky-top"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand" style={{ cursor: "pointer" }}>
            Clumsy Crypto
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <div className="me-2">Currency:</div>
                <select
                  className="form-select"
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setSymbol(symbols[e.target.value]);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <option value="USD" title="United States Dollars">
                    USD
                  </option>
                  <option value="INR" title="Indian Rupees">
                    INR
                  </option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container px-4">
        <div id="Description" className="fs-3 fw-lighter text-center p-4">
          Clumsy Crypto is a Progressive Web App which displays realtime price
          information about BTC, ETH and LTC.
        </div>
        <Today currency={currency} symbol={symbol} />
        <History currency={currency} symbol={symbol} />
      </div>
    </div>
  );
};

export default App;
