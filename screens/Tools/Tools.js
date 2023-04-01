
import React, { Fragment } from 'react'
import { StyleSheet, Text, View, Image } from "react-native";


import ToolsMenu from './ToolsMenu';
import AddAdminScreen from './AdminActions/AddAdminScreen'
import AddRestaurantScreen from './RestaurantActions/AddRestaurantScreen';
import AddMenuScreen from './RestaurantActions/AddMenuScreen';
import ShowMyRestaurants from '../Restaurants/ShowMyRestaurants';
import EditRestaurantScreen from './RestaurantActions/EditRestaurantScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Tools = ({ navigation }) => {


  const Stack = createNativeStackNavigator();

  return (
    <Fragment>


      <Stack.Navigator screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#694fad' },


      }}>
        <Stack.Screen name="ToolsMenu"  component={ToolsMenu} options={{ headerLeft: () => null, headerShown: false }} />
        <Stack.Screen name="AddAdminScreen" component={AddAdminScreen} options={{ headerLeft: () => null, headerShown: false }} />
        <Stack.Screen name="AddRestaurantScreen" component={AddRestaurantScreen}  />
        <Stack.Screen name="AddMenuScreen" component={AddMenuScreen}  />
        <Stack.Screen name="EditRestaurantScreen" component={EditRestaurantScreen} />
        <Stack.Screen name="ShowMyRestaurants" component={ShowMyRestaurants} options={{ headerLeft: () => null, headerShown: false }} />
      </Stack.Navigator>


    </Fragment>
  )
}

export default Tools

