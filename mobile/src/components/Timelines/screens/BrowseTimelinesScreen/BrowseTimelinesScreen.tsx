/**
 * BrowseTimelinesScreen
 */

import * as React from 'react';
import { Text, View, Button, FlatList, Image, StyleSheet } from 'react-native';

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
  _keyExtractor = item => item.id.toString() // must convert to string to avoid warning
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
            likedCharacters @client {
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
          data && console.log("LIKED CHARS:")
          data && console.log(data.likedCharacters)
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

                // Sort Liked Characters by name
                const compare = (a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                }
                data.likedCharacters.sort(compare)
                data.savedCharacterTimelines.sort(compare)

                return (
                  <View>
                    <Text style={styles.subtitle}>Liked Characters</Text>
                    <FlatList
                      data={data.likedCharacters}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => {
                        return (
                          <View style={styles.listRow}>
                            <Image
                              style={styles.thumbnail}
                              source={{ uri: item.thumbnail }}
                            />
                            <Text style={styles.name}>{item.name}</Text>
                            <Button
                              onPress={() => { }}
                              title="View"
                              color='#841584'
                            />
                          </View>
                        );
                      }}
                    />
                    <Text style={styles.subtitle}>Liked Series</Text>
                    <FlatList
                      data={data.savedCharacterTimelines}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => {
                        return (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              style={styles.thumbnail}
                              source={{ uri: item.thumbnail }}
                            />
                            <Text style={styles.name}>{item.name}</Text>
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
