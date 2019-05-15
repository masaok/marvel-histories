import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { ApolloProvider, Query } from 'react-apollo';

import ApolloClient from 'apollo-boost';

import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
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
            if (loading || error) {
              return (
                <View style={styles.container}>
                  <Text>Loading...</Text>
                </View>
              );
            }
            return data.characters.map(character => (
              <View style={styles.container}>
                <Text>
                  {character.name}
                </Text>
                {/* <Image
                  style={{ width: 620, height: 413 }}
                  source={{
                    uri:
                      'https://images.immediate.co.uk/volatile/sites/3/2018/03/DTT4430_v707.1023-61174bd.jpg?quality=90&resize=620,413'
                  }}
                />     */}
                <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: character.thumbnail
                    
                }}
              />
              </View>
            ));
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// https://www.apollographql.com/docs/react/essentials/get-started
