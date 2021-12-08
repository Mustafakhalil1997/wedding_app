import React, { version } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import Colors from "../constants/Colors";

const CheckinButton = (props) => {
  const { isCheckedin, checkinInvitee } = props;

  const Touchablecmp = TouchableOpacity;
  if (Platform.OS === "android" && version > 21) {
    Touchablecmp = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.buttonContainer }}>
      {!isCheckedin && (
        <Touchablecmp onPress={checkinInvitee}>
          <View style={styles.button}>
            <Text
              color={Colors.accentColor}
              style={{ ...styles.textButton, ...props.styles }}
            >
              Check in
            </Text>
          </View>
        </Touchablecmp>
      )}
      {isCheckedin && (
        <View style={styles.checkedinContainer}>
          <Text style={{ ...styles.checkedinText, ...props.styles }}>
            Checked in
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    // backgroundColor: "pink",
  },
  button: {
    borderRadius: 15,
    backgroundColor: Colors.accentColor,
    padding: 5,
    paddingHorizontal: 20,
  },
  textButton: {
    fontSize: 26,
    fontFamily: "open-sans",
  },
  checkedinContainer: {
    padding: 5,
  },
  checkedinText: {
    fontSize: 26,
    fontFamily: "open-sans-bold",
    color: "green",
  },
});

export default CheckinButton;
