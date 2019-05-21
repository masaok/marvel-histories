/**
 * ViewCharacterScreen
 */

import * as React from "react";
import { Text, View, Image, TextInput, FlatList } from "react-native";

import styles from "./ViewCharacterScreen.styles";

import { Query, QueryResult } from "react-apollo";
import { gql } from "apollo-boost";
import SubScreenHeader from "../../../shared/Headers/SubScreenHeader";
import { NavigationScreenProp } from "react-navigation";

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  text: string;
  id: number | null;
}

export default class ViewCharacterScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "View Character",
    header: props => <SubScreenHeader title={"View Character"} {...props} />
  };
  _keyExtractor = item => item.id;
  constructor(props) {
    super(props);
    this.state = { text: "Thor", id: null };
  }

  render() {
    console.log("RENDER ...")
    const character = this.props.navigation.getParam("character");
    console.log("RENDER > character:")
    console.log(character)
    // {
    //     comics(where: {characters: [$id]}) {
    //       title
    //     }
    // }

    // const GET_CHARACTER_ID = gql`
    // {
    //   query comicFind($name: String) {
    //     getCharacter(where: { name: $name }) {
    //       id
    //     }
    //   }
    // }
    // `;

    // const characterId = ({character.name}) => (
    //   <Query query={GET_CHARACTER_ID} variables={{character.name}}>
    //   {({loading, error, data} => {
    //     if (loading) return null;
    //     if (error) return `Error! ${error}`;
    //     return();
    //   })}

    //   </Query>
    // );

    return (
      <Query
        skip={character.name === null}
        variables={{ name: character.name }}
        query={gql`
          query comicFind($name: String) {
            getCharacter(where: { name: $name }) {
              id
              name
            }
          }
        `}
      >
        {({ loading, data, error }: QueryResult) => {
          if (loading || error) {
            return (
              <View style={styles.container}>
                <Text>Loading...</Text>
              </View>
            );
          }
          data && console.log("DATA > GET CHARACTER:")
          data && console.log(data.getCharacter)
          return (
            <Query
              query={gql`
                {
                  comics(where: {characters: [1009664]}) {
                    title
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
                data && console.log("COMICS DATA:")
                data && console.log(data.comics)
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <Image
                        style={styles.characterPortrait}
                        source={{ uri: character.thumbnail }}
                      />
                      {/* <Text> {JSON.stringify(charata.id)} </Text> */}

                      <View
                        style={{
                          flexDirection: "row"
                        }}
                      />
                    </View>
                  </View>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}
