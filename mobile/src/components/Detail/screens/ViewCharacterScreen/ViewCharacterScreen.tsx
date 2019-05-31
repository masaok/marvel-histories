/**
 * ViewCharacterScreen
 */

import * as React from "react";
import { Text, View, Image, TextInput, FlatList, Button } from "react-native";

import styles from "./ViewCharacterScreen.styles";

import { Query, QueryResult, compose, graphql } from "react-apollo";
import { gql } from "apollo-boost";
import SubScreenHeader from "../../../shared/Headers/SubScreenHeader";
import { NavigationScreenProp } from "react-navigation";
import NavigationService from "../../../../services/NavigationService";
import { Colors } from "../../../../assets";

export interface Props {
  navigation: NavigationScreenProp<{}>;
}

interface State {
  text: string;
  id: number | null;
  limit: number;
  offset: number;
}

export default class ViewCharacterScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: props => <SubScreenHeader title={"View Character"} {...props} />
  };
  _keyExtractor = item => item.id;
  constructor(props) {
    super(props);
    this.state = { text: "Thor", id: null, offset: 0, limit: 15 };
  }

  render() {
    const character = this.props.navigation.getParam("character");
    return (
      <Query
        skip={character.id === null}
        variables={{
          id: character.id,
          offset: this.state.offset,
          limit: this.state.limit
        }}
        query={gql`
          query comicFind($id: ID!, $offset: Int, $limit: Int) {
            comics(
              where: { characters: [$id] }
              offset: $offset
              limit: $limit
              orderBy: title_asc
            ) {
              id
              title
              thumbnail
            }
          }
        `}
      >
        {({ loading, data, error, fetchMore }: QueryResult) => {
          if (loading || error) {
            return (
              <View style={styles.container}>
                <Text>Loading...</Text>
              </View>
            );
          }
          return (
            <View style={styles.page}>
              <View style={styles.characterImageBox}>
                <Image
                  style={styles.characterImage}
                  source={{ uri: character.thumbnail }}
                />
              </View>
              <View style={styles.descriptionBox}>
                <Text style={styles.description}>{character.description}</Text>
              </View>
              <FlatList
                horizontal={false}
                numColumns={3}
                style={styles.comicListBox}
                data={data.comics}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0.01}
                onEndReached={() =>
                  fetchMore({
                    variables: {
                      offset: data.comics.length
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      if (!fetchMoreResult || fetchMoreResult.length === 0) {
                        return previousResult;
                      }
                      return {
                        comics: previousResult.comics.concat(
                          fetchMoreResult.comics
                        )
                      };
                    }
                  })
                }
                renderItem={({ item }) => {
                  return (
                    <View style={styles.comicList}>
                      <Image
                        style={styles.comic}
                        source={{ uri: item.thumbnail }}
                        resizeMode="contain"
                      />
                    </View>
                  );
                }}
              />
              <Button
                onPress={() => {
                  NavigationService.navigate("CharacterTimeline", {
                    character
                  });
                }}
                title="View Character Timeline"
                color={Colors.blue}
                accessibilityLabel="Learn more about this button"
              />
            </View>
          );
        }}
      </Query>
    );
  }
}
