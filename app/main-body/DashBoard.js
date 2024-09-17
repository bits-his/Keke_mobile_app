import React from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
  {
    id: 1,
    title: "Wallet Balance",
    amount: "N 5,000,000",
    icon: <AntDesign name="wallet" size={40} color='#f5c005' />
  },
  {
    id: 2,
    title: "Vehicle",
    amount: "50",
    icon: <AntDesign name="car" size={40} color='#f5c005' />
  },
  {
    id: 3,
    title: "My Transaction",
    icon: <AntDesign name="book" size={40} color='#f5c005' />
  },
  {
    id: 4,
    title: "Top Up",
    icon: <AntDesign name="creditcard" size={40} color='#f5c005' />
  },
  {
    id: 5,
    title: "My Vehicle",
    icon: <AntDesign name="earth" size={40} color='#f5c005' />
  },
  {
    id: 6,
    title: "Fund Vehicle",
    icon: <AntDesign name="bank" size={40} color='#f5c005' />
  },
  {
    id: 7,
    title: "Search Vehicle",
    icon: <AntDesign name="creditcard" size={40} color='#f5c005' />
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
        <View>{item.icon}</View>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemAmount}>{item.amount ? item.amount : ""}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Welcome, Ishaq</Text>
      <View style={styles.body}>
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
    backgroundColor: '#f5c005',
    paddingHorizontal: 0,
  },
  body: {
    backgroundColor: '#fffafa',
    height: '100%'
  },
  textHeader: {
    fontSize: 20,
    fontWeight: '100',
    borderBottomLeftRadius: 10,
    marginTop: 0,
    marginBottom: 5,
    top: -12
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    margin: 10,
    height: 100,
    borderCurve: 5,
    alignItems: 'center',
    padding: 5,
    borderColor: '#f5c005',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10
  },
  itemText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  itemAmount: {
    color: "black",
    fontSize: 14,
    fontWeight: 'semibold',
  },
})