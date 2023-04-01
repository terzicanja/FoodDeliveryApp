import { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MyProfileStack from '../MyProfile/MyProfileStack';
import RestaurantsScreen from '../Restaurants/RestaurantsScreen';
import OrdersStack from '../Orders/OrdersStack';
import Tools from '../Tools/Tools';
import { collection, getDocs, getFirestore, query, where, doc, getDoc } from '@firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGear, faCartShopping, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../config/firebase-config';




const  BottomTabs = () => {


  const Tab = createMaterialBottomTabNavigator();

const [userType, setuserType] = useState(""); 

const db  = getFirestore();

const checkUserType =  async ()  =>{

  try {
    const user = await getDoc(doc(db,"Users",auth.currentUser.uid)); 
    const usertype = await user.data(); 
    setuserType(usertype.user); 
    
  } catch (error) {
    
  }

}

useEffect(() => {
  checkUserType(); 
}, [])





  return (
    <Tab.Navigator  initialRouteName="Home"
    activeColor="white"
    inactiveColor="black"
    shifting={true}
    barStyle={{ backgroundColor: '#694fad', }}>
        
    <Tab.Screen name="Restaurants"  options={{tabBarIcon: ()=><FontAwesomeIcon  style={{color: "white"}}  icon={faUtensils} />}} component={RestaurantsScreen} /> 
    <Tab.Screen name="Orders" options={{tabBarIcon: ()=><FontAwesomeIcon  style={{color: "white"}}  icon={faCartShopping} />}} component={OrdersStack} /> 
    { (userType == "admin" || userType == "restaurant_owner"  )? <Tab.Screen name="Tools"  options={{tabBarIcon: ()=><FontAwesomeIcon   style={{color: "white"}} icon={faGear} />}}   component={Tools}  /> : null}
    <Tab.Screen name="My profile" options={{tabBarIcon: ()=><FontAwesomeIcon  style={{color: "white"}}  icon={faUser} />}}  component={MyProfileStack}  /> 
    

    </Tab.Navigator>
  );
}
export default BottomTabs