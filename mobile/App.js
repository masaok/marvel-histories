import React from 'react';
import { Button, Image, FlatList, StyleSheet, Text, View } from 'react-native';

import { ApolloProvider, Query } from 'react-apollo';

import ApolloClient from 'apollo-boost';

import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  list: {
    // flex: 1, // white screen
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5
  },
  name: {
    flex: 1, // required
    // backgroundColor: 'lightblue',  // dev only
    // alignSelf: 'stretch',  // causes Text to stretch vertically, disabling vertical align center
    justifyContent: 'center',
    alignItems: 'center',
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
              characters {
                id
                name
                description
                thumbnail
              }
            }
          `}
        >
          {({ loading, data, error }) => {
            console.log(loading, data && data.characters, error);
            // TODO: splice the data.characters to 3 characters for dev purposes
            if (loading || error) {
              return (
                <View style={styles.container}>
                  <Text>Loading...</Text>
                </View>
              );
            }
            return (
              <View style={styles.container}>
                <FlatList
                  style={styles.list}
                  data={data.characters}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.row} key={item.id}>
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={{
                            uri: item.thumbnail
                          }}
                        />
                        <Text style={styles.name}>{item.name}</Text>
                        <Button
                          onPress={() => {}}
                          title='Like'
                          color='#841584'
                          accessibilityLabel='Learn more about this button'
                        />
                      </View>
                    );
                  }}
                />
              </View>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

// https://www.apollographql.com/docs/react/essentials/get-started
