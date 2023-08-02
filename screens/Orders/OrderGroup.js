import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Order from "./Order";

const OrderGroup = ({ route }) => {
  const order = route.params.order;

  let order_output_data = order.ordered_food.map((food) => (
    <Order
      key={Math.random()}
      restaurant_id={order.restaurant_id}
      food_data={food}
    />
  ));

  return (
    <View style={styles.container}>
      <ScrollView style={styles["restaurant_card"]}>
        <Text
          style={{
            color: "white",
            textAlign: "left",
            fontSize: 15,
            fontWeight: "700",
            marginVertical: 20,
            marginLeft: 20,
          }}
        >
          {order.adress} , tel: +{order.phone}{" "}
        </Text>

        {order_output_data}
      </ScrollView>
    </View>
  );
};

export default OrderGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#694fad",
    height: "100%",
    width: "100%",
  },
});
