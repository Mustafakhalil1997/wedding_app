export const SET_LIST = "SET_LIST";
export const ADD_LIST = "ADD_LIST";

export const addList = (list) => {
  return (dispatch) => {
    // any async code you want!
    // fetch();
    dispatch({ type: ADD_LIST, inviteeList: list });
  };
};

export const setList = (list) => {
  return { type: SET_LIST, inviteeList: list };
};
