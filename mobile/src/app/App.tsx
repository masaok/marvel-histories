import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import HomeScreen from '../components/Main/screens/HomeScreen';
import SearchScreen from '../components/Main/screens/SearchScreen';
import ViewCharacterScreen from '../components/Detail/screens/ViewCharacterScreen';
import ViewComicScreen from '../components/Detail/screens/ViewComicScreen';
import ViewSeriesScreen from '../components/Detail/screens/ViewSeriesScreen';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <HomeScreen />
        {/* <SearchScreen />
        <ViewCharacterScreen />
        <ViewComicScreen />
        <ViewSeriesScreen /> */}
      </ApolloProvider>
    );
  }
}
