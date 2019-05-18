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
          const current = cache.readQuery({ query });

          console.log('CHECKING EXISTENCE');
          console.log(character);
          const exists = current.likedCharacters.some(item => {
            return item.id === character.id;
          });
          console.log('EXISTS: ' + exists);

          let likedCharacters = current.likedCharacters;

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
            likedCharacters,
          };

          // you can also do cache.writeData({ data }) here if you prefer
          cache.writeQuery({ query, data });

          return data;
        },
        toggleCharacterTimelineSave: (_, { character }, { cache }) => {

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

          console.log('CHECKING EXISTENCE');
          console.log(character);

          // Does the incoming character exist in the current data?
          const exists = current.savedCharacterTimelines.some(item => {
            return item.id === character.id;
          });
          console.log('EXISTS: ' + exists);

          // Prepare to edit the list
          let savedCharacterTimelines = current.savedCharacterTimelines;

          // Get the index of the incoming character in the list of current data
          const index = savedCharacterTimelines
            .map(item => item.id)
            .indexOf(character.id);

          // Either concat or splice the mutable variable prepared above
          if (index < 0) {
            console.log('CONCATTING ...');
            savedCharacterTimelines = savedCharacterTimelines.concat([character]);
            console.log(savedCharacterTimelines);
          } else {
            console.log('SPLICING ...');
            savedCharacterTimelines.splice(index, 1);
            console.log(savedCharacterTimelines);
          }

          console.log('INDEX: ' + index);

          // TODO: can this go first? (might look nicer, why is it located here?)
          character.__typename = 'Character'; // must give typename (Apollo client thing)

          // TODO: can this be done inline in the writeQuery statement below?
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
