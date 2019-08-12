import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { mount, shallow, render, unmount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "./login";

Enzyme.configure({ adapter: new Adapter() });

const meta = {
  error: false
};

describe("Login Component", () => {
  let wrapper;
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Login meta={meta} onSubmit={() => {}} onValueChanges={() => {}} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  describe("input field check", () => {
    let wrapper;
    const onFieldChange = jest.fn();

    beforeAll(() => {
      wrapper = mount(
        <Login meta={meta} onSubmit={() => {}} onValueChanges={onFieldChange} />
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });

    it("username check", () => {
      wrapper.find("input#user-input").simulate("change", {
        target: { name: "username", value: "freja" }
      });
      expect(wrapper.state("username")).toEqual("freja");
    });

    it("password check", () => {
      wrapper.find("input#password-input").simulate("change", {
        target: { name: "password", value: "password" }
      });
      expect(wrapper.state("password")).toEqual("password");
    });

    it("onValueChanges should be triggered on username change", () => {
      wrapper.find("input#user-input").simulate("change");
      expect(onFieldChange).toHaveBeenCalled();
    });

    it("onValueChanges should be triggered on username change", () => {
      wrapper.find("input#password-input").simulate("change");
      expect(onFieldChange).toHaveBeenCalled();
    });
  });

  describe("form submission check", () => {
    let wrapper;
    const onFieldChange = jest.fn();
    const onLogin = jest.fn();

    beforeAll(() => {
      wrapper = mount(
        <Login meta={meta} onSubmit={onLogin} onValueChanges={onFieldChange} />
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });

    it("onSubmit should be triggerd on form submission", () => {
      wrapper.find("form").simulate("submit");
      expect(onLogin).toHaveBeenCalled();
    });
  });
});
