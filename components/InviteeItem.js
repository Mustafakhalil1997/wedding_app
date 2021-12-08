import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import CheckinButton from "./CheckinButton";

const InviteeItem = (props) => {
  const { item, onSelect } = props;

  //should be retrieved from redux store, after integrating with database
  const [isCheckedin, setIsCheckedin] = useState(false);

  const checkinInvitee = () => {
    // update in the database
    setIsCheckedin(true);
  };

  return (
    <View>
      <View style={styles.itemContainer}>
        <TouchableNativeFeedback onPress={onSelect}>
          <View style={styles.inviteeItem}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameLabel}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </View>

            <View>
              <View style={styles.tableNumberContainer}>
                <Text style={styles.tableLabel}>Table 3</Text>
              </View>
              <CheckinButton
                styles={{ fontSize: 16 }}
                isCheckedin={isCheckedin}
                checkinInvitee={checkinInvitee}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    margin: 5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    // borderColor: "pink",
    // borderWidth: 0.5,
  },
  inviteeItem: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",

    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  nameContainer: {
    fontFamily: "open-sans",
  },
  nameLabel: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  tableNumberContainer: {
    alignItems: "center",
  },
  tableLabel: {
    fontSize: 13,
    fontFamily: "open-sans",
  },
});

export default InviteeItem;
