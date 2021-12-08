import React, { useState } from "react";
import { FlatList, View, StyleSheet, TextInput } from "react-native";
import { useSelector } from "react-redux";

import InviteeItem from "./InviteeItem";

const InviteeList = (props) => {
  const { navigation } = props;

  const dummy_list = useSelector((state) => state.inviteeList.inviteeList);

  const [inviteeList, setInviteeList] = useState(dummy_list);
  const [searchList, setSearchList] = useState(dummy_list);

  const [nameInput, setNameInput] = useState("");

  const textChangeHandler = (value) => {
    setNameInput(value);

    const newArray = inviteeList.filter((item) => {
      const length = value.length;
      console.log("item in search ", value);
      const newItem = item.slice(0, length);
      console.log("newItem ", newItem);
      if (value.toLowerCase() === newItem.toLowerCase()) return item;
    });
    setSearchList(newArray);
  };

  const goToInvitee = (item) => {
    navigation.navigate({
      name: "inviteeDetails",
      params: {
        name: item,
      },
    });
  };

  const renderName = (itemData) => {
    const { item } = itemData;
    return <InviteeItem item={item} onSelect={() => goToInvitee(item)} />;
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.textInput}>
        <TextInput
          keyboardType="default"
          placeholder="Search here.."
          value={nameInput}
          onChangeText={textChangeHandler}
        />
      </View>
      <FlatList
        data={searchList}
        renderItem={renderName}
        keyExtractor={(item, index) => index}
      />
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
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    padding: 10,
    // borderBottomRightRadius: 10,
  },
});

export default InviteeList;
