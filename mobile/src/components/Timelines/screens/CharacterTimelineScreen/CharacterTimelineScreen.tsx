/**
 * CharacterTimelineScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Image, Button } from 'react-native';

import styles from './CharacterTimelineScreen.styles';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import MainScreenHeader from '../../../shared/Headers/MainScreenHeader';
import { NavigationScreenProp } from 'react-navigation';
import SubScreenHeader from '../../../shared/Headers/SubScreenHeader';
import NavigationService from '../../../../services/NavigationService';

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  text: String,
  name: String | null,
  mode: String,
  character: {
    id: Number,
    name: String,
    thumbnail: String,
  }
}

export default class CharacterTimelineScreen extends React.Component<
  Props,
  State
  > {
  static navigationOptions = {
    header: props => {
      return (<SubScreenHeader title={"Character Timeline"} {...props} />)
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
      mode: "view",
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

                    {/* Save (Like) Timeline */}
                    <Button
                      onPress={() => {
                        toggleSaveCharacterTimeline({
                          variables: {
                            character: {
                              id: character.id,
                              name: character.name,
                              thumbnail: character.thumbnail,
                            }
                          }
                        })
                      }}
                      title={
                        data.savedCharacterTimelines
                          .map(char => char.id)
                          .indexOf(character.id) > -1
                          ? 'Unsave Timeline'
                          : 'Save Timeline'
                      }
                      color='#841584'
                    />

                    {/* {!this.props.readOnly && (
                        <Icon
                          size={25}
                          name='edit'
                          color='lightgrey'
                          onPress={() =>
                            NavigationService.navigate('EditRoll', { roll })
                          }
                          iconStyle={styles.editIcon}
                        />
                      )} */}

                    {/* TODO: Show a modal of My Timelines, allowing the user to select which My Timeline to add it to */}
                    <Button
                      onPress={() => {
                        NavigationService.navigate('MyTimelines', { character })
                      }}
                      title={
                        data.savedCharacterTimelines
                          .map(char => char.id)
                          .indexOf(character.id) > -1
                          ? 'Remove from My Timelines'
                          : 'Save To My Timelines'
                      }
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
