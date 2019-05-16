/**
 * ViewCharacterScreen
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './ViewCharacterScreen.styles';

export interface Props {}

interface State {}

export default class ViewCharacterScreen extends React.Component<Props, State> {
  render() {
    return (
      <View>
        <Text>ViewCharacterScreen</Text>
      </View>
    );
  }
}
