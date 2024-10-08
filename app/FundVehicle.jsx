import React, { useState, useCallback ,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { _get } from "./Helper";
import { useRoute } from "@react-navigation/native";


const Topup = () => {
    const route = useRoute
    const { plate_no } = route.params;
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [name ,setName] = useState("");
  const [filter, setFilter] = useState("VHC00001");

  const handleSubmit = () => {
    console.log(`Vehicle Number: ${vehicleNumber}`);
    console.log(`Amount: ${amount}`);
  };
useEffect(() => {
  
  
  },[])

  console.log("Ahmad")

  return (
    <View style={styles.containHeader}>
      <Text style={styles.text}>Fund Vehicle</Text>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.buttonGroup}>
            {/* <TouchableOpacity
            style={[
              styles.button,
              selectedOption === "vehicle" && styles.selectedButton,
            ]}
            onPress={() => console.log("vehicle")}
          >
            <Text style={styles.buttonText}>Vehicle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedOption === "owner" && styles.selectedButton,
            ]}
            onPress={() => setSelectedOption("owner")}
          >
            <Text style={styles.buttonText}>Owner</Text>
          </TouchableOpacity> */}
          </View>

          <View>
            <Text>Enter Vehicle No</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Vehicle Number"
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
            />
          </View>
          <View style={styles.name}>
            <Text>{name}</Text>
          </View>
          <View>
            <Text>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              value={amount}
              keyboardType="numeric"
              onChangeText={setAmount}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    padding: 15,
  },
  containHeader: {
    backgroundColor: "#f5c005",
    height: 220,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 120,
    color: "white",
    fontWeight: "bold",
    // fontFamily: "Sans-Serif",
  },
  name:{
    paddingBottom: 3,
    paddingTop: -2,
    marginLeft:"auto",
  },
  card: {
    height: 300,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGroup: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#f5c005",
    backgroundColor: "#fff",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#f5c005",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#f5c005",
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    padding: 15,
    backgroundColor: "#f5c005",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default Topup;
