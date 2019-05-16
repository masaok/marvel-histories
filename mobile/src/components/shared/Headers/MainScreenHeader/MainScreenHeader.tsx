/**
 * MainScreenHeader
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './MainScreenHeader.styles';
import { Header, Icon } from 'react-native-elements';
import Heading from '../../Content/Heading';

export interface Props {}

interface State {}

export default class MainScreenHeader extends React.Component<Props, State> {
  render() {
    return (
      <Header
        backgroundColor='orange'
        // containerStyle={this.props.hideBottomBar && { borderBottomWidth: 0 }}
        placement='right'
        leftComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name='play-circle'
              type='font-awesome'
              color='white'
              containerStyle={{ marginRight: 4 }}
            />
            <Heading type={'h7'} color={'white'} bold>
              Marvel Histories
            </Heading>
          </View>
        }
      />
    );
  }
}
