import React, { Fragment } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import ToolsMenu from "./ToolsMenu";
import AddAdminScreen from "./AdminActions/AddAdminScreen";
import AddRestaurantScreen from "./RestaurantActions/AddRestaurantScreen";
import AddMenuScreen from "./RestaurantActions/AddMenuScreen";
import ShowMyRestaurants from "../Restaurants/ShowMyRestaurants";
import EditRestaurantScreen from "./RestaurantActions/EditRestaurantScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tools = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  return (
    <Fragment>
      <Stack.Navigator
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#694fad" },
        }}
      >
        <Stack.Screen
          name="ToolsMenu"
          component={ToolsMenu}
          options={{ headerLeft: () => null, headerShown: false }}
        />
        <Stack.Screen
          name="AddAdminScreen"
          component={AddAdminScreen}
          options={{ title: "Add admin" }}
        />
        <Stack.Screen
          name="AddRestaurantScreen"
          component={AddRestaurantScreen}
          options={{ title: "Add restaurant" }}
        />
        <Stack.Screen
          name="AddMenuScreen"
          component={AddMenuScreen}
          options={{ title: "Add menu" }}
        />
        <Stack.Screen
          name="EditRestaurantScreen"
          component={EditRestaurantScreen}
          options={{ title: "Edit restaurant" }}
        />
        <Stack.Screen name="ShowMyRestaurants" component={ShowMyRestaurants} />
      </Stack.Navigator>
    </Fragment>
  );
};

export default Tools;
