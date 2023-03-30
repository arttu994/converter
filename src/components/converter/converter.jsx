import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import ConverterItem from "./item";
import { urls } from "../../utils";

import "./converter.css";

export const Converter = () => {
  const [currency, setCurrency] = useState([
    { txt: "Українська гривня", rate: 1, cc: "UAH" },
  ]);

  const [firstCurrency, setFirstCurrency] = useState();
  const [firstAmount, setFirstAmount] = useState(0);
  const [firstResult, setFirstResult] = useState(0);

  const [secondCurrency, setSecondCurrency] = useState();
  const [secondAmount, setSecondAmount] = useState(0);
  const [secondResult, setSecondResult] = useState(0);

  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    axios.get(urls.NBU_URL).then((data) => {
      data.data.flatMap((currency, _, arr) => {
        if (!firstCurrency) {
          setFirstCurrency(arr[0].cc);
        }
        if (!secondCurrency) {
          setSecondCurrency(arr[1].cc);
        }
        setCurrency((prevState) => [
          ...prevState,
          {
            txt: currency.txt,
            rate: currency.rate,
            cc: currency.cc,
          },
        ]);
      });
    });

    return () => abortControllerRef.current.abort();
  }, []);

  const handleChangeFirstAmount = (e) => {
    const firstAmount = e.target.value;
    setFirstAmount(firstAmount);
    const firstRate = currency.filter((v) => v.cc === firstCurrency)[0].rate;
    setFirstResult(firstAmount);

    const secondRate = currency.filter((v) => v.cc === secondCurrency)[0].rate;
    const secondRatio = firstRate / secondRate;
    const secondResult = (secondRatio * firstAmount).toFixed(4);
    setSecondAmount(secondResult);
    setSecondResult(secondResult);
  };

  const handleChangeSecondAmount = (e) => {
    const secondAmount = e.target.value;
    setSecondAmount(secondAmount);
    const secondRate = currency.filter((v) => v.cc === secondCurrency)[0].rate;
    setSecondResult(secondAmount);

    const firstRate = currency.filter((v) => v.cc === firstCurrency)[0].rate;
    const firstRatio = secondRate / firstRate;
    const firstResult = (firstRatio * secondAmount).toFixed(4);
    setFirstAmount(firstResult);
    setFirstResult(firstResult);
  };

  const handleChangeFirstCurrency = (e) => {
    const firstCurrency = e.target.value;
    setFirstCurrency(firstCurrency);

    const firstRate = currency.filter((v) => v.cc === firstCurrency)[0].rate;
    const secondRate = currency.filter((v) => v.cc === secondCurrency)[0].rate;

    const ratio = firstRate / secondRate;
    const secondResult = (ratio * firstAmount).toFixed(4);

    setSecondResult(secondResult);
    setSecondAmount(secondResult);
  };

  const handleChangeSecondCurrency = (e) => {
    const secondCurrency = e.target.value;
    setSecondCurrency(secondCurrency);

    const firstRate = currency.filter((v) => v.cc === firstCurrency)[0].rate;
    const secondRate = currency.filter((v) => v.cc === secondCurrency)[0].rate;

    const ratio = secondRate / firstRate;
    const firstResult = (ratio * secondAmount).toFixed(4);

    setFirstResult(firstResult);
    setFirstAmount(firstResult);
  };

  return (
    <>
      <main>
        <div className="converter-container">
          <div className="converter-form">
            <div className="title">
              <h2>Converter</h2>
            </div>
            <ConverterItem
              currencies={currency}
              defaultCurrency={firstCurrency}
              handleChangeCurrency={handleChangeFirstCurrency}
              handleChangeAmount={handleChangeFirstAmount}
              result={firstResult}
            />
            <ConverterItem
              currencies={currency}
              defaultCurrency={secondCurrency}
              handleChangeCurrency={handleChangeSecondCurrency}
              handleChangeAmount={handleChangeSecondAmount}
              result={secondResult}
            />
          </div>
        </div>
      </main>
    </>
  );
};
