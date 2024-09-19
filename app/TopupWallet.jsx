import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { _get } from "./Helper";
import { useRoute } from "@react-navigation/native";

const TopupWallet = () => {
    const route = useRoute();
    const { vehicle_id,plate_no } = route.params;
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log(`Vehicle Number: ${vehicle_id}`);
    console.log(`Amount: ${amount}`);
  };
  const getName = useCallback(() => {
    fetch(`http://localhost:44405/superagent?query_type=select&id=""`)
      .then((raw) => raw.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        error(err);
      });
  }, []);
  useEffect(() => {
    _get(`superagent?query_type=select&id=""`, (resp) => {
      console.log(resp);
    });
    return () => {
      console.log("Cleanup on unmount");
    };
  }, []);


  return (
    <View style={styles.containHeader}>
      <Text style={styles.text}>Top Up Vehicle</Text>
      <View style={styles.container}>
        {/* <View style={styles.container}> */}
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
            <Text>Vehicle Id</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Vehicle Number"
              value={vehicle_id}
              editable={false}
              //   onChangeText={setVehicleNumber}
            />
          </View>
          {/* <View style={styles.name}> */}
            <Text style={styles.infoText}>Plate Number: {plate_no}</Text>
          {/* </View> */}
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
    marginTop: 270,
    padding: 15,
  },
  containHeader: {
    backgroundColor: "#f5c005",
    height: 120,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 40,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  name: {
    paddingBottom: 3,
    paddingTop: -2,
    marginLeft: "auto",
  },
  card: {
    height: 300,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "gray",
    shadowColor: "#000",
    elevation: 60,
    marginTop: 50,
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
  infoText: {
    fontWeight: "bold",
    textAlign: "end",
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
});
export default TopupWallet;
