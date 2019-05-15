import React from 'react';
import { Button, Image, FlatList, StyleSheet, Text, View } from 'react-native';

import { ApolloProvider, Query, Mutation } from 'react-apollo';

import ApolloClient from 'apollo-boost';

import { gql } from 'apollo-boost';

// TODO: when user taps "Like", that data should be saved locally in JSON
// TODO:

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults: {
      isConnected: true,
      // likes: [] // character ID's liked by the user
      likedCharacter: null
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } });
          return null;
        },
        addLike: (_, { character }, { cache }) => {
          cache.writeData({ data: { likedCharacter: character } });
          return null;
        }
      }
    }
  }
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

// const cache = new InMemoryCache();

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
            if (data && data.characters) {
              data.characters.splice(3);
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
        <Query
          query={gql`
            {
              isConnected @client
            }
          `}
        >
          {({ loading, data, error }) => {
            console.log('STUFF', loading, data && data.isConnected, error);
            return <Text> stuff: {`${data && data.isConnected}`}</Text>;
          }}
        </Query>
        <Mutation
          mutation={gql`
            mutation {
              updateNetworkStatus(isConnected: false) @client
            }
          `}
        >
          {updateNetworkStatus => {
            return (
              <Button
                onPress={() => updateNetworkStatus()}
                title='OFF'
                color='#841584'
                accessibilityLabel='off'
              />
            );
          }}
        </Mutation>
        <Mutation
          mutation={gql`
            mutation {
              updateNetworkStatus(isConnected: true) @client
            }
          `}
        >
          {updateNetworkStatus => {
            return (
              <Button
                onPress={() => updateNetworkStatus()}
                title='ON'
                color='#841584'
                accessibilityLabel='on'
              />
            );
          }}
        </Mutation>
      </ApolloProvider>
    );
  }
}

// https://www.apollographql.com/docs/react/essentials/get-started
