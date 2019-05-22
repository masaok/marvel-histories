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

      // TODO: this query needs to query "characters"
      <Query
        query={gql`
          {
            # comics(where: { characters: [1009313] }, orderBy: focDate_asc, limit: 10 ) {
            #   id
            #   title
            #   thumbnail
            #   dates { type, date }
            # }
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
                // let comicsById = {}
                // data.comics.forEach(item => {
                //   comicsById[item.id] = item
                //   console.log("COMIC ID")
                // })
                // console.log("COMICS BY ID")
                // console.log(comicsById)
                return (
                  <View>
                    <Text>Browse Timelines</Text>
                    <FlatList
                      data={data.savedCharacterTimelines}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => {

                        // const comic = comicsById[item.id]
                        // console.log("COMIC")
                        // console.log(comic)

                        // // Parse and convert the date info for display
                        // const onsaleDate = comic.dates[0].date
                        // const substring = onsaleDate.substring(0, 19)
                        // const obj = new Date(substring)
                        // const displayDay = obj.getDate() + 1
                        // const displayMonth = obj.getMonth() + 1
                        // const displayFullYear = obj.getFullYear() + 1

                        return (
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Text>{displayMonth}/{displayDay}/{displayFullYear}</Text> */}
                            <Image
                              style={{ width: 50, height: 50 }}
                              source={{ uri: item.thumbnail }}
                            />
                            <Text>{item.id}</Text>
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
