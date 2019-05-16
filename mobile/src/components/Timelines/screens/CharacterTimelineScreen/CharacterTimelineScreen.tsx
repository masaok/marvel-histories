/**
 * CharacterTimelineScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Image } from 'react-native';

import styles from './CharacterTimelineScreen.styles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export interface Props {}

interface State {}

export default class CharacterTimelineScreen extends React.Component<
  Props,
  State
> {
  _keyExtractor = item => item.id;
  render() {
    return (
      <Query
        query={gql`
          {
            comics(where: { characters: [1011334] }) {
              id
              title
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
              data={data.comics}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.thumbnail }}
                    />
                    <Text>{item.title}</Text>
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
