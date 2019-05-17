/**
 * SearchScreen
 */

import * as React from "react";
import { Text, View, FlatList, Image, TextInput } from "react-native";

import styles from "./SearchScreen.styles";
import MainScreenHeader from "../../../shared/Headers/MainScreenHeader";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export interface Props {}

interface State {
  text: string;
  id: number | null;
}

export default class SearchScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: props => <MainScreenHeader {...props} />
  };
  _keyExtractor = item => item.id;
  constructor(props) {
    super(props);
    this.state = { text: "Stuff", id: null };
  }
  render() {
    return (
      <Query
        skip={this.state.id === null}
        variables={{ id: this.state.id }}
        query={gql`
          query heroFind($id: Int) {
            getCharacter(where: { id: $id }) {
              id
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
                  this.setState({ id: +this.state.text });
                }}
              />
              {data && (
                <FlatList
                  data={[data.getCharacter]}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => {
                    return (
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
