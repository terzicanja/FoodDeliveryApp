import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import { collection, query, where, doc, getFirestore, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import ImageUploader from './ImageUploader';
import ErrorComponent from '../../../UI Components/Error';
import Success from '../../../UI Components/Success'

const AddRestaurantScreen = ({navigation}) => {

    const [ErrorVisible, setErrorVisible] = useState(false); 
    const [SuccessVisible, setSuccessVisible] = useState(false); 
    const [errorMessage, seterrorMessage] = useState(''); 


   
    const db = getFirestore();    
    
    const [restaurant_added, setrestaurant_added] = useState({}); 
    const [loading, setloading] = useState(false); 
    const [email, setemail] = useState('');
    const [restaurant_data, setrestaurant_data] = useState({
        restaurant_name: "",
        restaurant_adress: "",
        restaurant_description: "",
        restaurant_owner: ""
    })


    const [userType, setuserType] = useState(""); 
    
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




    
    const [Imageuri, setImageuri] = useState(null);


    const uploadImage = async (uri, imageName, DirectoryName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, DirectoryName + "/" + imageName);
        const image_response = await uploadBytes(storageRef, blob);
        
    }

    const handleSubmit = async () => {


        try {
            
         
           let uid = null; 
            const UsersRef = collection(db, "Users");
            const q = query(UsersRef, where("email", "==", email));
            const user = await getDocs(q);
            console.log(restaurant_data.restaurant_owner)
            if(!restaurant_data.restaurant_name.trim() || !restaurant_data.restaurant_adress.trim() || !email.trim()) throw new Error("Please enter data to all fields!"); 
            if ( user == undefined || user.empty)  throw Error("no such Email found!"); 
            if(Imageuri == "" || Imageuri == null || Imageuri== undefined ) throw new Error("Please select a image!"); 
            
            setloading(true);            

                user.forEach((doc) => {
                     uid = doc.id; 
                })

            const RestaurantRef = collection(db, "Restaurants");

            const restaurant_response = await addDoc(RestaurantRef, {
                restaurant_name: restaurant_data.restaurant_name,
                restaurant_adress: restaurant_data.restaurant_adress,
                restaurant_description: restaurant_data.restaurant_description,    
                restaurant_owner: uid
            });
            if(userType == "user") {
                console.log(userType); 
            const user_to_restaurant_owner = await updateDoc(doc(db, "Users", uid), { user: "restaurant_owner" });
        }
            
            
            const image_upload_response = await uploadImage(Imageuri, restaurant_data.restaurant_name, restaurant_response.id);

            setloading(false); 
            setrestaurant_added({restaurant_id: restaurant_response.id }); 
            setSuccessVisible(true); 

            setrestaurant_data({
                restaurant_name: "",
                restaurant_adress: "",
                restaurant_description: "",
                restaurant_owner: ""
            }); 
            
 

        } catch (error) {
            seterrorMessage(error.message); 
            setErrorVisible(true); 

        }

    }




    return (
        <View style={styles.container}>

          
            { !loading ? 
            <ScrollView contentContainerStyle={styles.form}>
                <ImageUploader setImageuri={setImageuri} />
                <TextInput style={[styles['input-field'], { marginBottom: 10 }]} placeholder="enter Restaurant name..." onChangeText={(val) => setrestaurant_data((curr) => { return { ...curr, restaurant_name: val } })} />
                <TextInput style={[styles['input-field'], { marginBottom: 10 }]} placeholder="enter Owners email adress..." onChangeText={(val) => setemail(val)} />
                <TextInput style={[styles['input-field'], { marginBottom: 10 }]} placeholder="enter Restaurant adress..." onChangeText={(val) => setrestaurant_data((curr) => { return { ...curr, restaurant_adress: val } })} />
                <TextInput style={[styles['input-field'], { marginBottom: 10 }]} placeholder="enter Restaurant description..." onChangeText={(val) => setrestaurant_data((curr) => { return { ...curr, restaurant_description: val } })} />

                <TouchableOpacity  onPress={()=>handleSubmit()} style={styles.button} ><Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>Submit</Text></TouchableOpacity>
             <ErrorComponent setErrorVisible={setErrorVisible} ErrorVisible={ErrorVisible} message={errorMessage} /> 
             <Success setSuccessVisible={setSuccessVisible} SuccessVisible={SuccessVisible} message="Restaurant added successfully!" />
            </ScrollView>:  <ActivityIndicator size="large" color="#694fad" /> } 
        </View>
    )
}

export default AddRestaurantScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgb(255, 211, 99)",
        height: "100%",
        width: "100%"
    },
    form: {
        alignItems: "center",
        flex: 1,
        marginTop: 20
    },
    'input-field': {
        backgroundColor: "#fff",
        color: "rgb(38, 50, 56)",
        padding: 10,
        marginVertical: 7,
        borderColor: "rgba(0, 0, 0, 0.02)",
        borderRadius: 10,
        width: 250
    },
    button: {
        marginVertical: "10%",
        width: 130,
        textAlign: "center",
        borderRadius: 20,
        padding: 15,
        backgroundColor: "#694fad",

    }
}); 