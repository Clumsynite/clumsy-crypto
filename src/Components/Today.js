import React, { useState, useEffect } from "react";
import axios from "axios";

const Today = (props) => {
  const { currency, symbol } = props;
  const [btc, setBtc] = useState("");
  const [eth, setEth] = useState("");
  const [ltc, setLtc] = useState("");

  const crypto = [
    { shortname: "BTC", name: "Bitcoin", value: btc },
    { shortname: "ETH", name: "Ethereum", value: eth },
    { shortname: "LTC", name: "Litecoin ", value: ltc },
  ];

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          `https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=${currency}`
        );
        if (response.status === 200) {
          setBtc(response.data.BTC[currency]);
          setEth(response.data.ETH[currency]);
          setLtc(response.data.LTC[currency]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrice();
  }, [currency]);

  const cell = crypto.map((coin, index) => {
    return (
      <div
        className={`col d-flex flex-column align-items-center p-4 ${
          index !== crypto.length - 1 ? "border-end" : ""
        }`}
        key={index}
        title={coin.name}
      >
        {coin.value === "" && (
          <div
            className="spinner-border"
            role="status"
            style={{ color: "#e3f2fd" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {coin.value !== "" && (
          <div className="fs-4">
            {symbol}
            {coin.value}
          </div>
        )}
        <div className="fs-6 fw-lighter">1 {coin.shortname}</div>
      </div>
    );
  });

  return (
    <div>
      <h6>Current Price</h6>
      <div className="rates row bg-light text-dark shadow-sm mb-4">{cell}</div>
    </div>
  );
};

export default Today;
