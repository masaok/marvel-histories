/**
 * SearchScreen
 */

import * as React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableWithoutFeedback
} from "react-native";

import styles from "./SearchScreen.styles";
import MainScreenHeader from "../../../shared/Headers/MainScreenHeader";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import ViewCharacterScreen from "../../../Detail/screens/ViewCharacterScreen";
import NavigationService from "../../../../services/NavigationService";

export interface Props {}

interface State {
  text: string;
  name: string | null;
}

export default class SearchScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: props => <MainScreenHeader {...props} />
  };
  _keyExtractor = item => item.name;
  constructor(props) {
    super(props);
    this.state = { text: "Thor", name: null };
  }
  render() {
    return (
      <Query
        skip={this.state.name === null}
        variables={{ name: this.state.name }}
        query={gql`
          query heroFind($name: String) {
            getCharacter(where: { name: $name }) {
              name
              description
              thumbnail
              comics {
                name
              }
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
            <View>
              <Text> Insert Character Name Below</Text>
              <TextInput
                style={{ height: 100, borderColor: "gray", borderWidth: 1 }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                onSubmitEditing={() => {
                  this.setState({ name: this.state.text });
                }}
              />
              {data && (
                <FlatList
                  data={[data.getCharacter]}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          NavigationService.navigate("Timelines", data)
                        }
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: item.thumbnail }}
                          />
                          <Text>{item.name}</Text>
                          <Text>{item.description}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  }}
                />
              )}
            </View>
          );
        }}
      </Query>
    );
  }
}
