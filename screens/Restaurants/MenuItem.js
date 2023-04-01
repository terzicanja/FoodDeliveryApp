import React, { Fragment, useState, useEffect } from 'react'
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, setDoc, collection, doc, getDoc, addDoc } from '@firebase/firestore';
import { auth } from '../../config/firebase-config';
import config from '../../config/config.json'

const MenuItem = ({ item, restaurant_id, restaurant_name, setOrders_container }) => {

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

  useEffect(() => {
    getImageFromStorage();
  }, [])



  const handleViewDetails = () => {
    if (ViewFoodDetails == 100)
      setViewFoodDetails(180);
    if (ViewFoodDetails == 180)
      setViewFoodDetails(100);
  }


  const handleAddToOrders = async () => {

    try {



      if (SelectedFood.price != 0) {

        setOrders_container((curr) => {
          return [
            ...curr, {

              food_id: food_id,
              food_name: food_data.food.food_name,
              portion: SelectedFood.portion,
              price: SelectedFood.price,


            }
          ]

        })

      }


    } catch (error) {

    }

  }


  let menuitems = [
    (prices?.Mala != null || prices.Mala == '') ? { label: "Mala porcija", value: prices?.Mala } : {},
    (prices?.Srednja != null || prices.Srednja != '') ? { label: "Srednja porcija", value: prices?.Srednja } : {},
    (prices?.Velika != null || prices.Velika != '') ? { label: "Velika porcija", value: prices?.Velika } : {},


  ]


  return (
    <Fragment>

      <View style={[styles.card, { height: ViewFoodDetails }]}>

        <View style={{ textAlign: "center", marginLeft: 0, marginRight: 10, marginTop: 10 }}>
          <TouchableOpacity onPress={handleViewDetails}>
            <Image source={{ uri: imgURL ? imgURL : "http://www.fnfmetal.com/uploads/products/1311-product_Mp8wDrKX.jpg" }} style={{ width: 70, height: 70, borderRadius: 10 }} />
          </TouchableOpacity>
          <Text style={{ color: "white", textAlign: "center" }}>{item?.food?.food_name}</Text>
        </View>



        <View style={{ textAlign: "center", marginRight: 2,  marginTop: 27 }}>
          <RNPickerSelect
            onValueChange={(value, label) => {

             

              switch (label) {
                case 0:
                  break;
                case 1:
                  value != 0 ? setSelectedFood(() => { return { portion: "Mala", price: value } }) : setSelectedFood(() => { return { portion: "", price: 0 } });
                  break;
                case 2:
                  value != 0 ? setSelectedFood(() => { return { portion: "Srednja", price: value } }) : setSelectedFood(() => { return { portion: "", price: 0 } });
                  break;
                case 3:
                  value != 0 ? setSelectedFood(() => { return { portion: "Velika", price: value } }) : setSelectedFood(() => { return { portion: "", price: 0 } });
                  break;

                default:
                  break;
              }

            }}

            placeholder={{ label: "Odaberi porciju..", value: 0 }}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}

            items={menuitems}
          />




        </View>


        <View style={{ textAlign: "center", marginTop: 40 }}>
          <Text style={{ width: 50, marginBottom: "auto", marginTop: "auto", color: "white", marginLeft: 10 }}> {SelectedFood.price + currency}  </Text>
        </View>


        <View style={{ textAlign: "center", marginTop: 29  }}>
          <TouchableOpacity onPress={handleAddToOrders} style={{ marginBottom: "auto", marginTop: "auto", backgroundColor: "rgb(255, 211, 99)", borderRadius: 25, padding: 12}} ><Text style={{color: "#694fad", fontWeight: "700"}}>Add</Text></TouchableOpacity>
        </View>

        {food_data.food.food_description != null && food_data.food.food_description != "" ? <Text style={{ color: "white" }}>       Opis jela: {food_data.food.food_description}</Text> : null}

      </View>
    </Fragment>
  )
}

export default React.memo(MenuItem)


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#694fad",
    marginBottom: 10,
    height: 120


  },
  item: {
    width: '50%',

  }

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 13,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white", 
    width: 150, 
    textAlign: "center"
  },
  inputAndroid: {
    fontSize: 13,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#694fad',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30,
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white",
    width: 150, 
    textAlign: "center"
  },
  inputWeb: {
    fontSize: 13,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#694fad',
    borderRadius: 20,
    color: 'black',
    paddingRight: 30,
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white",
    width: 150, 
    textAlign: "center"
  }


});