import React from "react";
import propTypes from "prop-types";

const KeyPad = ({
  callOperator,
  numbers,
  operators,
  setOperator,
  updateDisplay,
}) => <div className="keypad-container" />;

KeyPad.propTypes = {
  callOperator: propTypes.func.isRequired,
  numbers: propTypes.array.isRequired,
  operators: propTypes.array.isRequired,
  setOperator: propTypes.func.isRequired,
  updateDisplay: propTypes.func.isRequired,
};

export default KeyPad;
