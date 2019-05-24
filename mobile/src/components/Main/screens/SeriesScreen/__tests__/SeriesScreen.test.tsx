import * as React from "react";
import renderer from "react-test-renderer";

import SeriesScreen from "../SeriesScreen";

it("renders correctly", () => {
  const tree = renderer.create(<SeriesScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
