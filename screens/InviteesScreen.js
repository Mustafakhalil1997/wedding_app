import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import InviteeList from "../components/InviteeList";

const InviteesScreen = ({ navigation }) => {
  const dummy_list = useSelector((state) => state.inviteeList.inviteeList);

  const [inviteeList, setInviteeList] = useState(dummy_list);
  const [searchList, setSearchList] = useState(dummy_list);

  const textChangeHandler = (value) => {
    console.log("value ", value);
    const newArray = inviteeList.filter((item) => {
      const length = value.length;
      console.log("item in search ", value);
      const newItem = item.slice(0, length);
      console.log("newItem ", newItem);
      if (value.toLowerCase() === newItem.toLowerCase()) return item;
    });
    setSearchList(newArray);
  };

  return (
    <InviteeList
      navigation={navigation}
      textChangeHandler={textChangeHandler}
      data={searchList}
    />
  );
};

export default InviteesScreen;
