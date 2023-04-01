import React, { Fragment, useState, useEffect } from 'react'
import { Text, View, Button, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Timestamp } from '@firebase/firestore';

const HistoryItem = ({ order_data }) => {

  let restaurant_id = order_data?.restaurant_id; 
  let restaurant_name = order_data?.restaurant_name; 
  var date = new Date(order_data.ordered.toDate()).toUTCString()    
  let rating = order_data?.rating; 
    

let rating_array = []; 
let i = 0; 
for(i  ; i<rating ; i++){ 
    rating_array.push(i); 
}

    const [imgURL, setimgURL] = useState('');
    const getImageFromStorage = async () => {

        try {
            const storage = getStorage();
            const imgRef = ref(storage, restaurant_id + "/" + restaurant_name );
            const url = await getDownloadURL(imgRef);
            setimgURL(url);

        } catch (error) {

        }



    }
    getImageFromStorage();
  

    let stars = rating_array.map((el) =>  <FontAwesomeIcon key={Math.random()} style={{ marginHorizontal: 5, marginTop: 5, color: "rgb(252, 198, 3)"}} icon={faStar} /> )


    return (
        <Fragment>

<View style={styles.card}>

        <View style={{ width: "30%", display: "flex", alignItems: "center", height: "100%"  }}>
          <Image source={{ uri: imgURL!='' ? imgURL : "http://www.fnfmetal.com/uploads/products/1311-product_Mp8wDrKX.jpg" }} style={{ width: 70, height: 70, left: 5, top: 5, borderRadius: 10 }} />
        </View>

        <View style={{ width: "70%" }}>

          <Text style={{fontWeight: "700", color: "white"}}>{restaurant_name}</Text> 

          <Text style={{color: "white"}}>{date}</Text>

          <View style={styles.rating}> 
            {stars}
             </View>
        </View>

      </View >

        </Fragment>
    )
}

export default HistoryItem


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        overflow: "hidden",
        backgroundColor: "#694fad",
        marginBottom: 10,
        width: "100%",
        height: 80


    },
    item: {
        width: '50%',

    }, 
    rating: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: "center",
    overflow: "hidden",
    alignItems: "center",
  
    }

});
