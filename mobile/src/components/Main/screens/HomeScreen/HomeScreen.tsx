/**
 * HomeScreen
 */

import * as React from 'react';
import { Button, Image, FlatList, StyleSheet, Text, View } from 'react-native';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import styles from './HomeScreen.styles';
import MainScreenHeader from '../../../shared/Headers/MainScreenHeader';
import SubScreenHeader from '../../../shared/Headers/SubScreenHeader';

export interface Props {}

interface State {}

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: props => <SubScreenHeader title={'Home'} {...props} />,
  };
  _keyExtractor = item => item.id;
  render() {
    return (
      <Query
        query={gql`
          {
            characters(offset: 50) {
              id
              name
              description
              thumbnail
            }
          }
        `}
      >
        {({ loading, data, error }) => {
          if (loading || error) {
            return (
              <View style={styles.container}>
                <Text>Loading...</Text>
              </View>
            );
          }
          return (
            <FlatList
              data={data.characters}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.thumbnail }}
                    />
                    <Text>{item.name}</Text>
                  </View>
                );
              }}
            />
          );
        }}
      </Query>
    );
  }
}
