import React from "react";
import { mount, shallow } from "enzyme";
import Calculator from "./Calculator";
import Display from "../Display/Display";
import KeyPad from "../Keypad/Keypad";

describe("updateDisplay", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("updates displayValue", () => {
    wrapper.instance().updateDisplay("5");
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it("concatenates displayValue", () => {
    wrapper.instance().updateDisplay("5");
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayValue")).toEqual("50");
  });

  it('removes leading "0" from displayValue', () => {
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayValue")).toEqual("0");
    wrapper.instance().updateDisplay("5");
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it('prevents multiple leading "0"s from displayValue', () => {
    wrapper.instance().updateDisplay("0");
    wrapper.instance().updateDisplay("0");
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it("removes last char of displayValue", () => {
    wrapper.instance().updateDisplay("5");
    wrapper.instance().updateDisplay("0");
    wrapper.instance().updateDisplay("ce");
    expect(wrapper.state("displayValue")).toEqual("5");
  });

  it('prevents multiple instances of "." in displayValue', () => {
    wrapper.instance().updateDisplay(".");
    wrapper.instance().updateDisplay(".");
    expect(wrapper.state("displayValue")).toEqual(".");
  });

  it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
    wrapper.instance().updateDisplay("ce");
    expect(wrapper.state("displayValue")).toEqual("0");
  });
});

describe("mounted Calculator", () => {
  let wrapper;

  //shallow refers to only the component being tested
  //mount refers to the component and all its child components

  beforeEach(() => (wrapper = mount(<Calculator />)));

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render 23 <div />s", () => {
    expect(wrapper.find("div").length).toEqual(23);
  });

  it("calls updateDisplay when a number key is clicked", () => {
    //spyOn is a feature that allows dynamically intercepting the calls to a function and changes its result
    const spy = jest.spyOn(wrapper.instance(), "updateDisplay");

    //forceUpdate triggers the normal lifecycle methods for child components
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);

    //click is simulated
    wrapper.find(".number-key").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls setOperator when an operator key is clicked", () => {
    //spyOn is a feature that allows dynamically intercepting the calls to a function and changes its result
    const spy = jest.spyOn(wrapper.instance(), "setOperator");

    //forceUpdate triggers the normal lifecycle methods for child components
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);

    //click is simulated
    wrapper.find(".operator-key").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("calls callOperator when a submit key is clicked", () => {
    //spyOn is a feature that allows dynamically intercepting the calls to a function and changes its result
    const spy = jest.spyOn(wrapper.instance(), "callOperator");

    //forceUpdate triggers the normal lifecycle methods for child components
    wrapper.instance().forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);

    //click is simulated
    wrapper.find(".submit-key").first().simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should render the Display and Keypad components", () => {
    expect(
      wrapper.containsAllMatchingElements([
        <Display displayValue={wrapper.instance().state.displayValue} />,
        <KeyPad
          callOperator={wrapper.instance().callOperator}
          numbers={wrapper.instance().state.numbers}
          operators={wrapper.instance().state.operators}
          setOperator={wrapper.instance().setOperator}
          updateDisplay={wrapper.instance().updateDisplay}
        />,
      ])
    ).toEqual(true);
  });
});

describe("setOperator", () => {
  let wrapper;

  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it("updates the value of selectedOperator", () => {
    wrapper.instance().setOperator("+");
    expect(wrapper.state("selectedOperator")).toEqual("+");
    wrapper.instance().setOperator("/");
    expect(wrapper.state("selectedOperator")).toEqual("/");
  });

  it("updates the value of storedValue to the value of displayValue", () => {
    wrapper.setState({ displayValue: "5" });
    wrapper.instance().setOperator("+");
    expect(wrapper.state("storedValue")).toEqual("5");
  });

  it('updates the value of displayValue to "0"', () => {
    wrapper.setState({ displayValue: "5" });
    wrapper.instance().setOperator("+");
    expect(wrapper.state("displayValue")).toEqual("0");
  });

  it("selectedOperator is not an empty string, does not update storedValue", () => {
    wrapper.setState({ displayValue: "5" });
    wrapper.instance().setOperator("+");
    expect(wrapper.state("storedValue")).toEqual("5");
    wrapper.instance().setOperator("-");
    expect(wrapper.state("storedValue")).toEqual("5");
  });
});
