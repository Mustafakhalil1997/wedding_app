import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Ionicons, Zocial } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const TableItem = ({ navigation, item }) => {
  const { id, number, ispriority, full, listPeople } = item;

  const navigateToTable = () => {
    navigation.navigate({
      name: "table",
      params: {
        tableItem: item,
        tableNumber: number,
      },
      // id: id,
      // number: number,
      // isPriority: ispriority,
      // full: full,
      // listPeople: listPeople
    });
  };

  return (
    <View style={styles.gridItem}>
      <TouchableNativeFeedback onPress={navigateToTable}>
        <View style={styles.container}>
          {/* <Zocial name={"opentable"} size={120} color={"green"} /> */}
          <Text style={styles.tableNumber}>Table {number}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 0.5,
    height: 163,
    marginVertical: 10,
    borderColor: "black",
    marginHorizontal: 5,
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 90,
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#09FF00",
    justifyContent: "center",
  },
  tableNumber: {
    fontFamily: "open-sans",
    fontSize: 32,
    color: Colors.accentColor,
  },
});

export default TableItem;
