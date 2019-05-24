import React from "react";
import { View, AsyncStorage } from "react-native";
import { ApolloProvider } from "react-apollo";
import ApolloClient, {
  gql,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import { NavigationContainerComponent } from "react-navigation";
import { AppContainer } from "./router";
import NavigationService from "../services/NavigationService";

import { persistCache, CachePersistor } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";

// Persist the cache through reload: https://github.com/apollographql/apollo-cache-persist
const cache = new InMemoryCache();

<<<<<<< Updated upstream
// persistCache({
//   cache,
//   debug: true,
//   debounce: 200,

//   // TypeScript workaround: https://github.com/apollographql/apollo-cache-persist/issues/75
//   storage: AsyncStorage as PersistentStorage<
//     PersistedData<NormalizedCacheObject>
//   >
// });
=======
const persistor = new CachePersistor(
  {
    cache,
    debug: true,
    debounce: 200,

    // TypeScript workaround: https://github.com/apollographql/apollo-cache-persist/issues/75
    storage: AsyncStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >
  }
);
>>>>>>> Stashed changes

const client = new ApolloClient({
  cache,
  uri: "http://localhost:4000/graphql",
  clientState: {
    defaults: {
      isConnected: true,
      // likes: [] // character ID's liked by the user
      likedCharacter: {
        id: null,
        __typename: "Character"
      },
      likedCharacters: [],
      savedCharacterTimelines: []
    },
    resolvers: {
      Query: {
        fetchCharacters: (_, { characters }, { client }) => {
          // Given the array of characters, query the API for each character to get its thumbnail
        }
      },
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } });
          return null;
        },
        addLike: (_, { character }, { cache }) => {
          cache.writeData({ data: { likedCharacter: character } });
          return null;
        },
        toggleLikedCharacter: (_, { character }, { cache }) => {
          character.__typename = "Character"; // must give typename (required by Apollo client)

          const query = gql`
            query GetLikedCharacters {
              likedCharacters @client {
                id
                name
                thumbnail
              }
            }
          `;
          const current = cache.readQuery({ query });

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
            likedCharacters
          };

          // you can also do cache.writeData({ data }) here if you prefer
          cache.writeQuery({ query, data });

          return data;
        },
        toggleSaveCharacterTimeline: (_, { character }, { cache }) => {
          console.log("TOGGLE > CHARACTER:");
          console.log(character);

          character.__typename = "Character"; // must give typename (required by Apollo client)

          // Query to fetch current data
          const query = gql`
            query GetSavedCharacterTimelines {
              savedCharacterTimelines @client {
                id
                name
                thumbnail
              }
            }
          `;

          // Execute the query
          const current = cache.readQuery({ query });

          // Prepare to edit the list
          let savedCharacterTimelines = current.savedCharacterTimelines;

          // Get the index of the incoming character in the list of current data
          const index = savedCharacterTimelines
            .map(item => item.id)
            .indexOf(character.id);

          // Either concat or splice the mutable variable prepared above
          if (index < 0) {
            savedCharacterTimelines = savedCharacterTimelines.concat([
              character
            ]);
          } else {
            savedCharacterTimelines.splice(index, 1);
          }

          // Data must a separate hash (cannot be inline in writeQuery)
          const data = {
            savedCharacterTimelines
          };

          console.log("TOGGLE > DATA:");
          console.log(data);

          cache.writeQuery({ query, data });

          return data;
        }
      }
    }
  }
});

// persistor.purge()
// persistor.remove()
// client.resetStore()
client.clearStore()

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
