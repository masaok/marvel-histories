import React from 'react';
import { View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';
import { NavigationContainerComponent } from 'react-navigation';
import { AppContainer } from './router';
import NavigationService from '../services/NavigationService';

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql'
// });

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults: {
      isConnected: true,
      // likes: [] // character ID's liked by the user
      likedCharacter: {
        id: null,
        __typename: 'Character',
      },
      likedCharacters: [],
      savedCharacterTimelines: [],
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

          character.__typename = 'Character'; // must give typename (required by Apollo client)

          const query = gql`
            query GetLikedCharacters {
              likedCharacters @client {
                id
              }
            }
          `;
          const current = cache.readQuery({ query });

          const exists = current.likedCharacters.some(item => {
            return item.id === character.id;
          });

          let likedCharacters = current.likedCharacters;

          const index = likedCharacters
            .map(item => item.id)
            .indexOf(character.id);

          if (index < 0) {
            likedCharacters = likedCharacters.concat([character]);
          } else {
            likedCharacters.splice(index, 1);
          }

          const data = {
            likedCharacters,
          };

          // you can also do cache.writeData({ data }) here if you prefer
          cache.writeQuery({ query, data });

          return data;
        },
        toggleSaveCharacterTimeline: (_, { character }, { cache }) => {

          character.__typename = 'Character'; // must give typename (required by Apollo client)

          // Query to fetch current data
          const query = gql`
            query GetSavedCharacterTimelines {
              savedCharacterTimelines @client {
                id
              }
            }
          `;

          // Execute the query
          const current = cache.readQuery({ query });

          // Does the incoming character exist in the current data?
          const exists = current.savedCharacterTimelines.some(item => {
            return item.id === character.id;
          });

          // Prepare to edit the list
          let savedCharacterTimelines = current.savedCharacterTimelines;

          // Get the index of the incoming character in the list of current data
          const index = savedCharacterTimelines
            .map(item => item.id)
            .indexOf(character.id);

          // Either concat or splice the mutable variable prepared above
          if (index < 0) {
            savedCharacterTimelines = savedCharacterTimelines.concat([character]);
          } else {
            savedCharacterTimelines.splice(index, 1);
          }

          // Data must a separate hash (cannot be inline in writeQuery)
          const data = {
            savedCharacterTimelines,
          };

          cache.writeQuery({ query, data });

          return data;
        },
      },
    },
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <AppContainer
            // navigationOptions={{ header: null, headerMode: 'screen' }}
            ref={navigatorRef => {
              navigatorRef = navigatorRef as NavigationContainerComponent;
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </ApolloProvider>
      </View>
    );
  }
}
