import Invitee from "./../../models/invitee";
import { InitializeFirebase } from "./../../InitializeFirebase";
import { getDatabase, ref, onValue } from "firebase/database";
export const SET_LIST = "SET_LIST";
export const SET_TABLES = "SET_TABLES";
export const SET_INVITEE = "SET_INVITEE";

InitializeFirebase();

export const addList = (list) => {
  return (dispatch) => {
    // any async code you want!
    // fetch();
    dispatch({ type: ADD_LIST, inviteeList: list });
  };
};

export const setInvitee = (itemId) => {
  return async (dispatch) => {
    const db = getDatabase();
    const itemRef = ref(db, "invitees/" + itemId);
    onValue(itemRef, (snapshot) => {
      dispatch({ type: SET_INVITEE, inviteeId: itemId });
    });
  };
};

export const setList = () => {
  return async (dispatch) => {
    const db = getDatabase();
    const listRef = ref(db, "invitees");

    onValue(listRef, async (snapshot) => {
      const resData = await snapshot.val();
      let loadedInvitees = [];
      for (const key in resData) {
        const name = resData[key].name;
        const isPriority = resData[key].ispriority;
        const checkIn = resData[key].checkin;
        let image = null;
        if (resData[key].image) {
          image = resData[key].image;
        }
        loadedInvitees.push(new Invitee(key, name, isPriority, checkIn, image));
      }
      console.log("falsyyyyyy");
      // console.log("loadedInvitees ", loadedInvitees);
      dispatch({ type: SET_LIST, inviteeList: loadedInvitees });
    });

    // const response = await fetch(
    //   "https://weddingproject2-ce55f-default-rtdb.firebaseio.com/invitees.json"
    // );
    // const resData = await response.json();
    // const loadedInvitees = [];
    // for (const key in resData) {
    //   const name = resData[key].name;
    //   const isPriority = resData[key].ispriority;
    //   const checkIn = resData[key].checkin;
    //   loadedInvitees.push(new Invitee(key, name, isPriority, checkIn));
    // }
    // dispatch({ type: SET_LIST, inviteeList: loadedInvitees });
  };
};

export const setTables = () => {
  return async (dispatch) => {
    dispatch({ type: SET_TABLES, tableList: [] });
  };
};
