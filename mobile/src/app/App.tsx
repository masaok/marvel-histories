import React from 'react';
import { Button, Image, FlatList, StyleSheet, Text, View } from 'react-native';

import { ApolloProvider, Query, Mutation } from 'react-apollo';

import ApolloClient from 'apollo-boost';

import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults: {
      isConnected: true,
      // likes: [] // character ID's liked by the user
      likedCharacter: {
        id: null,
        __typename: 'Character'
      },
      likedCharacters: []
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
        },
        addMultiLike: (_, { character }, { cache }) => {
          const query = gql`
            query GetLikedCharacters {
              likedCharacters @client {
                id
              }
            }
          `;
          const previous = cache.readQuery({ query });

          console.log('CHECKING EXISTENCE');
          console.log(character);
          const exists = previous.likedCharacters.some(item => {
            return item.id === character.id;
          });
          console.log('EXISTS: ' + exists);

          let likedCharacters = previous.likedCharacters;

          const index = likedCharacters
            .map(item => item.id)
            .indexOf(character.id);

          if (index < 0) {
            console.log('CONCATTING ...');
            likedCharacters = likedCharacters.concat([character]);
            console.log(likedCharacters);
          } else {
            console.log('SPLICING ...');
            likedCharacters.splice(index, 1);
            console.log(likedCharacters);
          }

          console.log('INDEX: ' + index);

          character.__typename = 'Character'; // must give typename (Apollo client thing)
          const data = {
            likedCharacters
          };

          // you can also do cache.writeData({ data }) here if you prefer
          cache.writeQuery({ query, data });

          return data;
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

// https://www.apollographql.com/docs/react/essentials/get-started

export default class App extends React.Component {
  _keyExtractor = item => item.id;
  render() {
    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`
            {
              characters(offset: 50) {
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
            if (loading || error) {
              return (
                <View style={styles.container}>
                  <Text>Loading...</Text>
                </View>
              );
            }
            return (
              <FlatList
                data={data.characters}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: item.thumbnail }}
                      />
                      <Text>{item.name}</Text>
                    </View>
                  );
                }}
              />
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
            mutation UPDATE_NETWORK_STATUS($isConnected: Boolean!) {
              updateNetworkStatus(isConnected: $isConnected) @client
            }
          `}
        >
          {updateNetworkStatus => {
            return (
              <View>
                <Button
                  onPress={() =>
                    updateNetworkStatus({ variables: { isConnected: false } })
                  }
                  title='OFF'
                  color='#841584'
                  accessibilityLabel='off'
                />
                <Button
                  onPress={() =>
                    updateNetworkStatus({ variables: { isConnected: true } })
                  }
                  title='ON'
                  color='#841584'
                  accessibilityLabel='on'
                />
              </View>
            );
          }}
        </Mutation>
      </ApolloProvider>
    );
  }
}
