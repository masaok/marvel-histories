import * as React from "react";
import renderer from "react-test-renderer";

import ViewCharacterScreen from "../ViewCharacterScreen";

it("renders correctly", () => {
  const tree = renderer.create(<ViewCharacterScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
