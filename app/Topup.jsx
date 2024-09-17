import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Topup = () => {
  const [selectedOption, setSelectedOption] = useState('vehicle');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [amount, setAmount] = useState('');
  const [vehicleError, setVehicleError] = useState('');

  // Fetch owner name based on vehicle number
  useEffect(() => {
    if (vehicleNumber) {
      fetchOwnerName(vehicleNumber);
    } else {
      setOwnerName('');
    }
  }, [vehicleNumber]);

  const fetchOwnerName = async (vehicleNumber) => {
    try {
      // Assuming the API endpoint is something like /api/vehicles/{vehicleNumber}
      const response = await fetch(`https://your-backend-api.com/api/vehicles/${vehicleNumber}`);
      if (response.ok) {
        const data = await response.json();
        if (data.ownerName) {
          setOwnerName(data.ownerName);
          setVehicleError('');
        } else {
          setOwnerName('');
          setVehicleError('Vehicle not found');
        }
      } else {
        setOwnerName('');
        setVehicleError('Vehicle not found');
      }
    } catch (error) {
      setVehicleError('Error fetching vehicle information');
      setOwnerName('');
    }
  };

  const handleSubmit = async () => {
    const topupData = {
      vehicleNumber,
      ownerName,
      amount,
    };

    try {
      const response = await fetch('https://your-backend-api.com/api/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topupData),
      });

      if (response.ok) {
        console.log('Topup successful');
        // Handle success response
      } else {
        console.log('Error during topup');
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting topup:', error);
    }
  };

  return (
    <View style={styles.containHeader}>
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
                onChangeText={setVehicleNumber}
              />
              {ownerName ? <Text style={styles.ownerName}>Owner: {ownerName}</Text> : null}
              {vehicleError ? <Text style={styles.errorText}>{vehicleError}</Text> : null}
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Enter Owner Name"
              value={ownerName}
              onChangeText={setOwnerName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
          />
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
  ownerName: {
    marginBottom: 10,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: 'red',
  },
});

export default Topup;
