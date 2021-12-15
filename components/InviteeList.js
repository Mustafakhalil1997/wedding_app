import React, { useState } from "react";
import { FlatList, View, StyleSheet, TextInput } from "react-native";
import { useSelector } from "react-redux";

import InviteeItem from "./InviteeItem";

const InviteeList = (props) => {
  const { navigation, data, textChangeHandler } = props;

  const [nameInput, setNameInput] = useState("");

  const inputChangeHander = (value) => {
    console.log("value ", value);
    setNameInput(value);
    textChangeHandler(value);
  };

  const goToInvitee = (item) => {
    navigation.navigate({
      name: "inviteeDetails",
      params: {
        name: item,
      },
    });
  };
  let count = 1;

  const renderName = (itemData) => {
    console.log("rendering item ", count);
    count++;
    const { item } = itemData;
    return <InviteeItem item={item} onSelect={() => goToInvitee(item.name)} />;
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
      <View>
        <FlatList
          data={data}
          renderItem={renderName}
          // keyExtractor={(item, index) => index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    margin: 5,

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
