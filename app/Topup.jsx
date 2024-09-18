import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'; // Import Alert
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

const Topup = () => {
  const [selectedOption, setSelectedOption] = useState('vehicle');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [ownerNumber, setOwnerNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [vehicleAmount, setVehicleAmount] = useState('');
  const [ownerAmount, setOwnerAmount] = useState('');
  const [vehicleError, setVehicleError] = useState('');
  const [ownerError, setOwnerError] = useState('');
  const [vehicleData, setVehicleData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const sourceId = 'VHC00001';

  // Fetch vehicle data
  const fetchVehicleData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.112:44405/vehicles?query_type=select-all');
      const respData = await response.json();

      if (response.ok) {
        const formattedData = respData.data.map((vehicle) => ({
          vehicle_id: vehicle.vehicle_id,
          plate_no: vehicle.plate_no,
        }));
        setVehicleData(formattedData);
      } else {
        console.error('Error fetching vehicle data');
        setVehicleData([]);
      }
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      setVehicleData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch owner data
  const fetchOwnerData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.112:44405/vehicle-owners?query_type=select-all');
      const respData = await response.json();

      if (response.ok) {
        const formattedData = respData.data.map((owner) => ({
          account_id: owner.account_id,
          name: owner.name,
        }));
        setOwnerData(formattedData);
      } else {
        console.error('Error fetching owner data');
        setOwnerData([]);
      }
    } catch (error) {
      console.error('Error fetching owner data:', error);
      setOwnerData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedOption === 'vehicle') {
      fetchVehicleData();
    } else if (selectedOption === 'owner') {
      fetchOwnerData();
    }
  }, [fetchVehicleData, fetchOwnerData, selectedOption]);

  // Handle vehicle number input change
  const handleVehicleNumberChange = (text) => {
    setVehicleNumber(text);

    if (Array.isArray(vehicleData)) {
      const matchingVehicle = vehicleData.find(vehicle => vehicle.vehicle_id === text);
      if (matchingVehicle) {
        setPlateNumber(matchingVehicle.plate_no);
        setVehicleError('');
      } else {
        setPlateNumber('');
        setVehicleError('Vehicle number not correct');
      }
    } else {
      setVehicleError('Vehicle data is not available');
    }
  };

  const handleOwnerNumberChange = (text) => {
    setOwnerNumber(text);

    if (Array.isArray(ownerData)) {
      const matchingOwner = ownerData.find(owner => owner.account_id === text);
      if (matchingOwner) {
        setOwnerName(matchingOwner.name);
        setOwnerError('');
      } else {
        setOwnerName('');
        setOwnerError('Owner number not correct');
      }
    } else {
      setOwnerError('Owner data is not available');
    }
  };

  const handleSubmit = async () => {
    const amount = selectedOption === 'vehicle' ? vehicleAmount : ownerAmount;
    const destinationId = selectedOption === 'vehicle' ? vehicleNumber : ownerNumber;

    const topupData = {
      query_type: 'top_up',
      source_id: sourceId,
      destination_id: destinationId,
      type_of_top_up: selectedOption,
      amount: amount,
      t_date: moment().format('YYYY-MM-DD'),
      date_from: null,
      date_to: null,
      balance: null,
    };

    try {
      const response = await fetch('http://192.168.1.112:44405/top-up/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topupData),
      });

      if (response.ok) {
        Alert.alert('Success', '✅Topup successful', [{ text: 'OK' }]);
        setVehicleNumber('');
        setPlateNumber('');
        setOwnerNumber('');
        setOwnerName('');
        setVehicleAmount('');
        setOwnerAmount('');
        setVehicleError('');
        setSelectedOption('vehicle');
      } else {
        Alert.alert('Error', 'Topup failed. Please try again.', [{ text: 'OK' }]);
      }
    } catch (error) {
      console.error('Error submitting topup:', error);
      Alert.alert('Error', 'There was an issue submitting the topup. Please try again later.', [{ text: 'OK' }]);
    }
  };

  return (
    <SafeAreaView style={styles.containHeader}>
      <Text style={styles.text}>TOP UP</Text>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, selectedOption === 'vehicle' && styles.selectedButton]}
              onPress={() => setSelectedOption('vehicle')}
            >
              <Text style={styles.buttonText}>Vehicle</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedOption === 'owner' && styles.selectedButton]}
              onPress={() => setSelectedOption('owner')}
            >
              <Text style={styles.buttonText}>Owner</Text>
            </TouchableOpacity>
          </View>

          {selectedOption === 'vehicle' ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter Vehicle Number"
                value={vehicleNumber}
                onChangeText={handleVehicleNumberChange}
              />
              {plateNumber ? <Text style={styles.infoText}>Plate Number: {plateNumber}</Text> : null}
              {vehicleError ? <Text style={styles.errorText}>{vehicleError}</Text> : null}
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
              {ownerName ? <Text style={styles.infoText}>Owner Name: {ownerName}</Text> : null}
              {ownerError ? <Text style={styles.errorText}>{ownerError}</Text> : null}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
    fontSize: 25,
    marginTop: 120,
    color: "white",
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  card: {
    height: 300,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f5c005',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#f5c005',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#f5c005',
    borderRadius: 5,
    marginBottom: 15,
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#f5c005',
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: '#000'
  },
  errorText: {
    color: 'red',
  },
});

export default Topup;
