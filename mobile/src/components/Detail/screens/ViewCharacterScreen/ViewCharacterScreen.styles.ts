import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets";

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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  },
  page: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: Colors.orange,
    flex: 1
  },
  characterPortrait: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.orange,
    height: 300,
    width: 300
  },
  characterImage: {
    width: 200,
    height: 200
  }
});
