import * as React from "react";
import renderer from "react-test-renderer";

import MyTimelinesScreen from "../MyTimelinesScreen";

it("renders correctly", () => {
  const tree = renderer.create(<MyTimelinesScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
