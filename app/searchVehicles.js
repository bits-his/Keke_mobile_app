import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { _get } from "./Helper";  // Assuming _get fetches data from your backend
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

const SearchVehicles = () => {
  const [vehicle_no, setVehicle_no] = useState("");
  const [vehiclesData, setVehiclesData] = useState([]);
  const navigation = useNavigation();

  // Fetch all vehicle data on component mount
  useEffect(() => {
    _get(`vehicles?query_type=select-all`, (resp) => {
      if (resp.success) {
        console.log("Fetched vehicles:", resp.data); // Log the fetched data
        setVehiclesData(resp.data); // Store the list of vehicles
      } else {
        Alert.alert('Error', 'Failed to load vehicles');
      }
    });
    return () => {
      console.log("Cleanup on unmount");
    };
  }, []);

  const handleSubmit = () => {
    // Trim input to avoid leading/trailing spaces
    const inputVehicleNo = vehicle_no.trim();

    // Search for the vehicle ID or chassis number in the fetched data
    const foundVehicle = vehiclesData.find(
      vehicle =>
        vehicle.vehicle_id.toLowerCase() === inputVehicleNo.toLowerCase() || 
        vehicle.chasis_no.toLowerCase() === inputVehicleNo.toLowerCase()
    );

    if (foundVehicle) {
      // Log the found vehicle details for debugging
      console.log("Found vehicle:", foundVehicle);

      // Navigate to the QrResult component with the found vehicle's plate number
      navigation.navigate('QrResult', { plate_no: foundVehicle.plate_no });
    } else {
      Alert.alert("No vehicle found", "Please enter a valid Vehicle ID or Chassis Number.");
    }
  };

  return (
    <View style={styles.containHeader}>
      <Text style={styles.text}>Search Vehicles</Text>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text>Search For Vehicle</Text>
            <View style={styles.inputData}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input1, styles.passwordInput]}
                  placeholder="Enter Vehicle ID or Chassis Number"
                  value={vehicle_no}
                  onChangeText={setVehicle_no} // Update the state with the input value
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
