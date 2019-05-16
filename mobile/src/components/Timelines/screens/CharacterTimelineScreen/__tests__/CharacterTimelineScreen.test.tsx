import * as React from "react";
import renderer from "react-test-renderer";

import CharacterTimelineScreen from "../CharacterTimelineScreen";

it("renders correctly", () => {
  const tree = renderer.create(<CharacterTimelineScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
