/**
 * ViewCharacterScreen
 */

import * as React from "react";
import { Text, View, Image, TextInput, FlatList } from "react-native";

import styles from "./ViewCharacterScreen.styles";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import SubScreenHeader from "../../../shared/Headers/SubScreenHeader";

export interface Props {}

interface State {
  text: string;
  id: number | null;
}

export default class ViewCharacterScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "View Character",
    header: <SubScreenHeader />
  };
  _keyExtractor = item => item.id;
  constructor(props) {
    super(props);
    this.state = { text: "Thor", id: null };
  }

  render() {
    const data = this.props.navigation.state.params;

    return (
      <FlatList
        data={[data.getCharacter]}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: item.thumbnail }}
              />
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          );
        }}
      />
    );
  }
}
