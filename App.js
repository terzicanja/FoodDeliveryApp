
import { Fragment, useState } from "react";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Authentication/Login";
import Register from "./screens/Authentication/Register";
import Main from "./screens/Main";
import { StatusBar } from "react-native";

import RestaurantSingle from "./screens/Restaurants/RestaurantSingle";
import { auth } from "./config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import OrderGroup from "./screens/Orders/OrderGroup";
export default function App() {

const [User, setUser] = useState(null); 

onAuthStateChanged(auth,(currentUser)=>
setUser(currentUser)
); 

  const Stack = createNativeStackNavigator();
  return (
    <Fragment>
      <StatusBar hidden />
      <NavigationContainer >




        <Stack.Navigator screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#694fad' },

        }}>



          {User != null ?

            <>
              <Stack.Screen name="Main" component={Main} options={{ headerLeft: () => null, headerShown: false }} />
              <Stack.Screen name="RestaurantSingle" component={RestaurantSingle} />
            
            </>
            :
            <>
             <Stack.Screen name="Login" component={Login} options={{ title: 'Sign in' }} />
              <Stack.Screen name="Register" component={Register} />
             
            </>
          }


        </Stack.Navigator>

      </NavigationContainer>

    </Fragment>
  );
}


