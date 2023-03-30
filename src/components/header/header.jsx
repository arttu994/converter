import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { urls } from "../../utils";
import { CurrencyItem } from "../currency/currency";

import "./header.css";

export const Header = () => {
  const [currency, setCurrency] = useState([]);
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    axios
      .get(urls.NBU_URL)
      .then((currencies) =>
        currencies.data.filter(
          (currency) => (currency.cc === "USD") | (currency.cc === "EUR")
        )
      )
      .then((filteredCurrencies) =>
        filteredCurrencies.flatMap((currency) => {
          setCurrency((prevState) => [
            ...prevState,
            {
              txt: currency.txt,
              rate: currency.rate,
              cc: currency.cc,
            },
          ]);
        })
      );

    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  return (
    <>
      <header>
        <div className="header-container">
          {currency &&
            currency.map((curr, idx) => (
              <CurrencyItem
                key={idx}
                txt={curr.txt}
                cc={curr.cc}
                rate={curr.rate}
              />
            ))}
        </div>
      </header>
    </>
  );
};
