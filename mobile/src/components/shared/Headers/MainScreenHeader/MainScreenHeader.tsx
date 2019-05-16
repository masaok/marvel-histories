/**
 * MainScreenHeader
 */

import * as React from 'react';
import { View } from 'react-native';

import styles from './MainScreenHeader.styles';
import Heading from '../../Content/Heading';
import BaseHeader from '../BaseHeader';
import { Icon } from 'react-native-elements';
import { HeaderProps } from 'react-navigation';

export interface Props extends HeaderProps {}

interface State {}

export default class MainScreenHeader extends React.Component<Props, State> {
  render() {
    return (
      <BaseHeader
        backgroundColor='orange'
        // containerStyle={this.props.hideBottomBar && { borderBottomWidth: 0 }}
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
