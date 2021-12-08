import React from "react";
import { View, Text } from "react-native";
import TablesList from "../components/TablesList";

const TablesScreen = (props) => {
  const { navigation } = props;

  return <TablesList navigation={navigation} />;
};

export default TablesScreen;
