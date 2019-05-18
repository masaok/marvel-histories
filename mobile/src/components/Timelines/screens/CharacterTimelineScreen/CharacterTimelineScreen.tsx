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
            comics(where: { characters: [1009313] }, orderBy: focDate_asc, limit: 10 ) {
              id
              title
              thumbnail
              dates { type, date }
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

                // Parse and convert the date info for display
                const onsaleDate = item.dates[0].date
                const substring = onsaleDate.substring(0, 19)
                const obj = new Date(substring)
                const displayDay = obj.getDate() + 1
                const displayMonth = obj.getMonth() + 1
                const displayFullYear = obj.getFullYear() + 1

                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>{displayMonth}/{displayDay}/{displayFullYear}</Text>
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
