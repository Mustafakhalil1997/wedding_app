import React, { useEffect, useState, version } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import CheckinButton from "../components/CheckinButton";
import DropDown from "../components/DropDown";
import ImgPicker from "../components/ImagePicker";
import Colors from "../constants/Colors";

const inviteeDetailScreen = (props) => {
  const { route } = props;
  const [hisName, sethisName] = useState("");

  // useEffect(() => {
  //   const fetchInvitees = async () => {
  //     console.log("this is");
  //     try {
  //       const response = await fetch(
  //         "https://weddingproject2-ce55f-default-rtdb.firebaseio.com/invitees.json"
  //       );
  //       if (response.ok) {
  //         const values = await response.json();
  //         console.log("values ", values);
  //         console.log(values["akhalil"]);
  //         sethisName(values["akhalil"].name);
  //       }
  //     } catch (error) {
  //       console.log("error ", error);
  //     }
  //   };
  //   fetchInvitees();
  // }, []);

  const name = route.params.name;
  console.log(name);
  const newName = name.charAt(0).toUpperCase() + name.slice(1);

  //should be retrieved from redux store, after integrating with database
  const [isCheckedin, setIsCheckedin] = useState(false);

  const checkinInvitee = () => {
    // update in the database
    setIsCheckedin(true);
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{newName}</Text>
        </View>

        <DropDown />

        {/* <View style={styles.textInput}>
          <TextInput
            maxLength={2}
            keyboardType="numeric"
            placeholder="Table no."
          />
        </View> */}
      </View>
      <View style={styles.imagePickerContainer}>
        <ImgPicker />
      </View>
      <View style={styles.submit}>
        <CheckinButton
          isCheckedin={isCheckedin}
          checkinInvitee={checkinInvitee}
        />
        <Text>{hisName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  details: { height: "30%" },
  imagePickerContainer: { height: "50%" },
  submit: { height: "10%", justifyContent: "flex-end" },

  container: {
    flex: 1,
    margin: 10,
    justifyContent: "flex-start",
  },
  nameContainer: {
    marginVertical: 10,
    alignItems: "center",
    // backgroundColor: "red",
    // borderWidth: 1,
    // shadowColor: "black",
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    // elevation: 5,
  },
  name: {
    fontFamily: "open-sans-bold",
    fontSize: 23,
    color: Colors.primaryColor,
    margin: 0,
    padding: 0,
  },

  textInput: {
    marginVertical: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

export default inviteeDetailScreen;
