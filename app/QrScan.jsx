import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QrScan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    alert(`QR Code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        {!scanned ? (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        ) : (
          <View style={styles.scannedResult}>
            <Text>Scanned Data: {scannedData}</Text>
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scannerContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  scannedResult: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrScan;
