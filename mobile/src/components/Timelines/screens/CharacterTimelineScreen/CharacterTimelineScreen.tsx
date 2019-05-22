/**
 * CharacterTimelineScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Image, Button } from 'react-native';

import styles from './CharacterTimelineScreen.styles';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import MainScreenHeader from '../../../shared/Headers/MainScreenHeader';

export interface Props { }

interface State { }

export default class CharacterTimelineScreen extends React.Component<
  Props,
  State
  > {
  static navigationOptions = {
    header: props => <MainScreenHeader {...props} />,
  };
  _keyExtractor = item => item.id;
  render() {
    // TODO: This is probably how the character will be incoming from a previous page
    // const character = this.props.navigation.getParam("character");

    // TODO: But for now, let's mock it
    // TODO: Add a thumbnail here
    const character = {
      id: 1009313,
      name: "Gambit",
      thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99.jpg",
    }
    return (
      <Query
        query={gql`
          {
            # TODO: need to mock this ID similar to how a user would navigate here from another page
            comics(where: { characters: [${character.id}] }, orderBy: focDate_asc, limit: 10 ) {
              id
              title
              thumbnail
              dates { type, date }
            }
            savedCharacterTimelines @client {
              id
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
            <Mutation mutation={gql`
                mutation TOGGLE_SAVE_CHARACTER_TIMELINE($character: Character!) {
                  toggleSaveCharacterTimeline(character: $character) @client
                }
              `}
            >
              {toggleSaveCharacterTimeline => {
                console.log("SAVED CHAR TIMELINES:")
                console.log(data.savedCharacterTimelines)
                return (
                  <View>
                    <Button
                      onPress={() => {
                        toggleSaveCharacterTimeline({
                          // TODO: need to save more info (thumbnail, etc) at this point
                          variables: { character: { id: character.id } }
                        })
                      }}
                      // title="TEST"
                      title={
                        data.savedCharacterTimelines
                          .map(char => char.id)
                          .indexOf(character.id) > -1
                          ? 'Unsave Timeline'
                          : 'Save Timeline'
                      }
                      color='#841584'
                      accessibilityLabel='Learn more about this button'
                    />
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
