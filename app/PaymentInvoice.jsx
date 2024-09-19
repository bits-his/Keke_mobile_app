import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';

const PaymentInvoice = ({ route }) => {
  const { invoiceData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Invoice Details</Text>
      </View>

      <View style={styles.invoiceSection}>
        <Text style={styles.label}>Source ID:</Text>
        <Text style={styles.value}>{invoiceData.source_id}</Text>
      </View>

      <View style={styles.invoiceSection}>
        <Text style={styles.label}>Credit:</Text>
        <Text style={styles.value}>₦{invoiceData.credit}</Text>
      </View>

      <View style={styles.invoiceSection}>
        <Text style={styles.label}>Transaction ID:</Text>
        <Text style={styles.value}>{invoiceData.transaction_id}</Text>
      </View>

      <View style={styles.invoiceSection}>
        <Text style={styles.label}>Transaction Date:</Text>
        <Text style={styles.value}>
          {moment(invoiceData.created_at).format('MMM Do YYYY, h:mm:ss a')}
        </Text>
      </View>

      <View style={styles.amountSection}>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.total}>₦{invoiceData.credit}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for your payment!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  invoiceSection: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  amountSection: {
    marginVertical: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#777',
  },
});

export default PaymentInvoice;
