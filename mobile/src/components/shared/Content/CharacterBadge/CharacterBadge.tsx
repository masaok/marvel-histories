import * as React from "react";
import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Image
} from "react-native";

import Scaled from "../../../../assets/Scaled";
import styles from "./CharacterBadge.styles";
import { Colors } from "../../../../assets";
import CharacterTimelineScreen from "../../../Timelines/screens/CharacterTimelineScreen";

export interface Props {
  family?: string;
  color?: string;
  alignment?: "auto" | "left" | "right" | "center" | "justify";
  bold?: boolean;
  opacity?: number;
  numLines?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  width?: number;
  character: any;
}

interface State { }

export default class CharacterBadge extends React.Component<Props, State> {
  render() {
    const {
      family,
      color,
      alignment,
      bold,
      opacity,
      numLines,
      onPress,
      disabled,
      style,
      width,
      character
    } = this.props;
    const text = (
      <Text
        style={[
          {
            fontFamily: family || "Avenir",
            color: color || Colors.orange,
            textAlign: alignment || "center",
            fontWeight: bold ? "bold" : "normal",
            opacity,
            width
          },
          disabled ? { color: Colors.grey, opacity: 0.7 } : {}
        ]}
        numberOfLines={numLines || 1}
      >
        {this.props.children}
      </Text>
    );
    // return (
    //   <TouchableOpacity
    //     onPress={onPress}
    //     disabled={disabled || !onPress}
    //     style={style}
    //   >
    //     {text}
    //   </TouchableOpacity>
    // );
    return (
      <Image
        key={character.id}
        style={styles.thumbnail}
        source={{ uri: character.thumbnail }}
      />
    )
  }
}
