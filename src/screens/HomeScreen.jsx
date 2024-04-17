import React, { useContext, useEffect } from "react";
import { FlatList, Text, View } from "react-native";

import { globalStyles } from "../themes/globalTheme";
import { ProductContext } from "../context/ProductContext";
import { CustomCardProducts } from "../components/CustomCardProducts ";
import { AuthContext } from "../context/AuthContext";
import { CustomLoading } from "../components/CustomLoading";

export const HomeScreen = () => {
  const { getProducts, state } = useContext(ProductContext);
  const { userState, checkToken } = useContext(AuthContext);

  useEffect(() => {
    getProducts();
  },);


  return (
    <View style={globalStyles.container}>
      <Text
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        {userState.user.acceso === "customer" ? "Customer" : "Admin"}
      </Text>
      <View style={{ flex: 1, alignSelf: "center" }}>
        <FlatList
          data={state.products}
          renderItem={({ item }) => <CustomCardProducts itemData={item} />}
          keyExtractor={(item) => item.idarticulo}
          horizontal={false}
          numColumns={2}
        />
      </View>
    </View>
  );
};
