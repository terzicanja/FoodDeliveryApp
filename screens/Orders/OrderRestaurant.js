import React, { Fragment, useState, useEffect } from 'react'
import { Text, View,  StyleSheet, Image, TouchableOpacity } from 'react-native'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, setDoc, collection, doc, getDoc, deleteDoc } from '@firebase/firestore';


const OrderRestaurant = ({order_data,setModalVisible, navigation}) => {

  const db = getFirestore(); 

const [imgURL, setimgURL] = useState(null); 
const [input_date, setinput_date] = useState(0); 
const [update, setupdate] = useState(false); 

const getImageFromStorage = async () => {

try {
  const storage = getStorage();
  const imgRef = ref(storage, order_data.restaurant_id + "/" + order_data.restaurant_name);  
  const url = await getDownloadURL(imgRef);
  setimgURL(url);

} catch (error) {
  
}

  
}

const viewOrderDetails = () =>{
    navigation.navigate("OrderGroup",{order : order_data}); 

}


const handleDelivered = async () =>{ 
  
try {
const add_response = await setDoc(doc(db,"DeliveredOrders",order_data.id),order_data); 

await deleteDoc(doc(db,"Orders",order_data.id));  
  setModalVisible(()=>{return{visible: true, order_id:order_data.id}}); 

} catch (err) {
  
}
}


let date; 
useEffect(() => {

  date = order_data.ordered; 
  if(date != null ){  
    setinput_date( date.toDate()); 
}
}, [order_data])

getImageFromStorage();

function millisToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes; 
}

var date_now = new Date(); 
let order_date =  millisToMinutes(Math.abs(date_now - input_date)); 


setInterval(()=>{
  setupdate((curr)=>!curr); 
},60000)

  return (
    <Fragment>
    
      <TouchableOpacity onPress={viewOrderDetails}  style={styles.card}>

        <View style={{ textAlign: "center", marginRight: 10, marginTop: 10 }}>
         
          <Image source={{ uri: imgURL != null && imgURL != ""? imgURL : "http://www.fnfmetal.com/uploads/products/1311-product_Mp8wDrKX.jpg" }} style={{ width: 70, height: 70, borderRadius: 10 }} />
          
          <Text style={{ color: "white", textAlign: "center" }}>{order_data.restaurant_name}</Text>
        </View>



        <View style={{ textAlign: "center", alignSelf: "center",marginRight: 2 }}>
          <Text  style={{ color: "white", textAlign: "left" }}>Ordered: {order_date} min ago</Text>
         
        </View>



        <View style={{ textAlign: "center", alignSelf: "center" }}>
          <TouchableOpacity onPress={handleDelivered}  style={{ marginBottom: "auto", marginTop: "auto", backgroundColor: "white", marginLeft: 25, borderRadius: 20, padding: 15 }} ><Text>Delivered</Text></TouchableOpacity>
        </View>

       

      </TouchableOpacity>
    </Fragment>
  )
}

export default OrderRestaurant


const styles = StyleSheet.create({
  card: {
    flex: 0.2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#694fad",
    marginBottom: 10, 
    height: 100
  

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
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white"
  },
  inputAndroid: {
    fontSize: 13,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#694fad',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white"
  },
  inputWeb: {
    fontSize: 13,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: '#694fad',
    borderRadius: 8,
    color: 'black',
    paddingRight: 20,
    alignContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white"
  }


});