import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native"; // Import Alert
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import { _get, _post } from "./Helper";
import { AuthContext } from "../context/Context";
import { useNavigation } from "expo-router";

const Topup = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("vehicle");
  const { user, balance } = useContext(AuthContext);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [ownerNumber, setOwnerNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [vehicleAmount, setVehicleAmount] = useState("");
  const [ownerAmount, setOwnerAmount] = useState("");
  const [vehicleError, setVehicleError] = useState("");
  const [ownerError, setOwnerError] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const sourceId = user.account_id;
  // const [balance, setBalance] = useState([]);

  const fetchVehicleData1 = useCallback(() => {
    _get(
      `vehicles?query_type=select-all`,
      (resp) => {
        console.log("vehicle data", resp.data[0]);
        const formattedData = resp.data.map((vehicle) => ({
          vehicle_id: vehicle.vehicle_id,
          plate_no: vehicle.plate_no,
        }));
        console.log("data", formattedData);
        setVehicleData(formattedData);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const fetchOwnerData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.1.112:44405/vehicle-owners?query_type=select-all"
      );
      const respData = await response.json();

      if (response.ok) {
        const formattedData = respData.data.map((owner) => ({
          account_id: owner.account_id,
          name: owner.name,
        }));
        setOwnerData(formattedData);
      } else {
        console.error("Error fetching owner data");
        setOwnerData([]);
      }
    } catch (error) {
      console.error("Error fetching owner data:", error);
      setOwnerData([]);
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchOwnerData1 = useCallback(async () => {
    setLoading(true);
    _get(
      `vehicle-owners?query_type=select-all`,
      (resp) => {
        console.log(resp);
        const formattedData = resp.data.map((owner) => ({
          account_id: owner.account_id,
          name: owner.name,
        }));
        setOwnerData(formattedData);
      },
      (error) => {
        console.log("Error fetching owner data:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (selectedOption === "vehicle") {
      fetchVehicleData1();
    } else if (selectedOption === "owner") {
      fetchOwnerData1();
    }
  }, [fetchVehicleData1, fetchOwnerData1, selectedOption]);

  // Handle vehicle number input change
  const handleVehicleNumberChange = (text) => {
    setVehicleNumber(text);

    if (Array.isArray(vehicleData)) {
      const matchingVehicle = vehicleData.find(
        (vehicle) => vehicle.vehicle_id === text
      );
      if (matchingVehicle) {
        setPlateNumber(matchingVehicle.plate_no);
        setVehicleError("");
      } else {
        setPlateNumber("");
        setVehicleError("Vehicle number not correct");
      }
    } else {
      setVehicleError("Vehicle data is not available");
    }
  };

  const handleOwnerNumberChange = (text) => {
    setOwnerNumber(text);

    if (Array.isArray(ownerData)) {
      const matchingOwner = ownerData.find(
        (owner) => owner.account_id === text
      );
      if (matchingOwner) {
        setOwnerName(matchingOwner.name);
        setOwnerError("");
      } else {
        setOwnerName("");
        setOwnerError("Owner number not correct");
      }
    } else {
      setOwnerError("Owner data is not available");
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    console.log("owner")
    const amount = selectedOption === "vehicle" ? vehicleAmount : ownerAmount;
    const destinationId =
      selectedOption === "vehicle" ? vehicleNumber : ownerNumber;

    const topupData = {
      query_type: "top_up",
      source_id: sourceId,
      destination_id: destinationId,
      type_of_top_up: `${selectedOption}_top_up`,
      amount: amount,
      t_date: moment().format("YYYY-MM-DD"),
      date_from: null,
      date_to: null,
    };
    if (balance < amount) {
      Alert.alert("Error", "⛔️Insufficient Balance Please fund Wallet.", [
        { text: "OK" },
      ]);
    } else {
      _post(
        `top-up/create`,
        topupData,
        (resp) => {
          if (resp.success) {
            setModalMessage("✅Topup successful");
            setShowModal(true);
            setIsSuccess(true);
            // Alert.alert("Success", "✅Topup successful", [{ text: "OK" }]);
            setVehicleNumber("");
            setPlateNumber("");
            setOwnerNumber("");
            setOwnerName("");
            setVehicleAmount("");
            setOwnerAmount("");
            setVehicleError("");
            setSelectedOption("vehicle");
          } else {
            setModalMessage("Topup failed. Please try again.");
            setShowModal(true);
            setIsSuccess(false);
            // Alert.alert("Error", "Topup failed. Please try again.", [
            //   { text: "OK" },
            // ]);
          }
        },
        (err) => {
          console.error("Error submitting topup:", err);
          setModalMessage(
            "There was an issue submitting the topup. Please try again later.");
          setShowModal(true)
          setIsSuccess(false)
          setIsSuccess(false);
        }
      );
    }
  };

  return (
    <SafeAreaView style={styles.containHeader}>
      <Text style={styles.text}>TOP UP</Text>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.buttonGroup}>
            {/* <Text>{balance}</Text> */}
            <TouchableOpacity
              style={[
                styles.button,
                selectedOption === "vehicle" && styles.selectedButton,
              ]}
              onPress={() => setSelectedOption("vehicle")}
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
            </TouchableOpacity>
          </View>

          {selectedOption === "vehicle" ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Vehicle Number"
                value={vehicleNumber}
                onChangeText={handleVehicleNumberChange}
              />
              {plateNumber ? (
                <Text style={styles.infoText}>Plate Number: {plateNumber}</Text>
              ) : null}
              {vehicleError ? (
                <Text style={styles.errorText}>{vehicleError}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                value={vehicleAmount}
                keyboardType="numeric"
                onChangeText={setVehicleAmount}
              />
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Owner Number"
                value={ownerNumber}
                onChangeText={handleOwnerNumberChange}
              />
              {ownerName ? (
                <Text style={styles.infoText}>Owner Name: {ownerName}</Text>
              ) : null}
              {ownerError ? (
                <Text style={styles.errorText}>{ownerError}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                value={ownerAmount}
                keyboardType="numeric"
                onChangeText={setOwnerAmount}
              />
            </>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          visible={showModal}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.alertBox}>
              <Text style={styles.message}>{modalMessage}</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false)
                  if (isSuccess) {
                    navigation.navigate("TransactionTable");
                  }
                }}
                style={styles.okButton}
              >
                <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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
    height: 120,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 25,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Arial",
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
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f5c005",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "#f5c005",
  },
  buttonText: {
    textAlign: "center",
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
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  errorText: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: "#f5c005",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okText: {
    color: "white",
    fontSize: 16,
  },
});
export default Topup;
