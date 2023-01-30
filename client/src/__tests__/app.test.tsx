import { cleanup } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import ThemeIcon from "../assets/themeIcon";
import IconButton from "../components/IconButton";
import LineGraph from "../components/LineGraph";

afterEach(cleanup);

describe("Render ThemeIcon", () => {
  it("Light icon match", () => {
    const tree = renderer.create(<ThemeIcon theme="light" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Dark icon match", () => {
    const tree = renderer.create(<ThemeIcon theme="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
