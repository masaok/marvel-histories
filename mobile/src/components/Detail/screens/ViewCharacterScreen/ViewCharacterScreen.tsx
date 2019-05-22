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
        skip={character.id === null}
        variables={{ id: character.id }}
        query={gql`
          query comicFind($id: ID!) {
            comics(where: { characters: [$id] }) {
              title
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

          // console.log(data);

          return (
            <View style={styles.page}>
              <View style={styles.characterPortrait}>
                <Image
                  style={styles.characterImage}
                  source={{ uri: character.thumbnail }}
                />

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
