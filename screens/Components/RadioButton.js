import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";

export default function RadioButtonSelect({ data, onSelect }) {
  const [userOption, setUserOption] = useState(data[0]);

  const selectHandler = (value) => {
    // onSelect(value);
    setUserOption(value);
  };

  console.log("ovo dobijeem", data);
  console.log("stateee", userOption);

  return (
    <View>
      {data.map((item) => {
        return (
          <RadioButton.Item
            label={item.label}
            value={item.label}
            status={userOption === item.label ? "checked" : "unchecked"}
            onPress={() => selectHandler({ item })}
          />
        );
      })}
      {/* <RadioButton
        value="Apple"
        status={userOption === "Apple" ? "checked" : "unchecked"} //if the value of checked is Apple, then select this button
        onPress={() => setUserOption("Apple")} //when pressed, set the value of the checked Hook to 'Apple'
      />
      <RadioButton
        value="Samsung"
        status={userOption === "Samsung" ? "checked" : "unchecked"}
        onPress={() => setUserOption("Samsung")}
      /> */}
    </View>
  );

  // return (
  //   <View>
  //     {data.map((item) => {
  //       return (
  //         <Pressable onPress={() => selectHandler(item.value)}>
  //           <Text>
  //             {item.label} ({item.value})
  //           </Text>
  //         </Pressable>
  //       );
  //     })}
  //   </View>
  // );
}
