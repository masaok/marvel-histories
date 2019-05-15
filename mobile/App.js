import React from "react";
import { Button, Image, FlatList, StyleSheet, Text, View } from "react-native";

import { ApolloProvider, Query, Mutation } from "react-apollo";

import ApolloClient from "apollo-boost";

import { gql } from "apollo-boost";
import { red } from "ansi-colors";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50
  },
  row: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  list: {
    alignSelf: "stretch",
    marginLeft: 5,
    marginRight: 5
  },
  name: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  }
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`
            {
              characters(offset: 2) {
                id
                name
                description
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
            console.log(data && data.characters);
            return (
              <View style={styles.container}>
                {data.characters.map(char => {
                  return (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: char.thumbnail }}
                      />
                      <Text style={{ flex: 1 }}>{char.name}</Text>
                    </View>
                  );
                })}
              </View>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}
