import * as React from "react";
import renderer from "react-test-renderer";

import ViewComicScreen from "../ViewComicScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewComicScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
