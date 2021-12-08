import React from "react";
import { StyleSheet, Text } from "react-native";

const DefaultText = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.styles }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 24,
    margin: 7,
  },
});

export default DefaultText;
