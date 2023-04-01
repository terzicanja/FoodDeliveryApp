import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const AddAdmin = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("AddAdminScreen")} >


<FontAwesomeIcon icon={faUserPlus} style={styles.icon} /> 
<Text style={styles.text}>Add Admin</Text>

    </TouchableOpacity>
  )
}

export default AddAdmin



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
      marginVertical: 10
  
    },
  icon: { 
    transform: [{scale: 1.2}],
    marginRight: 20,
    color: "green"
    
  }, 
  text: { 
  fontWeight: "600",
  fontSize: 15

  }
  
  });