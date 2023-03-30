import React from "react";
import PropTypes from "prop-types";

import "./item.css";

export const ConverterItem = ({
  currencies,
  defaultCurrency,
  handleChangeCurrency,
  handleChangeAmount,
  result,
}) => {
  return (
    <>
      <div className="converter-container">
        <input
          className="converter-input"
          type={"number"}
          min={0}
          onChange={handleChangeAmount}
          value={result}
        />
        <select
          value={defaultCurrency}
          onChange={handleChangeCurrency}
          className="converter-select"
        >
          {currencies.map((curr, idx) => {
            return (
              <option id="options" key={idx} value={curr.cc}>
                {curr.txt}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

ConverterItem.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      txt: PropTypes.string,
      rate: PropTypes.number,
      cc: PropTypes.string,
    })
  ),
  defaultCurrency: PropTypes.string,
  handleChangeCurrency: PropTypes.func,
  handleChangeAmount: PropTypes.func,
  result: PropTypes.any,
};
