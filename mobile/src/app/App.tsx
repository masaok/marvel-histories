import React from 'react';
import { View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import HomeScreen from '../components/Main/screens/HomeScreen';
import SearchScreen from '../components/Main/screens/SearchScreen';
import ViewCharacterScreen from '../components/Detail/screens/ViewCharacterScreen';
import ViewComicScreen from '../components/Detail/screens/ViewComicScreen';
import ViewSeriesScreen from '../components/Detail/screens/ViewSeriesScreen';
import { AppContainer } from './router';
import { NavigationContainerComponent } from 'react-navigation';
import NavigationService from '../services/NavigationService';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <AppContainer
            navigationOptions={{ header: null, headerMode: 'screen' }}
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
