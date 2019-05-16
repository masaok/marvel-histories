/**
 * ViewComicScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './ViewComicScreen.styles';

export interface Props {}

interface State {}

export default class ViewComicScreen extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>ViewComicScreen</Text>
      </View>
    );
  }
}
