import * as React from "react";
import renderer from "react-test-renderer";

import SaveToMyTimelinesScreen from "../SaveToMyTimelinesScreen";

import { NavigationScreenProp } from 'react-navigation';

it("renders correctly", () => {
  const tree = renderer.create(<SaveToMyTimelinesScreen navigation={} />).toJSON();
  expect(tree).toMatchSnapshot();
});
