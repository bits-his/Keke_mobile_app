import React from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    id: 1,
    title: "Wallet Balance",
    amount: "N 5,000,000",
  },
  {
    id: 2,
    title: "Vehicle",
    amount: "50",
  },
  {
    id: 3,
    title: "My Transaction",
  },
  {
    id: 4,
    title: "Top Up",
  },
  {
    id: 5,
    title: "My Vehicle",
  },
  {
    id: 6,
    title: "Fund Vehicle",
  },
  {
    id: 7,
    title: "Search Vehicle",
  },
];
export default function DashBoard() {
  const itemPressHandler = (value) => {
    console.log("see me", value);
  };

  const items = ({ item }) => (
    <View>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={() => itemPressHandler(item)}
      >
        <View>
          <Text>{item.title}</Text>
          <Text>{item.amount ? item.amount : ""}</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome, Ishaq</Text>
        <FlatList data={data} renderItem={items} numColumns={2} keyExtractor={(item) => item.id} />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 0,
    justifyContent: 'center',
    paddingHorizontal: 3
  },
  item: {
    flex: 1,
    margin: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ff9900'
  }
})