import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import TableItem from "./TableItem";

const tables = ["1", "2", "3"];

const TablesList = ({ navigation }) => {
  const renderTable = () => {
    return <TableItem navigation={navigation} />;
  };

  return (
    <FlatList
      contentContainerStyle={{
        padding: 10,
        justifyContent: "space-between",
      }}
      data={tables}
      renderItem={renderTable}
      keyExtractor={(item, index) => index}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({});

export default TablesList;
