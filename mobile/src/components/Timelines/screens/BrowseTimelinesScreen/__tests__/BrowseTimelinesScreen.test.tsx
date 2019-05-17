import * as React from "react";
import renderer from "react-test-renderer";

import BrowseTimelinesScreen from "../BrowseTimelinesScreen";

it("renders correctly", () => {
  const tree = renderer.create(<BrowseTimelinesScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
