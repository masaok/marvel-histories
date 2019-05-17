import * as React from "react";
import renderer from "react-test-renderer";

import BaseHeader from "../BaseHeader";

it("renders correctly", () => {
  const tree = renderer.create(<BaseHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
