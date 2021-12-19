import React, { useRef, useState } from "react";
import { FlatList, View, StyleSheet, TextInput } from "react-native";
import { useSelector } from "react-redux";

import InviteeItem from "./InviteeItem";

const InviteeList = (props) => {
  const { navigation, data, textChangeHandler } = props;

  const [nameInput, setNameInput] = useState("");

  const inputChangeHander = (value) => {
    setNameInput(value);
    textChangeHandler(value);
  };

  let count = 1;

  const renderName = (itemData) => {
    count++;
    const { item } = itemData;
    return <InviteeItem item={item} navigation={navigation} />;
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.textInput}>
        <TextInput
          keyboardType="default"
          placeholder="Search here.."
          value={nameInput}
          onChangeText={inputChangeHander}
        />
      </View>
      {/* <View> */}
      <FlatList
        data={data}
        renderItem={renderName}
        // keyExtractor={(item, index) => index}
      />
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    marginHorizontal: 7,
    flex: 1,

    // backgroundColor: Colors.primaryColor,
  },

  loadingIndicator: {
    // paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  textInput: {
    // marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
    // borderBottomRightRadius: 10,
  },
});

export default InviteeList;
