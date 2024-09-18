import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { _get } from './Helper'; // Assuming this is your fetch helper

const keke = require('../assets/images/keke_napep.png');
const brainstormLogo = require('../assets/images/logo.png');

const QrResult = () => {
  const route = useRoute();
  const { plate_no } = route.params;
  const [data, setData] = useState(null);  // Default to null to check existence
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleBackClick = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setLoading(true);
    
    // Assuming _get already returns the JSON data
    _get(`vehicles?query_type=verify&plate_no=${plate_no}`)
      .then((response) => {
        setLoading(false);
        if (response.success) {
          setData(response.data);
        } else {
          Alert.alert('Error', 'Failed to fetch data');
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Error', 'An error occurred while fetching data');
        setLoading(false);
      });
  }, [plate_no]);

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#f5c005" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackClick} style={styles.backButton}>
        <Text style={styles.backText}>{'<'} Back</Text>
      </TouchableOpacity>

      {data && data.length > 0 ? (  // Ensure data exists and has items
        <View style={styles.card}>
          <Text style={styles.verifiedText}>✅ VERIFIED</Text>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>PIN:</Text>
            <Text style={styles.infoData}>{data[0]?.pin?.toUpperCase() || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>VEHICLE MAKE:</Text>
            <Text style={styles.infoData}>{data[0]?.vehicle_make?.toUpperCase() || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>PLATE NUMBER:</Text>
            <Text style={styles.infoData}>{data[0]?.plate_no?.toUpperCase() || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>EXPIRY DATE:</Text>
            <Text style={styles.infoData}>
              {data[0]?.expiry_date ? moment(data[0].expiry_date).format('YYYY-MM-DD') : 'N/A'}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.centeredView}>
          <Text>Record Not Found</Text>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Image source={keke} style={styles.footerLogo} />
          <Text>POWERED BY</Text>
          <Text>KEKE NAPEP</Text>
        </View>
        <View style={styles.footerItem}>
          <Image source={brainstormLogo} style={styles.footerLogo} />
          <Text>DEVELOPED BY</Text>
          <Text>BRAINSTORM IT SOLUTIONS</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#f5c005',
    padding: 10,
    borderRadius: 5,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  verifiedText: {
    fontSize: 24,
    color: '#f5c005',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoData: {
    fontSize: 16,
    color: '#333',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLogo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
});

export default QrResult;
