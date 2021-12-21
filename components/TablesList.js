import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TableItem from "./TableItem";
import { setTableList } from "../store/actions/tablesList";
import Colors from "../constants/Colors";

const tables = ["1", "2", "3"];

const TablesList = ({ navigation }) => {
  const tableList = useSelector((state) => state.tableList.tableList);

  const [isLoading, setIsLoading] = useState(false);

  // console.log("tableList ", tableList);
  useEffect(() => {
    if (tableList) {
      setIsLoading(false);
    }
  }, [tableList]);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(setTableList());
  }, [dispatch]);

  const renderTable = ({ item }) => {
    return <TableItem navigation={navigation} item={item} />;
  };

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text>Loading</Text>
      </View>
    );

  return (
    <FlatList
      contentContainerStyle={{
        padding: 10,
        justifyContent: "space-between",
      }}
      data={tableList}
      renderItem={renderTable}
      // keyExtractor={(item, index) => index}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({});

export default TablesList;
