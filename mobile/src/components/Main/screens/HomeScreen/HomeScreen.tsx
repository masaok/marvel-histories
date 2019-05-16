/**
 * HomeScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './HomeScreen.styles';

export interface Props {}

interface State {}

export default class HomeScreen extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}
