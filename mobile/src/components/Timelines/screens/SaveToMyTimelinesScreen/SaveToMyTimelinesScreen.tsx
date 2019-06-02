/**
 * MyTimelinesScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Image, Button, TouchableHighlight } from 'react-native';

import styles from './SaveToMyTimelinesScreen.styles';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { NavigationScreenProp } from 'react-navigation';
import SubScreenHeader from '../../../shared/Headers/SubScreenHeader';

import { Header } from 'react-native-elements';
import NavigationService from '../../../../services/NavigationService';

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

const READ_ONLY = 'readonly'
const EDITABLE = 'editable'
const MODAL = 'modal'

const ENUM = 'a' || 'b' || 'c'


interface State {
  text: string,
  name: string | null,
  mode: string,
  character: {
    id: number,
    name: string,
    thumbnail: string,
  }
  timelines: {
    key: string,
    items: {
      id: number,
      name: string,
      thumbnail: string,
    }[]
  }[]
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

  _keyExtractor = item => {
    // console.log("KEY EXTRACTOR > ITEM:")
    // console.log(item)
    return item.key.toString();
  }

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
      name: "Gambit Mock",
      thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99.jpg",
    }

    // Default to incoming param, otherwise use the mock
    const character = characterParam ? characterParam : characterMock;
    console.log("SAVE TO MY > constructor > CHARACTER:")
    console.log(character)

    const timelinesMock = [
      {
        key: "1",
        items: [
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
      },
      {
        key: "2",
        items: [
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
      },
      {
        key: "3",
        items: [
          {
            id: 1009313,
            name: "Gambit",
            thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99.jpg",
          },
        ],
      },
    ]

    this.state = {
      text: "Iron Man",
      name: null,
      character,
      mode: "view",
      timelines: timelinesMock
    };
  }

  render() {
    const { character, timelines } = this.state

    return (
      <Query
        query={gql`
          {
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
            myTimelines @client {
              key
              items
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
            // Save the given Character Timeline to the user-selected Timeline Slot
            <Mutation mutation={gql`
                mutation SAVE_CHARACTER_TO_MY_TIMELINES($character: Character!, $slot: Object, $test: string) {
                  saveCharacterToMyTimelines(character: $character, slot: $slot, test: $test) @client
                }
              `}
            >
              {saveCharacterToMyTimelines => {
                console.log("SAVE TO MY > QUERY > MUTATION > SAVED CHAR TIMELINES:")
                console.log(data.savedCharacterTimelines)
                console.log("SAVE TO MY > QUERY > MUTATION > MY TIMELINES:")
                console.log(data.myTimelines)
                return (
                  <View>
                    <View style={styles.listRow}>
                      <Text style={styles.subtitle}>Where do you want to save this character?</Text>
                    </View>
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
                    <View style={styles.listRow}>
                      <Text style={styles.subtitle}>Character Timelines</Text>
                    </View>
                    <FlatList
                      data={data.myTimelines}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => {
                        console.log("MY TIMELINE > RENDER > item.items:")
                        console.log(item.items)
                        return (
                          <TouchableHighlight
                            onPress={async () => {
                              console.log("PRESSED ITEM:")
                              console.log(item)
                              await saveCharacterToMyTimelines({
                                variables: {
                                  character,
                                  slot: item,
                                  test: "TEST"
                                }
                              })
                              await setTimeout(() => NavigationService.goBack(), 1000) // wait, then close the modal
                            }}
                          >
                            {item.items.length > 0 ?
                              <View style={styles.listRowSlot}>
                                {item.items.map(char => {
                                  // console.log("MY TIMELINE > RENDER > VIEW > MAP > CHAR:")
                                  // console.log(char)
                                  return (
                                    <Image
                                      key={char.id}
                                      style={styles.thumbnail}
                                      source={{ uri: char.thumbnail }}
                                    />
                                  )
                                })}
                              </View> :
                              <View style={styles.listRowSlot}>
                                <Image
                                  style={styles.thumbnail}
                                  source={{ uri: "https://dummyimage.com/300/FFF/fff.jpg" }}
                                />
                              </View>
                            }
                          </TouchableHighlight>
                        );
                      }}
                    />
                    <View>
                      <Button
                        onPress={() => {
                        }}
                        title="Add Character Timeline Slot"
                        color='#841584'
                        accessibilityLabel='Learn more about this button'
                      />
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
