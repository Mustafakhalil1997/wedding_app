import { InitializeFirebase } from "../../InitializeFirebase";
import Table from "./../../models/table";
import { getDatabase, onValue, ref } from "firebase/database";

export const SET_TABLES = "SET_TABLES";

InitializeFirebase();

export const setTableList = () => {
  return async (dispatch) => {
    const db = getDatabase();
    const tableRef = ref(db, "tables");

    onValue(tableRef, async (snapshot) => {
      const resData = await snapshot.val();
      let loadedTables = [];
      for (const key in resData) {
        const number = resData[key].number;
        const isPriority = resData[key].ispriority;
        const listPeople = resData[key].listPeople;
        const full = resData[key].full;

        loadedTables.push(new Table(key, number, isPriority, full, listPeople));
      }
      console.log("falsyyyyyy");
      // console.log("loadedInvitees ", loadedInvitees);
      dispatch({ type: SET_TABLES, tableList: loadedTables });
    });
  };
};
