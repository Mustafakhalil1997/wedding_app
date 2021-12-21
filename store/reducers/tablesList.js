import { SET_TABLES } from "./../actions/tablesList";

const initialState = {
  tableList: [],
};

const tableListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLES:
      return {
        ...state,
        tableList: action.tableList,
      };
  }
  return state;
};

export default tableListReducer;
