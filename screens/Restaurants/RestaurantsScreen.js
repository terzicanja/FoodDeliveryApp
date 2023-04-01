import React from 'react'
import { StyleSheet, View, ScrollView, Animated } from "react-native";
import Restaurant from './Restaurant';
import Search from '../Components/Search';
import { getFirestore } from '@firebase/firestore';
import { collection, query, where } from '@firebase/firestore';
import { useFirestoreQuery } from '../Custom Functions/Hooks';
import { useSearchDebounce } from '../Custom Functions/Hooks';

const RestaurantsScreen = ({ navigation }) => {
  

  const [SearchText, setSearchText] = useSearchDebounce();
  
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 60);
  const translateY = diffClamp.interpolate({ inputRange: [0, 60], outputRange: [0, -60] });


  const db = getFirestore();

  const RestaurantRef = collection(db, "Restaurants");
  const q = query(RestaurantRef, where("restaurant_name", ">=", SearchText),);
  const restaurants = useFirestoreQuery(q, SearchText);



  let restaurants_arry = restaurants.map((restaurant) => <Restaurant screen={"RestaurantSingle"} key={restaurant.id} navigation={navigation} restaurant_data={restaurant} />)



  return (
    <View style={styles.container}>


      <ScrollView style={styles.scrollview}
        scrollEventThrottle={90}
        stickyHeaderIndices={[0]}
        onScroll={(e) => {

          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }} >
        <Animated.View style={{ transform: [{ translateY: translateY }], elevation: 4, zIndex: 100, marginBottom: 50 }}>
          <Search setSearchText={setSearchText} />
        </Animated.View>

        {restaurants_arry}




      </ScrollView>



    </View>
  )
}

export default RestaurantsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 211, 99)",
    height: "100%",
    width: "100%"
  },
  scrollview: {
    top: 0,
    bottom: 25,
    position: "relative",
    width: "90%",
    marginHorizontal: "5%"

  }
}); 