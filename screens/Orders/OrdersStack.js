
import React, { Fragment } from 'react'
import OrdersScreen from './OrdersScreen';
import OrderGroup from './OrderGroup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const OrdersStack = () => {


  const Stack = createNativeStackNavigator();

  return (
    <Fragment>


      <Stack.Navigator screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#694fad' },


      }}>
        <Stack.Screen name="OrdersScreen"  component={OrdersScreen} options={{ headerLeft: () => null, headerShown: false }} />
        <Stack.Screen name="OrderGroup" options={{title: "dsa"}} component={OrderGroup} />
      </Stack.Navigator>


    </Fragment>
  )
}

export default OrdersStack