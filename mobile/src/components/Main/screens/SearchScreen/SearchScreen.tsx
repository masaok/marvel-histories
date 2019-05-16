/**
 * SearchScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './SearchScreen.styles';

export interface Props {}

interface State {}

export default class SearchScreen extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>SearchScreen</Text>
      </View>
    );
  }
}
