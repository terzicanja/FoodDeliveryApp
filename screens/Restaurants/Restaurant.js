import React, { Fragment, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const Restaurant = ({ restaurant_data, navigation, screen }) => {


  const [imgURL, setimgURL] = useState('');


  const getImageFromStorage = async () => {
    try {
      const storage = getStorage();
      const imgRef = ref(storage, restaurant_data.id + '/' + restaurant_data.restaurant_name);
      const url = await getDownloadURL(imgRef);
      setimgURL(url);

    } catch (error) {
      console.log(error)

    }


  }

  useEffect(() => {
    getImageFromStorage();
  }, [])







  return (
    <Fragment>

      <TouchableOpacity style={styles.card} onPress={() =>  navigation.navigate(screen, { restaurant_data })}>
        <View style={{ width: "30%" }}>
          <Image source={{ uri: imgURL!='' ? imgURL : "http://www.fnfmetal.com/uploads/products/1311-product_Mp8wDrKX.jpg" }} style={{ width: 70, height: 70, left: 5, top: 5, borderRadius: 10 }} />
          

        </View>

        <View style={{ width: "70%" }}>

          <Text style={{fontWeight: "700"}}>{restaurant_data.restaurant_name}</Text> 

          <Text>{restaurant_data.restaurant_adress}</Text>

          <Text>{restaurant_data.restaurant_description}</Text>
        </View>

      </TouchableOpacity >

    </Fragment>
  )
}

export default Restaurant


const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 15, 
    paddingBottom: 10


  },
  item: {
    width: '50%'
  }

}); 