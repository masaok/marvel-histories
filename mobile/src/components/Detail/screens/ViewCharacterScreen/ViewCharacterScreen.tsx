/**
 * ViewCharacterScreen
 */

import * as React from "react";
import { Text, View, Image, TextInput, FlatList } from "react-native";

import styles from "./ViewCharacterScreen.styles";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import SubScreenHeader from "../../../shared/Headers/SubScreenHeader";

export interface Props {}

interface State {
  text: string;
  id: number | null;
}

export default class ViewCharacterScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "View Character",
    header: <SubScreenHeader />
  };
  _keyExtractor = item => item.id;
  constructor(props) {
    super(props);
    this.state = { text: "Stuff", id: null };
  }

  render() {
    return (
      <View>
        <Text>SearchScreen</Text>
      </View>
    );
  }

  // render() {
  //   return (
  //     <Query
  //       skip={this.state.id === null}
  //       variables={{ id: this.state.id }}
  //       query={gql`
  //         query heroFind($id: Int) {
  //           getCharacter(where: { id: $id }) {
  //             id
  //             name
  //             description
  //             thumbnail
  //             comics {
  //               name
  //             }
  //           }
  //         }
  //       `}
  //     >
  //       {({ loading, data, error }) => {
  //         if (loading || error || !data) {
  //           return (
  //             <View style={styles.container}>
  //               <Text>Loading...</Text>
  //             </View>
  //           );
  //         }
  //         return (
  //           <View>
  //             <Text> Insert Character Name Below</Text>
  //             <TextInput
  //               style={{ height: 100, borderColor: "gray", borderWidth: 1 }}
  //               onChangeText={text => this.setState({ text })}
  //               value={this.state.text}
  //               onSubmitEditing={() => {
  //                 this.setState({ id: +this.state.text });
  //               }}
  //             />
  //             <FlatList
  //               data={[data.getCharacter]}
  //               keyExtractor={this._keyExtractor}
  //               renderItem={({ item }) => {
  //                 return (
  //                   <View
  //                     style={{ flexDirection: "row", alignItems: "center" }}
  //                   >
  //                     <Image
  //                       style={{ width: 50, height: 50 }}
  //                       source={{ uri: item.thumbnail }}
  //                     />
  //                     <Text>{item.name}</Text>
  //                     <Text>{item.description}</Text>
  //                   </View>
  //                 );
  //               }}
  //             />
  //           </View>
  //         );
  //       }}
  //     </Query>
  //   );
  // }
}
