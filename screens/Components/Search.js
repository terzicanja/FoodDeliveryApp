import React,{ useState } from 'react'
import {  Button, TouchableOpacity, StyleSheet, Text, View, TextInput } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSearchDebounce } from '../Custom Functions/Hooks';


const Search = ({setSearchText}) => {


  return (
   <View style={styles.card}> 
  <FontAwesomeIcon icon={faSearch} style={styles.search} />
  <TextInput onChangeText={(val) => setSearchText( ()=> val  )}  style={styles['search-input']} placeholder="Seach" />
   </View>
  )
}




export default Search

const styles = StyleSheet.create({
card: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    width: "90%",
    left: "5%",
    height: 50, 
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
    overflow: "hidden", 


},
search: {
    color: "#694fad",
    width: "20%",
    marginBottom: "auto",
    marginTop: "auto"
    
},
"search-input" : {
   marginVertical: "auto",
   width: "70%",
   marginBottom: "auto",
    marginTop: "auto",
    marginLeft: 10


}

})