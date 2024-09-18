import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const qrSize = width * 0.7;

const QrScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const url = new URL(data);
      const plate_no = new URLSearchParams(url.search).get('plate_no');

      if (plate_no) {
        navigation.navigate('QrResult', { plate_no });
      } else {
        alert('Invalid QR code: No plate number found.');
      }
    } catch (error) {
      alert('Invalid QR code format.');
      console.error(error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea}>
          <View style={styles.scanFrame} />
        </View>

        {!scanned && (
          <Text style={styles.instructionText}>Align the QR code within the frame</Text>
        )}

        {scanned && (
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.rescanButton}>
            <Text style={styles.rescanText}>Tap to scan again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5c005',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: qrSize,
    height: qrSize,
    borderWidth: 4,
    borderColor: '#f5c005',
    borderRadius: 10,
  },
  instructionText: {
    color: '#f5c005',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
  rescanButton: {
    position: 'absolute',
    bottom: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f5c005',
    borderRadius: 10,
  },
  rescanText: {
    color: '#000',
    fontSize: 16,
  },
});

export default QrScan;
