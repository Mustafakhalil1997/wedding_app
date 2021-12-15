import { SET_LIST } from "./../actions/inviteeList";
import Invitee from "./../../models/invitee";
// when i change this to getting data from the database,
// capitalize first letter of each word when you store it
// store it in ascending order

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
  }
  return state;
};

export default inviteeListReducer;
