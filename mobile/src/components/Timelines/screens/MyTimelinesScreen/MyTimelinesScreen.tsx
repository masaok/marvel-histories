/**
 * MyTimelinesScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Image, Button } from 'react-native';

import styles from './MyTimelinesScreen.styles';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { NavigationScreenProp } from 'react-navigation';
import SubScreenHeader from '../../../shared/Headers/SubScreenHeader';

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  text: String,
  name: String | null,
  character: {
    id: Number,
    name: String,
    thumbnail: String,
  }
  timelines:
  {
    id: Number,
    name: String,
    thumbnail: String,
  }[][]
}

export default class MyTimelinesScreen extends React.Component<
  Props,
  State
  > {

  static navigationOptions = {
    header: props => {
      return (<SubScreenHeader title={"My Timelines"} {...props} />)
    }
  };

  _keyExtractor = item => item.id;

  // _keyGenerator = item => {
  //   id = id + 1
  //   return id
  // }

  constructor(props) {
    super(props);

    const characterParam = props.navigation.getParam("character");

    // Character Mock
    const characterMock = {
      id: 1009313,
      name: "Gambit",
      thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99.jpg",
    }

    // Default to incoming param, otherwise use the mock
    const character = characterParam ? characterParam : characterMock;

    const timelinesMock = [
      [
        {
          id: 1009313,
          name: "Gambit",
          thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99.jpg",
        },
        {
          id: 1009159,
          name: "Archangel",
          thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/8/03/526165ed93180.jpg",
        },
        {
          id: 1011012,
          name: "Armadillo",
          thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/40/4c0032754da02.jpg",
        }
      ],
      [
        {
          id: 1009313,
          name: "Gambit",
          thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99.jpg",
        },
        {
          id: 1011012,
          name: "Armadillo",
          thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/40/4c0032754da02.jpg",
        }
      ],
      [
        {
          id: 1011012,
          name: "Armadillo",
          thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/40/4c0032754da02.jpg",
        }
      ]
    ]

    this.state = {
      text: "Iron Man",
      name: null,
      character,
      timelines: timelinesMock
    };
  }

  render() {
    const { character, timelines } = this.state

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
          return (
            <Mutation mutation={gql`
                mutation TOGGLE_SAVE_CHARACTER_TIMELINE($character: Character!) {
                  toggleSaveCharacterTimeline(character: $character) @client
                }
              `}
            >
              {toggleSaveCharacterTimeline => {
                console.log("QUERY > MUTATION > SAVED CHAR TIMELINES:")
                console.log(data.savedCharacterTimelines)
                return (
                  <View>
                    <View style={styles.listRow}>
                      <Text style={styles.subtitle}>Character Timelines</Text>
                    </View>
                    <View style={styles.listRowOutline}>
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: character.thumbnail }}
                      />
                    </View>
                    <View style={styles.listRowOutline}>
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: character.thumbnail }}
                      />
                    </View>
                    <View style={styles.listRowOutline}>
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: character.thumbnail }}
                      />
                    </View>
                    <FlatList
                      data={timelines}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => {
                        return (
                          <View style={styles.listRowOutline}>
                            <Image
                              style={styles.thumbnail}
                              source={{ uri: character.thumbnail }}
                            />
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
