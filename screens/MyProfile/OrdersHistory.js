import React from 'react'
import { StyleSheet, Text,TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faClockRotateLeft} from '@fortawesome/free-solid-svg-icons';

const OrderHistory = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("OrdersHistoryScreen")} >



<Text style={styles.text}><FontAwesomeIcon style={{color: "orange"}} icon={faClockRotateLeft} /> Delivered Orders</Text>

    </TouchableOpacity>
  )
}

export default OrderHistory



const styles = StyleSheet.create({
    card: {
      top: 80,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      alignContent: "center",
      justifyContent: "center",
      overflow: "hidden",
      height: 70,
      backgroundColor: "white",
      textAlign: "center",
      marginVertical: 10,
      
  
    },
  icon: { 
    transform: [{scale: 1.2}],
    color: "orange",
    marginRight: 5
    
  }, 
  text: { 
  fontWeight: "600",
  fontSize: 15

  }
  
  });