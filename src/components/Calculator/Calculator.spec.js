import React from "react";
import { shallow } from "enzyme";
import Calculator from "./Calculator";

describe("Calculator", () => {
  let wrapper;

  //Calculator component below can be written as
  //the component <Calculator /> or just using the word,
  //VSCode will still recognise it.

  beforeEach(() => (wrapper = shallow(Calculator)));

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });
});
