/**
 * CharacterTimelineScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Image, Button } from 'react-native';

import styles from './CharacterTimelineScreen.styles';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

export interface Props { }

interface State { }

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
            <Mutation mutation={gql`
                mutation TOGGLE_CHARACTER_TIMELINE_SAVE($character: Character!) {
                  toggleCharacterTimelineSave(character: $character) @client
                }
              `}
            >
              {toggleCharacterTimelineSave => {
                return (
                  <View>
                    <Text>Add to Saved Timelines</Text>
                    <Button
                      onPress={() => {
                        // TODO: this resolver function references a function in App.tsx, in the Apollo client
                        // TODO: how do you import and call it here?
                        toggleCharacterTimelineSave({
                          variables: { character: { id: 1009313 } }
                        })
                      }}
                      title="TEST"
                      // title={
                      //   data.likedCharacters
                      //     .map(char => char.id)
                      //     .indexOf(item.id) > -1
                      //     ? 'Unlike'
                      //     : 'Like'
                      // }
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
