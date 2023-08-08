import React, { Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "./MyProfile";
import OrdersHistoryScreen from "./OrdersHistoryScreen";
import EditProfileScreen from "./EditProfileScreen";

const OrdersStack = () => {
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
          name="MyProfile"
          component={MyProfile}
          options={{ headerLeft: () => null, headerShown: false }}
        />
        <Stack.Screen
          name="OrdersHistoryScreen"
          component={OrdersHistoryScreen}
          options={{ title: "Order history" }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ title: "Edit Profile" }}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default OrdersStack;
