import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const History = (props) => {
  const { currency, symbol } = props;
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const getCryptoRates = async (coin, date) => {
      try {
        return await axios.get(
          `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coin}&tsyms=${currency}&ts=${date}`
        );
      } catch (error) {
        console.error(error);
      }
    };

    const get5dayRates = async () => {
      let array = [];
      for (let day = 1; day < 6; day++) {
        const date = moment().subtract(day, "days").unix();
        const btcRate = await getCryptoRates("BTC", date);
        const ethRate = await getCryptoRates("ETH", date);
        const ltcRate = await getCryptoRates("LTC", date);
        let object = {
          BTC: btcRate.data.BTC[currency],
          ETH: ethRate.data.ETH[currency],
          LTC: ltcRate.data.LTC[currency],
          date: date,
        };
        array[day - 1] = object;
      }
      setRates(array);
    };
    get5dayRates();
    return () => {
      setRates([]);
    };
    // eslint-disable-next-line
  }, [currency]);

  const Cells = (props) => {
    const { coins } = props;
    const coinRates = [
      { shortname: "BTC", name: "Bitcoin", value: coins.BTC },
      { shortname: "ETH", name: "Ethereum", value: coins.ETH },
      { shortname: "LTC", name: "Litecoin", value: coins.LTC },
    ];
    const cells = coinRates.map((coin, index) => {
      return (
        <div
          className={`col d-flex justify-content-center ${
            index !== coinRates.length - 1 ? "border-end" : ""
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
            <div className="text-center">
              1 {coin.shortname} = {String.fromCharCode(symbol)}
              {coin.value}
            </div>
          )}
        </div>
      );
    });
    return <div className="row fs-6">{cells}</div>;
  };

  const rows = rates.map((rate, index) => {
    return (
      <div
        className={`d-flex flex-column bg-light text-dark p-3 ${
          index !== rates.length ? "border-bottom" : ""
        }`}
        key={index}
      >
        <div className="text-info p-3">
          {moment.unix(rate.date).format("MMMM Do YYYY")}
        </div>
        <>
          <Cells coins={rate} />
        </>
      </div>
    );
  });

  return (
    <div>
      <div className="fs-5 font-lighter">History (Past 5 days)</div>
      {rates.length <= 0 && (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {rates.length > 0 && (
        <div className="d-flex flex-column border shadow">{rows}</div>
      )}
    </div>
  );
};

export default History;
