import React, { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";
import Colors from "../constants/Colors";

const TableDetailScreen = ({ navigation, route }) => {
  const tableItem = route.params.tableItem;
  const { id, ispriority, full, listPeople } = tableItem;
  console.log("listPeople ", listPeople);
  return (
    <View style={styles.container}>
      <View style={styles.tableItem}>
        <View style={styles.priorityContainer}>
          <DefaultText styles={styles.text}>
            Priority:{" "}
            <DefaultText styles={{ color: "green" }}>
              {ispriority ? "HIGH" : "LOW"}
            </DefaultText>
          </DefaultText>
        </View>
        <DefaultText styles={styles.text}>
          {10 - listPeople.length} Chairs Left
        </DefaultText>
        <DefaultText styles={styles.text}>
          {full ? "Full" : "Empty"}
        </DefaultText>
      </View>
      <DefaultText styles={styles.text}>List of people sitting</DefaultText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  tableItem: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    height: 200,
    justifyContent: "center",
    marginTop: 10,
  },
  priorityContainer: {},
  text: {
    color: "black",
  },
});

export default TableDetailScreen;
