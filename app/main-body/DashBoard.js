import React from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

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
  const navigate = useNavigation()

  const itemPressHandler = (value) => {
    console.log("see me", value);
    navigate.navigate('../helpers/Range')
  };

  const items = ({ item }) => (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      onPress={() => itemPressHandler(item)}
      style={styles.item}
    >
      <View>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemAmount}>{item.amount ? item.amount : ""}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Welcome, Ishaq</Text>
      <View>
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
    paddingHorizontal: 0,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '100',
    marginBottom: 5,
    top: -12
  },
  item: {
    flex: 1,
    margin: 2,
    height: 120,
    borderCurve: 5,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ff9900',
  },
  itemText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemAmount: {
    color: "white",
    fontSize: 14,
    fontWeight: 'semibold',
    marginTop: 10
  },
})