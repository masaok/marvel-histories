import * as React from "react";
import {
  Text,
  View,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  Image,
  ImageSourcePropType
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
  character: {
    id: number
    thumbnail: string
  };
}

interface State { }

export default class CharacterBadge extends React.Component<Props, State> {
  render() {
    const {
      character
    } = this.props;
    return (
      <Image
        key={character.id}
        style={styles.thumbnail}
        source={{ uri: character.thumbnail }}
      />
    )
  }
}
