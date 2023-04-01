import React, { Fragment, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, updateDoc, collection, query, where, getFirestore } from '@firebase/firestore';
import MenuItemDelete from './MenuItemDelete';
import ErrorComponent from '../../../UI Components/Error'; 
import Success from '../../../UI Components/Success'; 
import * as ImagePicker from 'expo-image-picker';

const EditRestaurantScreen = ({ navigation, route }) => {

    let restaurant_data = route.params.restaurant_data;

    const [imgURL, setimgURL] = useState('');
    const [update, setupdate] = useState(false); 


    const [SuccessVisible, setSuccessVisible] = useState(false); 
    const [ErrorVisible, setErrorVisible] = useState(false); 
    const [errorMessage, seterrorMessage] = useState(''); 

    const getImageFromStorage = async () => {

        try {
            const storage = getStorage();
            const imgRef = ref(storage, restaurant_data.id + '/' + restaurant_data.restaurant_name);
            const url = await getDownloadURL(imgRef);
            setimgURL(url);

        } catch (error) {

        }

    }

    useEffect(() => {
        if(imgURL == "") getImageFromStorage();
    }, [restaurant_data])


    const [restaurant_info, setrestaurant_info] = useState({
        restaurant_name: restaurant_data.restaurant_name,
        restaurant_description: restaurant_data.restaurant_description,
        restaurant_adress: restaurant_data.restaurant_adress
    })




    const db = getFirestore();
  const  restaurantRef = doc(db, "Restaurants", restaurant_data.id);


    const uploadImage = async (uri, imageName, DirectoryName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const storageRef = ref(storage, DirectoryName + "/" + imageName);
        const image_response = await uploadBytes(storageRef, blob);
        
    }


    const pickImage = async () => {
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setimgURL(result.uri); 
      }
    };
  



    const UpdateRestaurantInfo = async () => {
      
       
try {
    if (!restaurant_info.restaurant_name.trim() || !restaurant_info.restaurant_adress.trim() || !restaurant_info.restaurant_description.trim() ) { 
        
        throw Error("a input field is empty! you need to fill all of them!");
    } 
    const resp = await updateDoc(restaurantRef, {
        restaurant_name: restaurant_info.restaurant_name, 
        restaurant_adress: restaurant_info.restaurant_adress, 
        restaurant_description: restaurant_info.restaurant_description
    })

    uploadImage(imgURL,restaurant_info.restaurant_name,restaurant_data.id); 
    setSuccessVisible(true);
    
} catch (error) {
    seterrorMessage(error.message); 
    setErrorVisible(true); 

        } 




    }
const restaurant_menu = restaurant_data.restaurant_menu; 

    let menu = null; 

    const deleteById = async (id) =>{ 
        delete restaurant_menu[id];
        await updateDoc(restaurantRef,{ restaurant_menu} ); 
        setupdate((curr)=>!curr)
   }
   
    if(!restaurant_menu == null || !restaurant_menu == "") {    

        const objArray = [];
        Object.keys(restaurant_menu).forEach(key => objArray.push({
           id: key, 
           food : restaurant_menu[key]
          
        }));
    
       
         menu = objArray.map((item)=> <MenuItemDelete deleteById={deleteById}    key={Math.random()} item={item} restaurant_id={restaurant_data.id} />  ); 

       }
   

    return (
        <ScrollView style={styles.container}>


            <ScrollView contentContainerStyle={styles.form}>

                <View style={styles['restaurant-info']}>
                 <TouchableOpacity onPress={pickImage}> 
                 <Image source={{ uri: imgURL ? imgURL : "http://www.fnfmetal.com/uploads/products/1311-product_Mp8wDrKX.jpg" }} style={{ width: 130, height: 130, borderRadius: 10 }} /> 
                 </TouchableOpacity>   
                    <TextInput style={styles['input-field']} value={restaurant_info.restaurant_name} onChangeText={(value) => setrestaurant_info((curr) => { return { ...curr, restaurant_name: value } })} />
                    <TextInput style={styles['input-field']} value={restaurant_info.restaurant_adress} onChangeText={(value) => setrestaurant_info((curr) => { return { ...curr, restaurant_adress: value } })} />
                    <TextInput style={[styles['input-field'], { height: 70 }]} textBreakStrategy={'highQuality'} multiline={true} value={restaurant_info.restaurant_description} onChangeText={(value) => setrestaurant_info((curr) => { return { ...curr, restaurant_description: value } })} />
                    <TouchableOpacity onPress={UpdateRestaurantInfo} style={styles.button} ><Text style={{ color: "white", textAlign: "center", fontWeight: "600", fontSize: 11 }}>Change</Text></TouchableOpacity>

                </View>



    {menu && menu}


    <Success setSuccessVisible={setSuccessVisible} SuccessVisible={SuccessVisible} message="Restaurant info updated successfully!" />
    <ErrorComponent ErrorVisible={ErrorVisible} setErrorVisible={setErrorVisible} message={errorMessage} />


            </ScrollView>
        </ScrollView>
    )
}

export default EditRestaurantScreen

const styles = StyleSheet.create({
    "restaurant-info": {
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        marginVertical: 15,
        paddingTop: 30,
        paddingBottom: 20,
        width: "100%"
    },

    container: {
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
        marginTop: 10,
        backgroundColor: "rgb(248, 248, 248)",
        color: "rgb(38, 50, 46)",
        padding: 5,
        marginVertical: 1,
        borderColor: "rgba(0, 0, 0, 0.02)",
        width: 250,
        textAlign: "center"
    },
    button: {
        marginTop: 20,
        width: 90,
        textAlign: "center",
        borderRadius: 20,
        padding: 15,
        backgroundColor: "#694fad",

    }
}); 