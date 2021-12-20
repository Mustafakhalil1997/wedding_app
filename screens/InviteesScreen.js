import React, { useEffect, useMemo, useReducer, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InviteeList from "../components/InviteeList";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { setList } from "../store/actions/inviteeList";
import { InitializeFirebase } from "./../InitializeFirebase";
import Colors from "../constants/Colors";

InitializeFirebase();

const initialState = { list: [], loading: true };

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

  const [searchList, setSearchList] = useState(dummy_list);
  const [isLoading, setIsLoading] = useState(false);

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
    };
    dispatchState({ type: "setLoading", loading: true });
    loadList();
    // setSearchList(dummy_list); // doesn't work because await is not working above
  }, [dispatch]);

  const textChangeHandler = (value) => {
    console.log("value ", value);
    const newArray = state.list.filter((item) => {
      const name = item.name;
      const length = value.length;
      console.log("item in search ", value);
      const newItem = name.slice(0, length);
      console.log("newItem ", newItem);
      if (value.toLowerCase() === newItem.toLowerCase()) {
        console.log("equaallllllllll");
        return item;
      }
    });
    console.log(newArray);

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
