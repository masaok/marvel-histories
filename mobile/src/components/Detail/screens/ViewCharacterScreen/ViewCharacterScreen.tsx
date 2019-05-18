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
    // data is defined when the user taps Search first, then searches for a character, and taps the character
    const data = this.props.navigation.state.params;
    console.log(data)
    console.log(this.props)

    return (
      <FlatList
        data={[data.getCharacter]}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => {
          console.log(item)

          // TODO: key warning here (the key below does not fix the warning)
          return (
            <View style={{ flexDirection: "row", alignItems: "center" }} key={item.id}>
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
