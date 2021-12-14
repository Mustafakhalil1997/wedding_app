import "react-native-gesture-handler";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { enableScreens } from "react-native-screens";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import Colors from "./constants/Colors";
import InviteesScreen from "./screens/InviteesScreen";
import inviteeDetailScreen from "./screens/InviteeDetailScreen";
import TablesScreen from "./screens/TablesScreen";
import inviteeListReducer from "./store/reducers/InviteeList";
import TableDetailScreen from "./screens/TableDetailScreen";
import CustomHeaderButton from "./components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CheckinsScreen from "./screens/CheckinsScreen";

enableScreens();

const rootReducer = combineReducers({
  inviteeList: inviteeListReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  // useEffect(() => {
  //   const fetchInvitees = async () => {
  //     console.log("this is");
  //     try {
  //       const response = await fetch(
  //         "https://weddingproject2-ce55f-default-rtdb.firebaseio.com/invitees.json"
  //       );
  //       if (response.ok) {
  //         const values = await response.json();
  //         console.log("values ", values);
  //         console.log(values["akhalil"]);
  //       }
  //     } catch (error) {
  //       console.log("error ", error);
  //     }
  //   };
  //   fetchInvitees();
  // }, []);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const ListStackNavigator = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="inviteesList"
          component={InviteesScreen}
          options={({ route, navigation }) => ({
            title: "Invitee List",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <Stack.Screen
          name="inviteeDetails"
          component={inviteeDetailScreen}
          options={{
            title: "Invitee Details",
          }}
        />
      </Stack.Navigator>
    );
  };

  const TableStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="tables"
          component={TablesScreen}
          options={({ navigation }) => ({
            title: "Tables",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName="ios-menu"
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <Stack.Screen
          name="table"
          component={TableDetailScreen}
          options={{
            title: "Table Number",
          }}
        />
      </Stack.Navigator>
    );
  };

  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: Colors.accentColor,
          tabBarItemStyle: {
            fontSize: 25,
          },
          tabBarStyle: {
            fontSize: 20,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "listTab") {
              iconName = focused ? "checkbox" : "checkbox-outline";
            } else if (route.name === "tablesTab") {
              iconName = focused ? "grid-sharp" : "grid-outline";
            }
            return <Ionicons name={iconName} size={25} color={"red"} />;
          },
        })}
      >
        <Tab.Screen
          name="listTab"
          component={ListStackNavigator}
          options={{
            title: "Invitee List",
          }}
        />
        <Tab.Screen
          name="tablesTab"
          component={TableStackNavigator}
          options={{
            title: "Tables",
          }}
        />
      </Tab.Navigator>
    );
  };

  const CheckInsStackNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="CheckIns" component={CheckinsScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              drawerActiveTintColor: Colors.accentColor,
              drawerLabelStyle: {
                fontFamily: "open-sans-bold",
              },
            }}
          >
            <Drawer.Screen
              name="MainList"
              component={TabNavigator}
              options={{
                drawerLabel: "MainList",
              }}
            />
            <Drawer.Screen
              name="Check-ins"
              component={CheckInsStackNavigator}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
