import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import HomeScreen from "../components/Main/screens/HomeScreen";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <HomeScreen />
      </ApolloProvider>
    );
  }
}
