import React, { useEffect, useMemo, useReducer, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InviteeList from "../components/InviteeList";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { setList } from "../store/actions/inviteeList";
import { InitializeFirebase } from "./../InitializeFirebase";
import Colors from "../constants/Colors";

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAioK_0pdMEniIqmQ97K2HkmaaYWoSo8Wk",
//   authDomain: "weddingproject2-ce55f.firebaseapp.com",
//   databaseURL: "https://weddingproject2-ce55f-default-rtdb.firebaseio.com",
//   projectId: "weddingproject2-ce55f",
//   storageBucket: "weddingproject2-ce55f.appspot.com",
//   messagingSenderId: "917688119636",
//   appId: "1:917688119636:web:033e8eecfbb0b0699018c1",
//   measurementId: "G-N61VX498CT",
// };

// // // Initialize Firebase
// // // const app = initializeApp(firebaseConfig);
// // // const analytics = getAnalytics(app);
// initializeApp(firebaseConfig);

InitializeFirebase();

const initialState = { list: [], loading: true };

const reducer = (state, action) => {
  switch (action.type) {
    case "setList":
      return {
        list: action.list,
        loading: false,
      };
    case "setLoading":
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};

const InviteesScreen = ({ navigation }) => {
  const dummy_list = useSelector((state) => state.inviteeList.inviteeList);
  // console.log("dummy_list ", dummy_list);
  const [inviteeList, setInviteeList] = useState(dummy_list);
  const [searchList, setSearchList] = useState(dummy_list);
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatchState] = useReducer(reducer, initialState);

  if (dummy_list !== inviteeList) {
    // had to do this check because dispatch is not asynchronous and useEffect can't wait for it to finish to set the searchList
    setSearchList(dummy_list);
    setInviteeList(dummy_list);
    dispatchState({ type: "setList", list: dummy_list });
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const loadList = async () => {
      await dispatch(setList()); // await is not working and the code is still running asynchronously
    };
    loadList();
    // setSearchList(dummy_list); // doesn't work because await is not working above
  }, [dispatch]);

  const textChangeHandler = (value) => {
    console.log("value ", value);
    const newArray = inviteeList.filter((item) => {
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
    console.log("isLoading ", state.loading);
    return (
      <InviteeList
        navigation={navigation}
        textChangeHandler={textChangeHandler}
        data={state.list}
      />
    );
  }
};

export default InviteesScreen;
