import React, {useState, useEffect} from 'react'
import { StyleSheet, Text,TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUser, faPencil} from '@fortawesome/free-solid-svg-icons';
import { doc, updateDoc, collection, query, where, getFirestore, getDoc } from '@firebase/firestore';
import { auth } from '../../config/firebase-config';

const EditProfile = ({navigation}) => {

    const [user, setuser] = useState({}); 

    const getUserData =  async () =>{ 
        const db = getFirestore(); 
        const UserRef = doc(db,"Users",auth.currentUser.uid); 
        let user_data = await getDoc(UserRef); 
        user_data = user_data.data()
        setuser(user_data); 
        }

        useEffect(() => {
            getUserData(); 
        }, [])
        




  return (
    <TouchableOpacity style={styles.card} onPress={()=> navigation.navigate("EditProfileScreen", {user})} >


<FontAwesomeIcon icon={faUser} />
<Text style={styles.text}><FontAwesomeIcon style={{color: "orange"}} icon={faPencil} /> Edit Profile</Text>

    </TouchableOpacity>
  )
}

export default EditProfile



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