/**
 * MainScreenHeader
 */

import * as React from "react";
import { View } from "react-native";

import styles from "./MainScreenHeader.styles";
import Heading from "../../Content/Heading";
import BaseHeader from "../BaseHeader";
import { Icon } from "react-native-elements";
import { HeaderProps } from "react-navigation";
import { Colors } from "../../../../assets";

export interface Props extends HeaderProps {
  title: String
}

interface State { }

export default class MainScreenHeader extends React.Component<Props, State> {
  render() {
    // console.log("MAIN SCREEN HEADER > props:")
    // console.log(this.props.test)
    return (
      <BaseHeader
        backgroundColor={Colors.orange}
        // containerStyle={this.props.hideBottomBar && { borderBottomWidth: 0 }}
        leftComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="play-circle"
              type="font-awesome"
              color={Colors.white}
              containerStyle={{ marginRight: 4 }}
            />
            <Heading type={"h7"} color={Colors.white} bold>
              {this.props.title ? this.props.title : "Marvel Histories"}
            </Heading>
          </View>
        }
      />
    );
  }
}
