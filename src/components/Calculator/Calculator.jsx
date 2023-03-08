import React, { Component } from "react";
import Display from "../Display/Display";
import "./Calculator.css";
import KeyPad from "../Keypad/Keypad";

class Calculator extends Component {
  state = {
    //value to be displayed in <Display />
    displayValue: "0",

    //values to be displayed in number <Keys />
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "CE"],

    //values to be displayed in operator <Keys />
    operators: ["+", "-", "*", "/"],

    //operator selected for math operation
    selectedOperator: "",

    //stored value to use for math operation
    storedValue: "",
  };

  callOperator = () => {
    console.log("call operation");
  };

  setOperator = () => {
    console.log("set operation");
  };

  updateDisplay = () => {
    console.log("update display");
  };

  render = () => {
    const { displayValue, numbers, operators } = this.state;

    return (
      <div className="calculator-container">
        <Display displayValue={displayValue} />
        <KeyPad
          callOperator={this.callOperator}
          numbers={numbers}
          operators={operators}
          setOperator={this.setOperator}
          updateDisplay={this.updateDisplay}
        />
      </div>
    );
  };
}

export default Calculator;
