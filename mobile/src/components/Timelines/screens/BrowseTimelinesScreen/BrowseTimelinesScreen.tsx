/**
 * BrowseTimelinesScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './BrowseTimelinesScreen.styles';
import MainScreenHeader from '../../../shared/Headers/MainScreenHeader';

export interface Props {}

interface State {}

export default class BrowseTimelinesScreen extends React.Component<
  Props,
  State
> {
  static navigationOptions = {
    header: props => <MainScreenHeader {...props} />,
  };
  render() {
    return (
      <View>
        <Text>BrowseTimelinesScreen</Text>
      </View>
    );
  }
}
