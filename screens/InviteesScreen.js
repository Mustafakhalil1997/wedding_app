import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InviteeList from "../components/InviteeList";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { setList } from "../store/actions/inviteeList";
import { InitializeFirebase } from "./../InitializeFirebase";

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

const InviteesScreen = ({ navigation }) => {
  const dummy_list = useSelector((state) => state.inviteeList.inviteeList);
  // console.log("dummy_list ", dummy_list);
  const [inviteeList, setInviteeList] = useState(dummy_list);
  const [searchList, setSearchList] = useState(dummy_list);
  // console.log("searchList ", searchList);

  const dispatch = useDispatch();

  useEffect(() => {
    // const db = getDatabase();
    // const list = ref(db, "invitees");
    dispatch(setList());
    setSearchList(dummy_list);
  }, [dispatch]);

  // onValue(list, (snapshot) => {
  //   console.log("onValue is here");
  //   const data = snapshot.val();
  //   // console.log("data ", data);
  //   // console.log("dataaa", data[Object.keys(data)[1]]);
  //   // console.log(Object.keys(data).length);
  //   if (JSON.stringify(data) !== JSON.stringify(searchList)) {
  //     console.log("hello");
  //     setSearchList(data);
  //     dispatch(setList(data));
  //   }
  // });

  const textChangeHandler = (value) => {
    console.log("value ", value);
    const newArray = inviteeList.filter((item) => {
      const length = value.length;
      console.log("item in search ", value);
      const newItem = item.slice(0, length);
      console.log("newItem ", newItem);
      if (value.toLowerCase() === newItem.toLowerCase()) return item;
    });

    setSearchList(newArray);
  };

  return (
    <InviteeList
      navigation={navigation}
      textChangeHandler={textChangeHandler}
      data={dummy_list}
    />
  );
};

export default InviteesScreen;
