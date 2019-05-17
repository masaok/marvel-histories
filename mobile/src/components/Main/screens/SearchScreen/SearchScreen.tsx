/**
 * SearchScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './SearchScreen.styles';
import MainScreenHeader from '../../../shared/Headers/MainScreenHeader';

export interface Props {}

interface State {}

export default class SearchScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: props => <MainScreenHeader {...props} />,
  };
  render() {
    return (
      <View>
        <Text>SearchScreen</Text>
      </View>
    );
  }
}
