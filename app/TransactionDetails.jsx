import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';

const TransactionDetails = () => {
    const route = useRoute();
    const { details } = route.params;

    const qrValue = JSON.stringify({
        source_id: details.source_id,
        credit: details.credit,
        transaction_id: details.transaction_id,
        created_at: details.created_at,
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Payment Receipt Details</Text>
            </View>

            <View style={styles.transferInfo}>
                <QRCode
                    value={qrValue}
                    size={100}
                    backgroundColor="white"
                    color="black"
                />
                <Text style={styles.amount}>₦{details.credit}</Text>
                <Text style={styles.status}>Successful</Text>
            </View>

            <View style={styles.amountSection}>
                {/* <View style={styles.amountItem}>
                    <Text style={styles.amountLabel}>Amount</Text>
                    <Text style={styles.amountValue}>₦{details.credit}</Text>
                </View> */}
                <View style={styles.amountItem}>
                    <Text style={styles.amountLabel}>Amount Paid</Text>
                    <Text style={styles.amountValue}>₦{details.credit}</Text>
                </View>
            </View>

            <View style={styles.transactionDetails}>
                <Text style={styles.sectionTitle}>Transaction Details</Text>
                <Text style={styles.detailText}>{details.source_id}</Text>
                <View style={styles.details}>
                    <Text style={styles.detailText}>Transaction Type</Text>
                    <Text>Top Up </Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailText}>Transaction Number:</Text>
                    <Text style={styles.detailText}>{details.transaction_id}</Text>
                    <Text style={styles.amount}>{details.amount}</Text>
                </View>

                <View style={styles.details}>
                    <Text style={styles.detailText}>Payment Method: </Text>
                    <Text style={styles.detailText}>Wallet</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailText}>Transaction Date:</Text>
                    <Text style={styles.detailText}>
                        {moment(details.created_at).format("MMM Do YYYY, h:mm:ss a")}
                    </Text>
                </View>
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
  transferInfo: {
    alignItems: 'center',
    marginBottom: 20,
},
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
//fefedfe

export default TransactionDetails;
