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

  constructor(props) {
    super(props);

    const characterParam = props.navigation.getParam("character");

    // Mock
    const characterMock = {
      id: 1009313,
      name: "Gambit",
      thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99.jpg",
    }

    // Default to incoming param, otherwise use the mock
    const character = characterParam ? characterParam : characterMock;

    this.state = {
      text: "Iron Man",
      name: null,
      character
    };
  }

  render() {
    const { character } = this.state

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
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <Image
                        style={styles.thumbnail}
                        source={{ uri: character.thumbnail }}
                      />
                      <Text style={{
                        marginLeft: 5,
                        marginRight: "auto",
                      }}>{character.name}</Text>
                    </View>
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
