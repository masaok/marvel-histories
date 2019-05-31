import { StyleSheet, TextStyle, ViewStyle, TextStyleIOS } from 'react-native';

export default StyleSheet.create({
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
    marginLeft: 5,
    marginRight: "auto"
  },
  thumbnail: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },

  // Home, Browse
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  listRowSlot: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 5,
  },
});
