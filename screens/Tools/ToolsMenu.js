
import React, { Fragment, useEffect, useState } from 'react'
import { StyleSheet, View  } from "react-native";
import AddAdmin from './AdminActions/AddAdmin';
import AddRestaurant from './RestaurantActions/AddRestaurant';
import EditRestaurant from './RestaurantActions/EditRestaurant';
import AddToMenu from './RestaurantActions/AddToMenu';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDoc, doc, getFirestore } from '@firebase/firestore';
import { auth } from '../../config/firebase-config';

const ToolsMenu = ({ navigation }) => {


  const [userType, setuserType] = useState("user"); 

  const db  = getFirestore();
  
  const checkUserType =  async ()  =>{
  
    try {
      const user = await getDoc(doc(db,"Users",auth.currentUser.uid)); 
      const usertype = await user.data(); 
      setuserType(usertype.user); 
      
    } catch (error) {
      
    }
  
  }

useEffect(() => {
  checkUserType(); 
}, [])


  const Stack = createNativeStackNavigator();

  return (
    <Fragment>
      <View style={styles.container}>

       {userType == 'admin' ? <AddAdmin navigation={navigation} /> : null }
       {userType == 'admin' ? <AddRestaurant navigation={navigation} /> : null }
        <AddToMenu navigation={navigation} />
        <EditRestaurant navigation={navigation} />
        
      </View>
    </Fragment>
  )
}

export default ToolsMenu

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 211, 99)",
    height: "100%",
    width: "100%"
  }
}); 