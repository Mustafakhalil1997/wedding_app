import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";

const data = [
  { label: "Table 1", value: "1" },
  { label: "Table 2", value: "2" },
  { label: "Table 3", value: "3" },
  { label: "Table 4", value: "4" },
  { label: "Table 5", value: "5" },
  { label: "Table 6", value: "6" },
  { label: "Table 7", value: "7" },
  { label: "Table 8", value: "8" },
];

const DropDown = (_props) => {
  const [dropdown, setDropdown] = useState(null);
  const [selected, setSelected] = useState([]);

  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        <View style={styles.availableContainer}>
          <Text style={styles.availableText}>Available</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.shadow}
        data={data}
        // search
        // searchPlaceholder="Search"
        labelField="label"
        valueField="value"
        // label="Dropdown"
        placeholder="Table no."
        value={dropdown}
        onChange={(item) => {
          setDropdown(item.value);
          console.log("selected", item);
        }}
        renderItem={(item) => _renderItem(item)}
        textError="Error"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dropdown: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  availableContainer: {
    marginHorizontal: 10,
  },
  availableText: {
    fontSize: 14,
    color: "green",
  },
});

export default DropDown;
