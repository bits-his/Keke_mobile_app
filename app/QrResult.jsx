import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { _get } from './Helper';
// import QrScan from './QrScan';

const keke = require('../assets/images/keke_napep.png');
const brainstormLogo = require('../assets/images/logo.png');
import { separator } from './Helper';

const QrResult = () => {
  const route = useRoute();
  const { plate_no } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  const handleBackClick = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setLoading(true);
     _get(
       `vehicles?query_type=verify&plate_no=${plate_no}`,
       (resp) => {
         console.log(resp);
         setData(resp.data);
         if (resp.success) {
            setLoading(false);
         } else {
setLoading(false);
           Alert.alert("Error", "Failed to fetch data");
         }
         
       },
       (err) => {
         console.log(err);
       }
     );
    // fetch(`http:192.168.1.112:44405/vehicles?query_type=verify&plate_no=${plate_no}`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setLoading(false);
    //     if (response.success) {
    //       setData(response.data);
    //     } else {
    //       Alert.alert('Error', 'Failed to fetch data');
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setLoading(false);
    //   });
      // 20000
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
        <Text style={styles.backText}>{"<"} Back</Text>
      </TouchableOpacity>

      {data.length ? (
        <View style={styles.card}>
          <Text style={styles.verifiedText}>✅ VERIFIED</Text>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>PIN:</Text>
            <Text style={styles.infoData}>
              {data[0]?.pin?.toUpperCase() || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>VEHICLE MAKE:</Text>
            <Text style={styles.infoData}>
              {data[0]?.vehicle_make?.toUpperCase() || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>PLATE NUMBER:</Text>
            <Text style={styles.infoData}>
              {data[0]?.plate_no?.toUpperCase() || "N/A"}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.infoTitle}>EXPIRY DATE:</Text>
            <Text style={styles.infoData}>
              {data[0]?.expiry_date
                ? moment(data[0].expiry_date).format("YYYY-MM-DD")
                : "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>TOTAL LIABILITY:</Text>
            <Text style={styles.infoData}>
              {separator(data[0]?.liability) || "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.infoTitle}>LAST TRANSACTION:</Text>
            <Text style={styles.infoData}>
              {data[0]?.last_transaction_date?.toUpperCase() || "N/A"}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.centeredView}>
          <Text>Record Not Found</Text>
        </View>
      )}

      <View style={styles.footer}>
        {/* <View style={styles.footerItem}>
          <Image source={keke} style={styles.footerLogo} />
          <Text>POWERED BY</Text>
          <Text>KEKE NAPEP</Text>
        </View> */}
        <View style={styles.footerItem}>
          <Image source={brainstormLogo} style={styles.footerLogo} />
          
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
    justifyContent: 'end',
    marginTop: 20,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLogo: {
    width: 80,
    height: 50,
    marginBottom: 5,
  },
});

export default QrResult;