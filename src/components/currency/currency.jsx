import React from "react";
import PropTypes from "prop-types";

import "./currency.css";

export const CurrencyItem = ({ txt, rate, cc }) => {
  return (
    <>
      <div className="header-item">
        <div>
          {txt} | {cc}:
        </div>
        <div>{rate}</div>
      </div>
    </>
  );
};

CurrencyItem.propTypes = {
  txt: PropTypes.string,
  rate: PropTypes.number,
  cc: PropTypes.string,
};
