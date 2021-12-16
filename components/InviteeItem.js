import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import CheckinButton from "./CheckinButton";
import { InitializeFirebase } from "./../InitializeFirebase";
import { getDatabase, set, ref } from "firebase/database";
import { useDispatch } from "react-redux";

InitializeFirebase();

const InviteeItem = (props) => {
  const { item, navigation } = props;

  const { id, name, checkIn, isPriority } = item;
  console.log("checkin ", checkIn);

  const dispatchEvent = () => {};

  const updateCheckIn = () => {
    const db = getDatabase();
    set(ref(db, "invitees/" + id), {
      checkin: true,
      ispriority: isPriority,
      name: name,
    });
  };

  const checkinInvitee = () => {
    // update in the database
    updateCheckIn();
  };

  const goInviteeDetails = () => {
    navigation.navigate({
      name: "inviteeDetails",
      params: {
        invitee: item,
      },
    });
  };

  return (
    <View>
      <View style={styles.itemContainer}>
        <TouchableNativeFeedback onPress={goInviteeDetails}>
          <View style={styles.inviteeItem}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameLabel}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Text>
            </View>

            <View>
              <View style={styles.tableNumberContainer}>
                <Text style={styles.tableLabel}>Table 3</Text>
              </View>
              <CheckinButton
                styles={{ fontSize: 16 }}
                isCheckedin={checkIn}
                checkinInvitee={checkinInvitee}
                dispatchEvent={dispatchEvent}
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
    flex: 1,
    flexDirection: "row",
    // height: 60,
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
