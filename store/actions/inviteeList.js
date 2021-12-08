export const ADD_LIST = "ADD_LIST";

export const addList = (list) => {
  return (dispatch) => {
    // any async code you want!
    // fetch();
    dispatch({ type: ADD_LIST, inviteeList: list });
  };
};
