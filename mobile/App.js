import React from 'react';
import { Button, Image, FlatList, StyleSheet, Text, View } from 'react-native';

import { ApolloProvider, Query, Mutation } from 'react-apollo';

import ApolloClient from 'apollo-boost';

import { gql } from 'apollo-boost';

// TODO: when user taps "Like", that data should be saved locally in JSON

// TODO: Allow multiple Likes
// TODO: https://www.apollographql.com/docs/link/links/state#write-query

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
          // const newLikedCharacter = {
          //   id: character.id,
          //   __typename: 'Character'
          // };
          character.__typename = 'Character'; // must give typename (Apollo client thing)
          const data = {
            likedCharacters: previous.likedCharacters.concat([character])
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
            if (loading || error) {
              return (
                <View style={styles.container}>
                  <Text>Loading...</Text>
                </View>
              );
            }
            if (data && data.characters) {
              data.characters.splice(3); // for dev only
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
                        <Query
                          query={gql`
                            {
                              likedCharacters @client {
                                id
                              }
                            }
                          `}
                        >
                          {({ loading, data, error }) => {
                            console.log('LIKE CONSOLE');
                            console.log(data && data.likedCharacters);

                            return (
                              <Mutation
                                mutation={gql`
                                  mutation ADD_LIKE($character: Character!) {
                                    addMultiLike(character: $character) @client
                                  }
                                `}
                              >
                                {addMultiLike => {
                                  console.log('HELLO');
                                  if (data) {
                                    console.log(data.likedCharacters);
                                  }
                                  return (
                                    <Button
                                      onPress={() =>
                                        addMultiLike({
                                          variables: { character: item }
                                        })
                                      }
                                      title={(() => {
                                        let exists = false;
                                        for (
                                          let i = 0;
                                          i < data.likedCharacters.length;
                                          i++
                                        ) {
                                          if (
                                            data.likedCharacters[i].id ===
                                            item.id
                                          ) {
                                            exists = true;
                                            break;
                                          }
                                        }
                                        return exists ? 'Unlike' : 'Like';
                                      })()}
                                      color='#841584'
                                      accessibilityLabel='Learn more about this button'
                                    />
                                  );
                                }}
                              </Mutation>
                            );
                          }}
                        </Query>
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
