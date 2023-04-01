
import React, { Fragment, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Animated, TouchableOpacity } from "react-native";
import MenuItem from './MenuItem';
import RestaurantInfo from './RestaurantInfo';
import { collection, getFirestore,addDoc, serverTimestamp, getDoc, doc } from '@firebase/firestore';
import { async } from '@firebase/util';
import { auth } from '../../config/firebase-config';

const RestaurantSingle = ({route , navigation}) => {

  const db = getFirestore(); 
  


  
const restaurant_data = route.params.restaurant_data; 

   const  { id, restaurant_adress, restaurant_menu, restaurant_name  }  =  restaurant_data; 
   const [Orders_container, setOrders_container] = useState([]); 
   let menu = null; 

if(!restaurant_menu == null || !restaurant_menu == "") {    

   const objArray = [];
   Object.keys(restaurant_menu).forEach(key => objArray.push({
      id: key, 
      food : restaurant_menu[key]
     
   }));

    menu = objArray.map((item)=> <MenuItem setOrders_container={setOrders_container} restaurant_name={restaurant_name}  key={Math.random()} item={item} restaurant_id={id} />  ); 
  }

const handleOrder = async () =>{ 
  const OrdersRef = collection(db, "Orders"); 


  const user = await getDoc(doc(db, "Users", auth.currentUser.uid));
      const user_data = user.data();

try {
  
  const response = await addDoc(OrdersRef, {   
    user_id: auth.currentUser.uid,
    first_name: user_data.first_name,
    last_name: user_data.last_name,
    adress: user_data.adress,
    phone: user_data.phone,
    restaurant_id: id,
    restaurant_name: restaurant_name,
    ordered: serverTimestamp() ,
    ordered_food: Orders_container 
  }); 
setOrders_container([]);
} catch (error) {

  
}



}
  return (

    <Fragment>
         <View style={styles.container}> 
        
     
        
          <ScrollView style={styles['restaurant_card']} > 

          <RestaurantInfo restaurant_data={restaurant_data} />
                    
          { menu && menu}

          </ScrollView>
        
{ Orders_container.length>0 ?  <View style={styles.cart}> 
 <Text style={{width: "100%", textAlign: "center"}}>{Orders_container.length} {Orders_container.length>1 ? "items" : "item"} in cart. Do you want to  procced?</Text> 
  
<TouchableOpacity style={styles.order} onPress={handleOrder} ><Text style={{color: "white", padding: 2}}>Order</Text></TouchableOpacity> 
 <TouchableOpacity style={styles.cancel} onPress={()=>setOrders_container([])}   ><Text style={{color: "white", padding: 2}}>Cancel</Text></TouchableOpacity> 
 
 </View>: null}
    </View> 

    </Fragment>
  )
}

export default React.memo(RestaurantSingle)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(255, 211, 99)",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    "restaurant_card": { 
      position: "relative",
      width: "100%",
       bottom: 0,
       top: 0,
       
    }, 
    restaurant :{ 
      backgroundColor: "white", 
     top: 0,
     height: 100,
      color: "white",
    }, 
    cart: {
      position: "absolute", 
      bottom: 10, 
      width: "95%", 
      height: 55, 
      backgroundColor: "white", 
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent:  "center",
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: "center",
      
    }, 
    order:{
      marginHorizontal: 10,
      paddingHorizontal: 10,
      paddingVertical: 2,
      backgroundColor: "green",
      color: "white",
      borderRadius: 10
    }, 
    cancel: { 
      marginHorizontal: 10,
      paddingHorizontal: 8,
      paddingVertical: 2,
      backgroundColor: "red", 
      color: "white",
      borderRadius: 10

    }
  
  }); 