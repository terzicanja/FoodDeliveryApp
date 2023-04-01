import React, { Fragment, useState, useRef } from 'react'
import { Button, TouchableOpacity, StyleSheet, Text, View, ScrollView } from "react-native";
import { useFirestoreQuery } from '../Custom Functions/Hooks';
import { where, query, collection, getFirestore, orderBy } from '@firebase/firestore';
import { auth } from '../../config/firebase-config';
import HistoryItem from './HistoryItem';




const OrdersHistoryScreen = ({ navigation }) => {

    const db = getFirestore();
    const OrdersRef = collection(db, "DeliveredOrders");
    const q = query(OrdersRef, where("user_id", "==", auth.currentUser.uid));
    const orders = useFirestoreQuery(q);
    const orders_output = orders.map((order) => <HistoryItem key={order.id} order_data={order} />)
    


  return (
    <Fragment>  
      <View style={styles.wrap} > 
    <ScrollView contentContainerStyle={styles.container}>
      
      <ScrollView contentContainerStyle={styles['restaurant_card']} >
      <View>  
      {orders != "" ?  <Text style={{fontWeight: "700", color: "#694fad", textAlign: "center",marginTop:20, marginBottom: 30,borderRadius: 20, backgroundColor: "white", width: 120, padding: 10, marginLeft: "auto", marginRight: "auto"}}>Orders History</Text> : null}
          </View>
        {orders_output}

      </ScrollView>
    </ScrollView>
    </View>
    </Fragment>
  )
     
}

export default OrdersHistoryScreen

const styles = StyleSheet.create({
  container: {
   
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  }, 
  wrap: { 
    flex: 1,    
   backgroundColor: "rgb(255, 211, 99)",
    height: "100%",
    width: "100%"
  }
}); 