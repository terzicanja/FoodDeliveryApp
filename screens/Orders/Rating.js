import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getFirestore, setDoc, collection, doc, getDoc, addDoc, serverTimestamp, updateDoc, query } from '@firebase/firestore';

const Rating = ({ modalVisible, setModalVisible }) => {

  const db = getFirestore(); 


  const handleRating = async (rating) => {

   const OrderRef = doc(db,"DeliveredOrders",modalVisible.order_id); 
   await updateDoc(OrderRef,{rating: rating}); 
   setModalVisible(()=> {return {visible: false, order_id: '' }}); 
  }


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.visible}
        onRequestClose={()=>{ 
          setModalVisible(()=>{return {visible: false, order_id: '' }})
        }}

      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <Text style={{ width: "100%", textAlign: "center", marginBottom: 50, fontWeight: "600" }}>Rate this Order</Text>
            <TouchableOpacity onPress={()=>handleRating(1)}>
              <FontAwesomeIcon style={{ marginHorizontal: 15, color: "rgb(252, 198, 3)", transform: [{ scale: 2 }] }} icon={faStar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleRating(2)}>
              <FontAwesomeIcon style={{ marginHorizontal: 15, color: "rgb(252, 198, 3)", transform: [{ scale: 2 }] }} icon={faStar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleRating(3)}>
              <FontAwesomeIcon style={{ marginHorizontal: 15, color: "rgb(252, 198, 3)", transform: [{ scale: 2 }] }} icon={faStar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleRating(4)}>
              <FontAwesomeIcon style={{ marginHorizontal: 15, color: "rgb(252, 198, 3)", transform: [{ scale: 2 }] }} icon={faStar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleRating(5)}>
              <FontAwesomeIcon style={{ marginHorizontal: 15, color: "rgb(252, 198, 3)", transform: [{ scale: 2 }] }} icon={faStar} />
            </TouchableOpacity>

          </View>
        </View>

      </Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: "center",
    overflow: "hidden",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 70,
    paddingTop: 20,
    paddingHorizontal: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Rating;