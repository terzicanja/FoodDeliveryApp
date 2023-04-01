import React, { Fragment, useState, useEffect } from 'react'
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, setDoc, collection, doc, getDoc, addDoc, arrayRemove } from '@firebase/firestore';
import config from '../../../config/config.json'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MenuItemDelete = ({ item, restaurant_id, deleteById  }) => {

    let food_data = item;
    let prices = item?.food?.food_price;
    let food_id = item?.id;

    const currency = config.prices.price_currency;

    const db = getFirestore();

    const [ViewFoodDetails, setViewFoodDetails] = useState(100);
    const [SelectedFood, setSelectedFood] = useState({ portion: "", price: 0 });

    const [imgURL, setimgURL] = useState('');
    const getImageFromStorage = async () => {

        try {
            const storage = getStorage();
            const imgRef = ref(storage, restaurant_id + "/" + food_id);
            const url = await getDownloadURL(imgRef);
            setimgURL(url);

        } catch (error) {

        }
    }
        getImageFromStorage();


    const handleDeleteMenuItem = () =>{ 
        deleteById(food_id); 
    }

    return (
        <Fragment>

            <View style={styles.card}>

                  
                <Image source={{ uri: imgURL ? imgURL : "http://www.fnfmetal.com/uploads/products/1311-product_Mp8wDrKX.jpg" }} style={{marginLeft: 20, width: 70, height: 70, borderRadius: 10 }} />
               
                <Text style={{ color: "white", textAlign: "center", marginHorizontal: 20 }}>{item?.food?.food_name}</Text>

                <TouchableOpacity onPress={handleDeleteMenuItem} style={{position: "absolute", right: 20, transform: [{scale: 1.5}]}}>   
                <FontAwesomeIcon style={{color: "#CA5A42"}} icon={faTrash} />
                </TouchableOpacity>


            </View>
        </Fragment>
    )
}

export default MenuItemDelete


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        overflow: "hidden",
        backgroundColor: "#694fad",
        marginBottom: 10,
        width: "100%",
        height: 80,
        


    },
    item: {
        width: '50%',

    }

});
