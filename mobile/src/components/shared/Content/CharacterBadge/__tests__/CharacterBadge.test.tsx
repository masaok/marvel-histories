import * as React from "react";
import renderer from "react-test-renderer";

import CharacterBadge from "../CharacterBadge";

it("renders correctly", () => {
  const tree = renderer.create(<CharacterBadge character={new Object()} />).toJSON();
  expect(tree).toMatchSnapshot();
});
