import { StyleSheet, TextStyle, ViewStyle, TextStyleIOS } from 'react-native';

import componentStyles from '../component.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50
  },
  row: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5
  },
  list: {
    alignSelf: "stretch",
    marginLeft: 5,
    marginRight: 5
  },
  name: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  }
});

export default Object.assign(componentStyles, styles);