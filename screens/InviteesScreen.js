import React from "react";
import { View, Text, StyleSheet } from "react-native";
import InviteeList from "../components/InviteeList";

const InviteesScreen = ({ navigation }) => {
  return <InviteeList navigation={navigation} />;
};

export default InviteesScreen;
