import * as React from "react";
import renderer from "react-test-renderer";

import ViewSeriesScreen from "../ViewSeriesScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewSeriesScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
