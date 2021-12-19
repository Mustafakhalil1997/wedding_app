import React, { useState } from "react";
import { useSelector } from "react-redux";
import InviteeList from "../components/InviteeList";
import { View, Text, ActivityIndicator } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CheckinsScreen = (props) => {
  const { navigation, route } = props;

  const inviteeList = useSelector((state) => state.inviteeList.inviteeList);

  const checkInList = [];

  inviteeList.map((item) => {
    if (item.checkIn) checkInList.push(item);
  });

  const textChangeHandler = () => {};

  // if (isLoading) {
  //   console.log("isLoadinggg ", isLoading);
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color={Colors.primaryColor} />
  //       <Text>isLoading</Text>
  //     </View>
  //   );
  // }

  return (
    <React.Fragment>
      {checkInList && (
        <InviteeList
          navigation={navigation}
          textChangeHandler={textChangeHandler}
          data={checkInList}
        />
      )}
      {!checkInList && (
        <View>
          <Text>No CheckIns yet</Text>
        </View>
      )}
    </React.Fragment>
  );
};

export default CheckinsScreen;
