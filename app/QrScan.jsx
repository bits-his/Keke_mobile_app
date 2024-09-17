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
      <View style={styles.scannerWrapper}>
        <View style={styles.frame}>
          {!scanned ? (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
          ) : (
            <View style={styles.scannedResult}>
              <Text>Scanned Data: {scannedData}</Text>
              <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
            </View>
          )}
          <View style={[styles.edge, styles.topLeft]} />
          <View style={[styles.edge, styles.topRight]} />
          <View style={[styles.edge, styles.bottomLeft]} />
          <View style={[styles.edge, styles.bottomRight]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerWrapper: {
    width: 250, 
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    width: '100%',
    height: '100%',
  },
  frame: {
    position: 'relative',
    width: 250, 
    height: 250,
    borderRadius: 10,
    overflow: 'hidden',
  },
  edge: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#f5c005',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  scannedResult: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QrScan;
