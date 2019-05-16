/**
 * SubScreenHeader
 */

import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './SubScreenHeader.styles';
import { Header, Icon } from 'react-native-elements';
import Heading from '../../Content/Heading';
import NavigationService from '../../../../services/NavigationService';

export interface Props {}

interface State {}

export default class SubScreenHeader extends React.Component<Props, State> {
  render() {
    return (
      <Header
        backgroundColor='white'
        placement='right'
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
            <Heading type={'h7'}>PAGE NAME GOES HERE</Heading>
          </View>
        }
      />
    );
  }
}
