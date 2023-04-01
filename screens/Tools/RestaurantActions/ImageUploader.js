import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { storage } from '../../../config/firebase-config';
import { getDatabase, ref, onValue } from 'firebase/database';


const ImageUploader = ({setImageuri}) => {

  const [image, setImage] = useState(null);
  const [picked, setpicked] = useState(false);
  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageuri(result.uri); 
      setpicked(true)
    }
  };


  return (
    <View style={{ display: "flex",  alignItems: 'center', justifyContent: 'center' }}>

      {!picked ?

        <View style={{ textAlign: "center", marginTop: 30 }}>
          <TouchableOpacity onPress={pickImage} style={{ textAlign: 'center' }} ><FontAwesomeIcon style={[styles.icon, { transform: [{ scale: 3 }] }]} icon={faImage} /></TouchableOpacity>
          <Text style={{ textAlign: 'center', marginTop: 25 }}>Select Image </Text>
        </View>

        :

        <View style={{ textAlign: "center" }}>
          <TouchableOpacity onPress={pickImage} style={{ textAlign: 'center', marginTop: 20  }} ><FontAwesomeIcon style={[styles.icon, { transform: [{ scale: 2 }] }]} icon={faImage} /></TouchableOpacity>
          <Text style={{ textAlign: 'center', marginTop: 5 }}>Change Image</Text>
        </View>

      }

      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
    </View>
  );
}


export default ImageUploader

const styles = StyleSheet.create({
  icon: {
    color: "#694fad",
    textAlign: 'center',
    marginLeft: "auto",
    marginRight: "auto",
  }


}); 