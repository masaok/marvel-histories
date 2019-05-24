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

import { Query, QueryResult } from "react-apollo";
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
  _keyExtractor = item => item.id;
  constructor(props) {
    super(props);
    this.state = { text: "Ice", name: null };
  }
  render() {
    return (
      <Query
        skip={this.state.name === null}
        variables={{ name: this.state.name }}
        query={gql`
          query heroFind($name: String) {
            characters(where: { nameStartsWith: $name }) {
              name
              description
              thumbnail
              id
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
            <View style={styles.page}>
              <Text> Insert Character Name Below</Text>
              <View>
                <TextInput
                  style={styles.search}
                  onChangeText={text => this.setState({ text })}
                  value={this.state.text}
                  onSubmitEditing={() => {
                    this.setState({ name: this.state.text });
                  }}
                />
              </View>
              {data && (
                <FlatList
                  data={data.characters}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          NavigationService.navigate("Timelines", {
                            character: item
                          })
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
