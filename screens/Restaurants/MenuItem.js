import React, { Fragment, useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  setDoc,
  collection,
  doc,
  getDoc,
  addDoc,
} from "@firebase/firestore";
import { auth } from "../../config/firebase-config";
import config from "../../config/config.json";
import { RadioButton } from "react-native-paper";

const MenuItem = ({
  item,
  restaurant_id,
  restaurant_name,
  setOrders_container,
}) => {
  let food_data = item;
  let prices = item?.food?.food_price;
  let food_id = item?.id;

  const currency = config.prices.price_currency;

  const db = getFirestore();

  console.log("prices", prices);

  let menuitems = [
    prices?.Mala ? { portion: "Mala porcija", price: prices?.Mala } : null,
    prices?.Srednja
      ? { portion: "Srednja porcija", price: prices?.Srednja }
      : {},
    prices?.Velika ? { portion: "Velika porcija", price: prices?.Velika } : {},
  ];

  const menuItemPortions = Object.entries(prices)
    .map(([name, price]) => {
      return price
        ? {
            portion: `${name} porcija`,
            price: price,
          }
        : null;
    })
    .filter((item) => (item ? true : false));

  const [ViewFoodDetails, setViewFoodDetails] = useState(100);
  const [option, setOption] = useState(menuItemPortions[0]);

  const [imgURL, setimgURL] = useState("");
  const getImageFromStorage = async () => {
    try {
      const storage = getStorage();
      const imgRef = ref(storage, restaurant_id + "/" + food_id);
      const url = await getDownloadURL(imgRef);
      setimgURL(url);
    } catch (error) {}
  };

  useEffect(() => {
    getImageFromStorage();
  }, []);

  const handleViewDetails = () => {
    if (ViewFoodDetails == 100) setViewFoodDetails(180);
    if (ViewFoodDetails == 180) setViewFoodDetails(100);
  };

  const handleAddToOrders = async () => {
    try {
      if (option.price != 0) {
        setOrders_container((curr) => {
          return [
            ...curr,
            {
              food_id: food_id,
              food_name: food_data.food.food_name,
              portion: option.portion,
              price: option.price,
            },
          ];
        });
      }
    } catch (error) {}
  };

  return (
    <Fragment>
      <View style={[styles.card, { padding: 15, flexBasis: "auto" }]}>
        <View
          style={{
            textAlign: "center",
            marginLeft: 0,
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity onPress={handleViewDetails}>
            <Image
              source={{
                uri: imgURL
                  ? imgURL
                  : "http://www.fnfmetal.com/uploads/products/1311-product_Mp8wDrKX.jpg",
              }}
              style={{ width: 70, height: 70, borderRadius: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ textAlign: "center", marginRight: 2 }}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {item?.food?.food_name}
          </Text>
          {food_data.food.food_description && (
            <Text style={{ color: "white" }}>
              Opis jela: {food_data.food.food_description}
            </Text>
          )}
          <Text
            style={{
              width: 50,
              marginBottom: "auto",
              marginTop: "auto",
              color: "white",
              fontWeight: "600",
            }}
          >
            {option && option.price + currency}{" "}
          </Text>
          <TouchableOpacity
            onPress={handleAddToOrders}
            style={{
              marginBottom: "auto",
              marginTop: 10,
              backgroundColor: "rgb(255, 211, 99)",
              borderRadius: 25,
              padding: 12,
            }}
          >
            <Text style={{ color: "#694fad", fontWeight: "700" }}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={{ textAlign: "center", paddingLeft: 20 }}>
          {menuItemPortions.map((item, index) => {
            return (
              item && (
                <RadioButton.Item
                  style={{ fontSize: 10, padding: 0 }}
                  labelStyle={{ color: "white", fontSize: 12 }}
                  color="white"
                  key={index}
                  label={item.portion}
                  value={item.portion}
                  status={
                    option && option.portion === item.portion
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => setOption(item)}
                />
              )
            );
          })}
        </View>
      </View>
    </Fragment>
  );
};

export default React.memo(MenuItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#694fad",
    marginBottom: 10,
  },
  item: {
    width: "50%",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 13,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    color: "black",
    paddingRight: 30,
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white",
    width: 150,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 13,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#694fad",
    borderRadius: 20,
    color: "black",
    paddingRight: 30,
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white",
    width: 150,
    textAlign: "center",
  },
  inputWeb: {
    fontSize: 13,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#694fad",
    borderRadius: 20,
    color: "black",
    paddingRight: 30,
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "white",
    width: 150,
    textAlign: "center",
  },
});
