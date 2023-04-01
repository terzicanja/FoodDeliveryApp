import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";


const Success = ({ SuccessVisible, setSuccessVisible, message }) => {



  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={SuccessVisible}
        onRequestClose={()=>{ 
            setSuccessVisible(false)
        }}

      >
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <Text style={{ width: "100%", textAlign: "center", marginBottom: 50, fontWeight: "600" }}>{message}</Text>
             <TouchableOpacity style={styles.ok} onPress={()=>setSuccessVisible(false)}> 
             <Text style={{textAlign: "center", color: "white"}}>Ok</Text>
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
  }, 
  ok: {
    marginTop: 20,
    width: 90,
    textAlign: "center",
    borderRadius: 20,
    padding: 17,
    backgroundColor: "rgb(160, 224, 108)",
  }
});

export default Success;