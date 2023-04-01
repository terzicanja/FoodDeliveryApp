import React, { Fragment, useState, useEffect } from 'react'
import { Text, View,  StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { getStorage, ref, getDownloadURL } from "firebase/storage";



const Order = ({food_data,restaurant_id}) => {

const [imgURL, setimgURL] = useState(""); 

const getImageFromStorage = async () => {

try {
  const storage = getStorage();
  const imgRef = ref(storage, restaurant_id + "/" + food_data.food_id);  
  const url = await getDownloadURL(imgRef);
  setimgURL(url);

} catch (error) {
  
}
}

getImageFromStorage();




  return (
    <Fragment>
    
      <View style={styles.card}>

        <View style={{ textAlign: "center", marginLeft: 20, marginTop: Platform.OS == "web" ? 0  : 20 }}>
         
          <Image source={{ uri: imgURL != "" ? imgURL : "http://www.fnfmetal.com/uploads/products/1311-product_Mp8wDrKX.jpg" }} style={{ width: 65, height: 65, borderRadius: 10 }} />
          
          <Text style={{ color: "#694fad", textAlign: "center" }}>{food_data.restaurant_name}</Text>
        </View>



        <View style={{ textAlign: "center", alignSelf: "center",marginRight: 2, marginLeft: 20 }}>
          <Text  style={{ color: "#694fad", textAlign: "left", fontWeight: "600" }}> {food_data.food_name} {"\n"}</Text>
          <Text  style={{ color: "#694fad", textAlign: "left", marginTop: Platform.OS == "web" ? 0  : -15 , fontWeight: "600" }}> Porcija: {food_data.portion} </Text>
        </View>



      </View>
    </Fragment>
  )
}

export default Order


const styles = StyleSheet.create({
  card: {
    display: "flex", 
    alignContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    overflow: "hidden",
    backgroundColor: "white",
    marginBottom: 10, 
    height: 80,
  

  },
  item: {
    width: '50%',

  }

});

