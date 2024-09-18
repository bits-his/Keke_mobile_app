import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { _get } from "./Helper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const SearchVehicles = () => {
  const [vehicle_no, setVehicle_no] = useState("");

  const handleSubmit = () => {
    console.log(`Vehicle Number: ${vehicle_no}`);
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
      <Text style={styles.text}>Search Vehicles</Text>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text>Password</Text>
            <View style={styles.inputData}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input1, styles.passwordInput]}
                  placeholder="Enter Vehicle Number or Chasis Number"
                  value={vehicle_no}
                  onChangeText={(text) => setVehicle_no("vehicle_no", text)}
                />
                <Link
                  style={styles.icon}
                  as={TouchableOpacity}
                  href={"/QrScan"}
                >
                  <MaterialCommunityIcons
                    name="qrcode"
                    size={30}
                    color="white"
                  />
                </Link>
              </View>
            </View>
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
    marginTop: 70,
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
    marginTop: 25,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  card: {
    height: 230,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "gray",
    shadowColor: "#000",
    // borderWidth: 1,
    elevation: 60,
    marginTop: 50,
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
  inputContainer: {
    marginBottom: 25,
    marginTop: 20,
  },
  input1: {
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    marginRight: 10,
  },
  icon: {
    padding: 10,
    backgroundColor: "#f5c005",
  },
  inputData: {
    borderWidth: 1,
    borderColor: "#f5c005",
    borderRadius: 5,
    marginTop: 7,
  },
});
export default SearchVehicles;
