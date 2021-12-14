import React, { useState } from "react";
import { useSelector } from "react-redux";
import InviteeList from "../components/InviteeList";
import { View, Text } from "react-native";

const CheckinsScreen = (props) => {
  const { navigation, route } = props;

  const inviteeList = useSelector((state) => state.inviteeList.inviteeList);

  const [CheckinList, setCheckinList] = useState();

  const textChangeHandler = () => {};

  return (
    <React.Fragment>
      {CheckinList && (
        <InviteeList
          navigation={navigation}
          textChangeHandler={textChangeHandler}
          data={searchList}
        />
      )}
      {!CheckinList && (
        <View>
          <Text>No CheckIns yet</Text>
        </View>
      )}
    </React.Fragment>
  );
};

export default CheckinsScreen;
