import { SET_INVITEE, SET_LIST } from "./../actions/inviteeList";
import Invitee from "./../../models/invitee";
// when i change this to getting data from the database,
// capitalize first letter of each word when you store it
// store it in ascending order

import update from "react-addons-update";

const dummy_list = [
  new Invitee("id", "my brother", true, false),
  new Invitee("id2", "someone", true, false),
];

const initialState = {
  inviteeList: dummy_list,
};

const inviteeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        inviteeList: action.inviteeList,
      };
    case SET_INVITEE:
      const inviteeId = action.inviteeId;
      const index = state.inviteeList.findIndex((item, index) => {
        console.log("inviteeId ", inviteeId, " item.id ", item.id);
        return item.id === inviteeId;
      });
      console.log("index ", index);
      const newList = [...state.inviteeList];
      newList[index].setCheckin();
      return {
        ...state,
        inviteeList: newList,
      };
  }
  return state;
};

export default inviteeListReducer;
