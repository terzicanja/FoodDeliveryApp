import React, { Fragment, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, collection, query, where, getFirestore, getDoc } from '@firebase/firestore';
import { auth } from '../../config/firebase-config';
import Success from '../../UI Components/Success';
import ErrorComponent from '../../UI Components/Error';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const EditProfileScreen = ({ navigation, route}) => {

const user_data = route.params.user; 

const [SuccessVisible, setSuccessVisible] = useState(false); 
const [ErrorVisible, setErrorVisible] = useState(false); 
const [errorMessage, seterrorMessage] = useState(''); 



const [user, setuser] = useState({ 
    first_name: user_data.first_name, 
    last_name: user_data.last_name, 
    phone: user_data.phone, 
    adress: user_data.adress
})


const updateUser = async () => {

    try {
        
        
        const db = getFirestore(); 
        const userRef = doc(db,"Users",auth.currentUser.uid); 
        if (!user.first_name.trim() || !user.last_name.trim() || !user.adress.trim() || !user.phone.trim() ) {
            throw Error("a input field is empty! you need to fill all of them!");
            
        }
        
        const resp = await updateDoc(userRef, {
            first_name: user.first_name, 
            last_name: user.last_name, 
            phone: user.phone, 
            adress: user.adress
        })
        setSuccessVisible(true); 
        
    } catch (error) {
        seterrorMessage(error.message); 
        setErrorVisible(true); 
    }
        

}



    return (
        
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.form}>
<Success setSuccessVisible={setSuccessVisible} SuccessVisible={SuccessVisible} message="Profile info updated successfully!" />
                
                <View style={styles['input-card']}>
                    <TextInput value={user.first_name} style={styles['input-field']} onChangeText={(value) => setuser((curr) => { return { ...curr, first_name: value } })} />
                    <TextInput value={user.last_name} style={styles['input-field']} onChangeText={(value) => setuser((curr) => { return { ...curr, last_name: value } })} />
                    <TextInput value={user.phone} keyboardType="number-pad" style={styles['input-field']} onChangeText={(value) => setuser((curr) => { return { ...curr, phone: value } })} />
                    <TextInput value={user.adress} style={styles['input-field']} onChangeText={(value) => setuser((curr) => { return { ...curr, adress: value } })} />
                    <TouchableOpacity onPress={updateUser} style={styles.button} ><Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 13 }}>Change</Text></TouchableOpacity>
                    <ErrorComponent ErrorVisible={ErrorVisible} setErrorVisible={setErrorVisible} message={errorMessage} />
                </View>



            </ScrollView>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    "input-card": {
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 15,
        width: "100%",
        height: "85%", 
        top: "15%",
        paddingHorizontal: 30,
        paddingTop: 40

    },

    container: {
        backgroundColor: "rgb(255, 211, 99)",
        height: "100%",
        width: "100%", 
        display: "flex", 
       alignItems: "center"
    },
    form: {
        alignItems: "center",
        height: "100%"

    },
    'input-field': {
        marginTop: 10,
        backgroundColor: "rgb(248, 248, 248)",
        color: "rgb(38, 50, 46)",
        padding: 10,
        marginVertical: 1,
        borderColor: "rgba(0, 0, 0, 0.02)",
        width: 250,
        textAlign: "center"
    },
    button: {
        marginTop: 30,
        width: 90,
        textAlign: "center",
        borderRadius: 20,
        padding: 17,
        backgroundColor: "#694fad",

    }
}); 