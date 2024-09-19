import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const TransactionDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Transaction Details</Text>
      </View>

      <View style={styles.transferInfo}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.transferText}>Transfer to Sadiq Haruna</Text>
        <Text style={styles.amount}>₦850.00</Text>
        <Text style={styles.status}>Successful</Text>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <Text style={styles.statusTitle}>Payment successful</Text>
          <Text style={styles.statusTime}>09-18 05:49:09</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusTitle}>Processing by bank</Text>
          <Text style={styles.statusTime}>09-18 05:49:09</Text>
        </View>
        <View style={styles.statusItem}>
          <Text style={styles.statusTitle}>Received by bank</Text>
          <Text style={styles.statusTime}>09-18 05:50:16</Text>
        </View>
      </View>

      <View style={styles.amountSection}>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amountValue}>₦850.00</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Fee</Text>
          <Text style={styles.amountValue}>₦0.00</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.amountLabel}>Amount Paid</Text>
          <Text style={styles.amountValue}>₦850.00</Text>
        </View>
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.sectionTitle}>Transaction Details</Text>
        <Text style={styles.detailText}>Sadiq Haruna</Text>
        <Text style={styles.detailText}>Transaction Type: Transfer Vendor Top Up</Text>
        <Text style={styles.detailText}>Transaction Number: 240918024569587926</Text>
        <Text style={styles.detailText}>Payment Method: Wallet</Text>
        <Text style={styles.detailText}>Transaction Date: Sep 18th, 2024 05:49:09</Text>
        <Text style={styles.detailText}>SessionID: 00000§§§§00000</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Report an issue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share Receipt</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transferInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5c005',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  transferText: {
    fontSize: 16,
    marginBottom: 5,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 18,
    color: 'green',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusItem: {
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  statusTime: {
    fontSize: 12,
    color: '#888',
  },
  amountSection: {
    marginBottom: 20,
  },
  amountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  amountLabel: {
    fontSize: 16,
  },
  amountValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDetails: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#f5c005',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
//fefedfef

export default TransactionDetails;
