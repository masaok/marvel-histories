/**
 * ViewCharacterScreen
 */

import * as React from "react";
import { Text, View, Image, TextInput, FlatList } from "react-native";

import styles from "./ViewCharacterScreen.styles";

import { Query, QueryResult, compose, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import SubScreenHeader from "../../../shared/Headers/SubScreenHeader";
import { NavigationScreenProp } from "react-navigation";

const { find, filter } = require("lodash");

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  text: string;
  id: number | null;
}

export default class ViewCharacterScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: props => <SubScreenHeader title={"View Character"} {...props} />
  };
  _keyExtractor = item => item.id;
  constructor(props) {
    super(props);
    this.state = { text: "Thor", id: null };
  }

  render() {
    const character = this.props.navigation.getParam("character");

    return (
      <Query
        skip={character.name === null}
        variables={{ name: character.name }}
        query={gql`
          query characterFind($name: String) {
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
                <Text> {JSON.stringify(character.description)} </Text>
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
  }
}
