import React from "react";
import { mount } from "enzyme";
import Calculator from "./Calculator";
import Display from "../Display/Display";
import KeyPad from "../Keypad/Keypad";

describe("mounted Calculator", () => {
  let wrapper;

  //shallow refers to only the component being tested
  //mount refers to the component and all its child components

  beforeEach(() => (wrapper = mount(<Calculator />)));

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
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

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });
});
