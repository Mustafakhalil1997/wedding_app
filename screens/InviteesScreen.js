import React, { useEffect, useReducer, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { InitializeFirebase } from "./../InitializeFirebase";
import { setList } from "../store/actions/inviteeList";
import { setTableList } from "../store/actions/tablesList";

import InviteeList from "../components/InviteeList";
import Colors from "../constants/Colors";

InitializeFirebase();

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

const InviteesScreen = ({ navigation }) => {
  const dummy_list = useSelector((state) => state.inviteeList.inviteeList);

  console.log("dummy_list ", dummy_list);

  const [searchList, setSearchList] = useState(dummy_list);
  const [state, dispatchState] = useReducer(reducer, initialState);

  if (dummy_list !== state.list) {
    // had to do this check because dispatch is not asynchronous and useEffect can't wait for it to finish to set the searchList.
    setSearchList(dummy_list);
    dispatchState({ type: "setList", list: dummy_list });
  }

  console.log("searchList ");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatchState({ type: "setLoading", loading: false });
  }, [state.list]);

  useEffect(() => {
    const loadList = async () => {
      await dispatch(setList()); // await is not working and the code is still running asynchronously
      dispatch(setTableList());
    };
    dispatchState({ type: "setLoading", loading: true });
    loadList();
    // setSearchList(dummy_list); // doesn't work because await is not working above
  }, [dispatch]);

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

  if (state.loading) {
    console.log("isLoadinggg ", state.loading);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
        <Text>Loading</Text>
      </View>
    );
  } else {
    console.log("iSLoading ", state.loading);
    return (
      <InviteeList
        navigation={navigation}
        textChangeHandler={textChangeHandler}
        data={searchList}
      />
    );
  }
};

export default InviteesScreen;
