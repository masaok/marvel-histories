/**
 * BrowseTimelinesScreen
 */

import * as React from 'react';
import { Text, View, Button, FlatList, Image } from 'react-native';

import styles from './BrowseTimelinesScreen.styles';
import MainScreenHeader from '../../../shared/Headers/MainScreenHeader';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export interface Props { }

interface State { }

export default class BrowseTimelinesScreen extends React.Component<
  Props,
  State
  > {
  static navigationOptions = {
    header: props => <MainScreenHeader {...props} />,
  };
  _keyExtractor = item => item.toString(); // https://github.com/facebook/react-native/issues/18291
  render() {
    return (
      <Query
        query={gql`
          {
            savedCharacterTimelines @client {
              id
              name
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
          data && console.log("SAVED CHAR TIMELINES:")
          data && console.log(data.savedCharacterTimelines)
          return (
            // Fetch all characters (Saved Character Timelines)
            <Mutation mutation={gql`
                mutation TOGGLE_CHARACTER_TIMELINE_SAVE($character: Character!) {
                  toggleCharacterTimelineSave(character: $character) @client
                }
              `}
            >
              {toggleCharacterTimelineSave => {
                console.log("SAVED CHAR TIMELINES:")
                console.log(data.savedCharacterTimelines)
                return (
                  <View>
                    <Text>Browse Timelines</Text>
                    <FlatList
                      data={data.savedCharacterTimelines}
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
                  </View>
                )
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
