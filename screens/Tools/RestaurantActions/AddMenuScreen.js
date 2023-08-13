import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import ImageUploader from "./ImageUploader";
import ErrorComponent from "../../../UI Components/Error";
import Success from "../../../UI Components/Success";

const AddMenuScreen = ({ navigation, route }) => {
  const db = getFirestore();
  const food_data = route.params.food_data;
  let restaurant_id = route.params.restaurant_data.id;
  const [loading, setloading] = useState(false);
  const [menu_data, setmenu_data] = useState(
    food_data
      ? {
          food_name: food_data.food.food_name,
          food_description: food_data.food.food_description,
        }
      : {
          food_name: "",
          food_description: "",
        }
  );

  const [food_price, setfood_price] = useState(
    food_data
      ? {
          Mala: food_data.food.food_price.Mala,
          Srednja: food_data.food.food_price.Srednja,
          Velika: food_data.food.food_price.Velika,
        }
      : {
          Mala: "",
          Srednja: "",
          Velika: "",
        }
  );

  const [Imageuri, setImageuri] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);
  const [ErrorVisible, setErrorVisible] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const uploadImage = async (uri, imageName, DirectoryName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, DirectoryName + "/" + imageName);
    const image_response = await uploadBytes(storageRef, blob);
  };

  let foodRandom = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  };

  const handleSubmit = async () => {
    try {
      if (!menu_data.food_name.trim() || !menu_data.food_description.trim())
        throw new Error("some fields are empty, please fill all of them!");
      if (
        !food_data &&
        (Imageuri == "" || Imageuri == null || Imageuri == undefined)
      )
        throw new Error("Please select a image!");

      setloading(true);
      const RestaurantRef = doc(db, "Restaurants", restaurant_id);
      const rest = await getDoc(RestaurantRef);
      const restaurant_data = rest.data();
      let menu = {};
      let food_id = food_data ? food_data.id : 0;
      if (
        restaurant_data.restaurant_menu != null &&
        restaurant_data.restaurant_menu != ""
      ) {
        menu = restaurant_data.restaurant_menu;
        const food_menu_array = Object.entries(menu).map((e) => ({
          [e[0]]: e[1],
        }));
        food_id = food_data ? food_data.id : foodRandom();
      }

      const menu_reshape = Object.assign(menu, {
        [food_id]: {
          food_name: menu_data.food_name,
          food_description: menu_data.food_description,
          food_price: {
            Mala: food_price.Mala,
            Srednja: food_price.Srednja,
            Velika: food_price.Velika,
          },
        },
      });

      const response = await updateDoc(RestaurantRef, {
        restaurant_menu: menu_reshape,
      });
      !food_data && uploadImage(Imageuri, food_id, restaurant_id);
      setloading(false);
      setSuccessVisible(true);

      setmenu_data({
        food_name: "",
        food_description: "",
      });
      setfood_price({
        Mala: "",
        Srednja: "",
        Velika: "",
      });
    } catch (error) {
      seterrorMessage(error.message);
      setErrorVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <ScrollView contentContainerStyle={styles.form}>
          {!food_data && <ImageUploader setImageuri={setImageuri} />}
          <TextInput
            style={[styles["input-field"], { marginBottom: 10 }]}
            placeholder="enter food name..."
            value={menu_data.food_name}
            onChangeText={(val) =>
              setmenu_data((curr) => {
                return { ...curr, food_name: val };
              })
            }
          />
          <TextInput
            style={[styles["input-field"], { marginBottom: 10 }]}
            placeholder="enter food description..."
            value={menu_data.food_description}
            onChangeText={(val) =>
              setmenu_data((curr) => {
                return { ...curr, food_description: val };
              })
            }
          />
          <TextInput
            style={[styles["input-field"], { marginBottom: 10 }]}
            placeholder="enter Big portion price..."
            value={food_price.Velika}
            onChangeText={(val) =>
              setfood_price((curr) => {
                return { ...curr, Velika: val };
              })
            }
          />
          <TextInput
            style={[styles["input-field"], { marginBottom: 10 }]}
            placeholder="enter Middle portion price ..."
            value={food_price.Srednja}
            onChangeText={(val) =>
              setfood_price((curr) => {
                return { ...curr, Srednja: val };
              })
            }
          />
          <TextInput
            style={[styles["input-field"], { marginBottom: 10 }]}
            placeholder="enter Small portion price ..."
            value={food_price.Mala}
            onChangeText={(val) =>
              setfood_price((curr) => {
                return { ...curr, Mala: val };
              })
            }
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text
              style={{ color: "white", textAlign: "center", fontWeight: "600" }}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <Success
            setSuccessVisible={setSuccessVisible}
            successVisible={successVisible}
            message="item successfully added to Menu!"
          />
          <ErrorComponent
            ErrorVisible={ErrorVisible}
            setErrorVisible={setErrorVisible}
            message={errorMessage}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#694fad" />
      )}
    </View>
  );
};

export default AddMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(255, 211, 99)",
    height: "100%",
    width: "100%",
  },
  form: {
    alignItems: "center",
    marginTop: 20,
  },
  "input-field": {
    backgroundColor: "#fff",
    color: "rgb(38, 50, 56)",
    padding: 10,
    marginVertical: 7,
    borderColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: 10,
    width: 250,
  },
  button: {
    marginVertical: "10%",
    width: 130,
    textAlign: "center",
    borderRadius: 20,
    padding: 15,
    backgroundColor: "#694fad",
  },
});
