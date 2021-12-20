import React, { useMemo, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import InviteeList from "../components/InviteeList";
import { View, Text, ActivityIndicator } from "react-native";

const initialState = { list: [], loading: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "setList":
      return {
        ...state,
        list: action.list,
      };
    case "setLoading":
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

const CheckinsScreen = (props) => {
  const { navigation, route } = props;

  const inviteeList = useSelector((state) => state.inviteeList.inviteeList);

  // const checkInList = [];

  // inviteeList.map((item) => {
  //   if (item.checkIn) checkInList.push(item);
  // });

  const checkInList = useMemo(() => {
    return inviteeList.filter((item) => {
      return item.checkIn;
    });
  }, [inviteeList]);

  const [searchList, setSearchList] = useState(checkInList);
  const [state, dispatchState] = useReducer(reducer, initialState);

  if (checkInList !== state.list) {
    // had to do this check because dispatch is not asynchronous and useEffect can't wait for it to finish to set the searchList.
    setSearchList(checkInList);
    dispatchState({ type: "setList", list: checkInList });
  }

  const textChangeHandler = (value) => {
    const newArray = state.list.filter((item) => {
      const name = item.name;
      const length = value.length;
      const newItem = name.slice(0, length);
      if (value.toLowerCase() === newItem.toLowerCase()) {
        return item;
      }
    });
    setSearchList(newArray);
  };

  return (
    <React.Fragment>
      {checkInList && (
        <InviteeList
          navigation={navigation}
          textChangeHandler={textChangeHandler}
          data={searchList}
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
