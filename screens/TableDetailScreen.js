import React from "react";
import { View, StyleSheet } from "react-native";
import DefaultText from "../components/DefaultText";
import Colors from "../constants/Colors";

const TableDetailScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.tableItem}>
        <View style={styles.priorityContainer}>
          <DefaultText styles={styles.text}>
            Priority:{" "}
            <DefaultText styles={{ color: "green" }}>HIGH</DefaultText>
          </DefaultText>
        </View>
        <DefaultText styles={styles.text}>5 Chairs Left</DefaultText>
        <DefaultText styles={styles.text}>Full or not</DefaultText>
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
