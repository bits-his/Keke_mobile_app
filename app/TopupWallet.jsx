import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal
} from "react-native";
import { _get, _post } from "./Helper";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/Context";
import moment from "moment";
import { Link, useNavigation } from "expo-router";

const TopupWallet = () => {
  const route = useRoute();
  const navigation = useNavigation()
  const { vehicle_id, plate_no } = route.params;
  const { balance, user } = useContext(AuthContext)
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    console.log("Vehicle", balance);
    const sourceId = user.account_id

    const topupData = {
      query_type: "top_up",
      source_id: sourceId,
      destination_id: vehicle_id,
      type_of_top_up: `vehicle_top_up`,
      amount: amount,
      t_date: moment().format("YYYY-MM-DD"),
      date_from: null,
      date_to: null,
    };
    if (balance < amount) {
      setModalMessage("⛔️Insufficient Balance Please fund Wallet.");
      setShowModal(true);
    } else {
      _post(
        `top-up/create`,
        topupData,
        (resp) => {
          if (resp.success) {
            setModalMessage("✅Topup successful.");
            setShowModal(true);
            setIsSuccess(true);
          } else {
            setModalMessage("Topup failed. Please try again.");
            setShowModal(true);
            setIsSuccess(false);
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
    <View style={styles.containHeader}>
      <Text style={styles.text}>Top Up Vehicle</Text>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.buttonGroup}>
          </View>

          <View>
            <Text>Vehicle Id</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Vehicle Number"
              value={vehicle_id}
              editable={false}
            />
          </View>
          <Text style={styles.infoText}>Plate Number: {plate_no}</Text>
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
                  navigation.navigate("main-body/DashBoard");
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
    marginTop: 65,
    color: "white",
    fontWeight: "bold",
    // fontFamily: "Arial",
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
export default TopupWallet;
