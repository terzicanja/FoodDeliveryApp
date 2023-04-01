import React from 'react'
import { StyleSheet, Text,TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUtensils, faPlus } from '@fortawesome/free-solid-svg-icons';

const AddRestaurant = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("AddRestaurantScreen")} >


<FontAwesomeIcon icon={faUtensils} style={styles.icon} /> 
<Text style={styles.text}><FontAwesomeIcon style={{color: "orange"}} icon={faPlus} />  Add Restaurant</Text>

    </TouchableOpacity>
  )
}

export default AddRestaurant



const styles = StyleSheet.create({
    card: {
      top: 50,
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