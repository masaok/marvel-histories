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
    backgroundColor: Colors.orange,
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },
  characterImageBox: {
    backgroundColor: Colors.lightOrange,
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    height: 250,
    width: 250
  },
  characterImage: {
    width: 200,
    height: 200
  },
  descriptionBox: {
    backgroundColor: Colors.lightOrange,
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000000",
    justifyContent: "center",
    width: 350,
    height: 150
  },
  description: {
    textAlign: "center"
  },
  comicListBox: {
    flex: 1,
    margin: 10
  },
  comicList: {
    backgroundColor: Colors.lightOrange,
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000000",
    margin: 10
  },
  comic: {
    margin: 10,
    width: 80,
    height: 120
  }
});
