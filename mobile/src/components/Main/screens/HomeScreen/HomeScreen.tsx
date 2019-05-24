/**
 * HomeScreen
 */

import * as React from "react";
import { Button, Image, FlatList, StyleSheet, Text, View } from "react-native";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import styles from "./HomeScreen.styles";
import MainScreenHeader from "../../../shared/Headers/MainScreenHeader";
import SubScreenHeader from "../../../shared/Headers/SubScreenHeader";
import NavigationService from "../../../../services/NavigationService";

export interface Props { }

interface State { }

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: props => <MainScreenHeader {...props} />
  };
  _keyExtractor = item => item.id;
  render() {
    return (
      // @ts-ignore
      <Query
        query={gql`
          {
            characters(offset: 50) {
              id
              name
              description
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
          return (
            <Mutation mutation={gql`
                mutation TOGGLE_LIKED_CHARACTER($character: Character!) {
                  toggleLikedCharacter(character: $character) @client
                }
              `}
            >
              {toggleLikedCharacter => {
                return (
                  <FlatList
                    data={data.characters}
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => {
                      return (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                          <Image
                            style={styles.thumbnail}
                            source={{ uri: item.thumbnail }}
                          />
                          <Text style={{
                            marginLeft: 5,
                            marginRight: "auto",
                            // backgroundColor: "yellow"
                          }}>{item.name}</Text>
                          <View style={{
                          }}>
                            <Button
                              onPress={() => {
                                toggleLikedCharacter({
                                  variables: {
                                    character: {
                                      id: item.id,
                                      name: item.name,
                                      thumbnail: item.thumbnail,
                                    }
                                  }
                                })
                              }}
                              // title="TEST"
                              title={
                                data.likedCharacters
                                  .map(char => char.id)
                                  .indexOf(item.id) > -1
                                  ? 'Unlike'
                                  : 'Like'
                              }
                              color='#841584'
                              accessibilityLabel='Learn more about this button'
                            />
                          </View>
                          <View>
                            <Button
                              onPress={() => {
                                NavigationService.navigate("Timelines", {
                                  character: item
                                })
                              }}
                              title="View"
                              color='#841584'
                              accessibilityLabel='Learn more about this button'
                            />
                          </View>
                        </View>
                      );
                    }}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
