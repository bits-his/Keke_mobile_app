import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { _get } from "./Helper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useNavigation } from "expo-router";

const SearchVehicles = () => {
  const [plate_no, setPlate_no] = useState("");
  const navigation = useNavigation()

  const handleSubmit = () => {
    console.log(`Vehicle Number: ${plate_no}`);
             navigation.navigate("QrResult", { plate_no });
   
  };
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

  // const handleSubmit = () => {
  //   // Trim input to avoid leading/trailing spaces
  //   const inputVehicleNo = vehicle_no.trim();

  //   // Search for the vehicle ID or chassis number in the fetched data
  //   const foundVehicle = vehiclesData.find(
  //     vehicle =>
  //       vehicle.vehicle_id.toLowerCase() === inputVehicleNo.toLowerCase() || 
  //       vehicle.chasis_no.toLowerCase() === inputVehicleNo.toLowerCase()
  //   );

  //   if (foundVehicle) {
  //     // Log the found vehicle details for debugging
  //     console.log("Found vehicle:", foundVehicle);

  //     // Navigate to the QrResult component with the found vehicle's plate number
  //     navigation.navigate('QrResult', { plate_no: foundVehicle.plate_no });
  //   } else {
  //     Alert.alert("No vehicle found", "Please enter a valid Vehicle ID or Chassis Number.");
  //   }
  // };

  return (
    <View style={styles.containHeader}>
      <Text style={styles.text}>Search Vehicles</Text>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text>Plate No</Text>
            <View style={styles.inputData}>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input1, styles.passwordInput]}
                  placeholder="Enter Vehicle Number or Chasis Number"
                  value={plate_no}
                  onChangeText={(text) => setPlate_no (text)}
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
    marginTop: 65,
    color: "white",
    fontWeight: "bold",
    // fontFamily: "Arial",
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
    marginTop: 80,
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
