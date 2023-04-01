import React from 'react'
import { StyleSheet, Text, TouchableOpacity  } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil, faUtensils  } from '@fortawesome/free-solid-svg-icons';

const EditRestaurant = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.card}  onPress={()=> navigation.navigate("ShowMyRestaurants",{screen: "EditRestaurantScreen"})}>


<FontAwesomeIcon icon={faUtensils} style={styles.icon} /> 
<Text style={styles.text}> <FontAwesomeIcon icon={faPencil} color="rgb(255, 211, 99)" />  Edit Restaurant</Text>

    </TouchableOpacity>
  )
}

export default EditRestaurant



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
    marginRight: 3,
    color: "rgb(255, 211, 99)"
  }, 
  text: { 
  fontWeight: "600",
  fontSize: 15

  }
  
  });