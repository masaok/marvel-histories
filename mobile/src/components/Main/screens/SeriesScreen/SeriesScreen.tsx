/**
 * SeriesScreen
 */

import * as React from "react";
import { Button, Image, FlatList, StyleSheet, Text, View } from "react-native";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import styles from "./SeriesScreen.styles";
import MainScreenHeader from "../../../shared/Headers/MainScreenHeader";
import SubScreenHeader from "../../../shared/Headers/SubScreenHeader";

export interface Props { }

interface State { }

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: props => <MainScreenHeader title={"Browse Series"} {...props} />
  };
  _keyExtractor = item => item.id;
  render() {
    return (
      // @ts-ignore
      <Query
        query={gql`
          {
            series {
              id
              title
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
          data && console.log("HOME SCREEN > DATA LIKED CHARACTERS:")
          data && console.log(data.likedCharacters)
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
                    data={data.series}
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
                          }}>{item.title}</Text>
                          <View style={{
                            // backgroundColor: "red" 
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
