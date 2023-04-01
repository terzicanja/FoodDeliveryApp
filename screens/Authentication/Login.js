import React, { createRef, useEffect,  useState } from 'react'
import { Alert, Button, Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { auth } from '../../config/firebase-config';
import { signInWithEmailAndPassword} from 'firebase/auth';
import ErrorComponent from '../../UI Components/Error';


const Login = ({navigation}) => {

 const [email, setemail] = useState(''); 
 const [password, setpassword] = useState(''); 
   
     const [ErrorVisible, setErrorVisible] = useState(false); 
     const [errorMessage, seterrorMessage] = useState(''); 

    const handleLogin = async (e, p) => {
        
        try {
          e = e.trim(); 
          const user = await signInWithEmailAndPassword(auth, e, p);
         navigation.navigate("Main"); 
    
        } catch (error) {
         
            seterrorMessage(error.message); 
            setErrorVisible(true); 
    
        }
      }
    
      

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>   
        <View style={styles.container}>
        
            <View style={styles['login-form']}>
            
                <TextInput placeholder="enter you email" style={[styles['input-field'],{marginBottom: 20} ]} onChangeText={(val)=> setemail(val)} />
                <TextInput placeholder="enter you password" onChangeText={(val)=> setpassword(val)} secureTextEntry={true} style={[styles['input-field'],{marginBottom: 50} ]}  />
                <View style={styles['align-center']}> 

                <TouchableOpacity style={styles.button} title="Sign in" onPress={()=>handleLogin(email,password)} ><Text style={{textAlign: "center", color: "white", fontWeight: "400"}}>Login</Text></TouchableOpacity>
                </View>
                <Text style={{ marginVertical: 30, textAlign: "center", color: "#fff", fontWeight: "500" }} >Dont have an accout?</Text>
                
                <View style={styles['align-center']}> 
                <TouchableOpacity style={[styles.button,{width: 160}]} title="Register" onPress={()=> navigation.navigate("Register")}><Text style={{textAlign: "center", color: "white", fontWeight: "400"}}>Create an account</Text></TouchableOpacity>
                
                </View>
                <ErrorComponent ErrorVisible={ErrorVisible} setErrorVisible={setErrorVisible} message={errorMessage} /> 
                 </View>

           


        </View>
        </ScrollView>    
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(255, 211, 99)",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    "login-form": {
        top: "25%",
        width: "70%"
    },
    "input-field": {
        backgroundColor: "rgb(248, 248, 248)",
        color: "rgb(38, 50, 46)",
        padding: 10,
        marginVertical: 7,
        borderColor: "rgba(0, 0, 0, 0.02)",
        borderRadius: 10
    },
    button: {
        marginVertical: "2%",
        width: 100,
        textAlign: "center",
        borderRadius: 20,
        color: "white",
        padding: 15,
        backgroundColor: "#694fad", 
        fontWeight: "800"
    }, 
    "align-center":{ 
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

    }
});
export default Login