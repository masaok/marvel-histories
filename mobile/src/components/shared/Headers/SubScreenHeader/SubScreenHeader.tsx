/**
 * SubScreenHeader
 */

import * as React from 'react';
import { View } from 'react-native';

import styles from './SubScreenHeader.styles';
import { Icon } from 'react-native-elements';
import Heading from '../../Content/Heading';
import NavigationService from '../../../../services/NavigationService';
import BaseHeader from '../BaseHeader';
import { HeaderProps } from 'react-navigation';

export interface Props extends HeaderProps {
  title: string;
}

interface State {}

export default class SubScreenHeader extends React.Component<Props, State> {
  render() {
    return (
      <BaseHeader
        backgroundColor='white'
        containerStyle={{ borderBottomWidth: 1.5 }}
        leftComponent={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name={false ? 'close' : 'arrow-left'}
              type='material-community'
              color='orange'
              underlayColor='rgba(255,255,255,0)'
              onPress={() => NavigationService.goBack()}
              containerStyle={{ marginRight: 4 }}
            />
            <Heading type={'h7'}>{this.props.title}</Heading>
          </View>
        }
      />
    );
  }
}
