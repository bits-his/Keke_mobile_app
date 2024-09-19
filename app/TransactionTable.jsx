import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { _get, _post, separator } from "./Helper";
import DateTimePicker from "@react-native-community/datetimepicker"; // For selecting date range
import { AuthContext } from "../context/Context";
import { useNavigation } from "expo-router";
import moment from "moment";

export default function collectionTable() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [dataBalace, setDataBalace] = useState([]);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  useEffect(() => {
    _post(
      `top-up/history`,
      {
        source_id: user.account_id,
        query_type: `history`,
        date_from: moment(fromDate).format("YYYY-MM-DD"),
        date_to: moment(toDate).format("YYYY-MM-DD"),
      },
      (resp) => {
        if (resp.success && resp.results) {
          setData(resp.results);
          console.log(resp.results);
        }
      }
    );
  }, [fromDate, toDate]);

  useEffect(() => {
    _post(
      `top-up/history`,
      {
        source_id: user.account_id,
        query_type: `history_total`,
        date_from: moment(fromDate).format("YYYY-MM-DD"),
        date_to: moment(toDate).format("YYYY-MM-DD"),
      },
      (resp) => {
        if (resp.success && resp.results) {
          setDataBalace(resp.results[0].balance);
          console.log(resp.results[0]);
        }
      }
    );
  }, [fromDate, toDate]);

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>S/N</Text>
      <Text style={styles.tableHeaderText}>Date</Text>
      <Text style={styles.tableHeaderText}>Account Id</Text>
      <Text style={styles.tableHeaderText1}>Amout</Text>
    </View>
  );

  const renderTableRow = ({ item, index }) => (
    <TouchableOpacity
      style={styles.border}
      onPress={() => { navigation.navigate("Invoice", { item }) }}
    >

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text>{index + 1}</Text>
          <Text style={styles.head}>{item.t_date}</Text>
          <Text style={styles.date}>{item.source_id}</Text>

          <Text style={styles.balance}>
            {item.credit != 0 ? `${item.credit}` : `${item.debit}`}
          </Text>

        </View>
      </View>
    </TouchableOpacity>
  );

  const filterData = data.filter(item => item.source_id.toLowerCase().includes(search.toLowerCase()))

  // Date Picker Handlers
  const showFromDatePickerHandler = () => {
    setShowFromDatePicker(true);
  };

  const showToDatePickerHandler = () => {
    setShowToDatePicker(true);
  };

  const handleFromDateChange = (event, selectedDate) => {
    setShowFromDatePicker(false);
    if (selectedDate) setFromDate(selectedDate);
  };

  const handleToDateChange = (event, selectedDate) => {
    setShowToDatePicker(false);
    if (selectedDate) setToDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerDashboard}>
        <Text style={styles.headerText}>Transactions</Text>
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#f5c005',
            padding: 10,
            borderRadius: 5,
            margin: 5,
            width: '45%'
          }}
          onPress={showFromDatePickerHandler}
        >
          <Text style={styles.datePickerLabel}>
            From: {moment(fromDate).format("YYYY-MM-DD")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#f5c005',
            padding: 10,
            borderRadius: 5,
            width: '45%',
            margin: 5
          }}
          onPress={showToDatePickerHandler}
        >
          <Text style={styles.datePickerLabel}>
            To: {moment(toDate).format("YYYY-MM-DD")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* DateTimePickers */}
      {showFromDatePicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display="default"
          onChange={handleFromDateChange}
        />
      )}
      {showToDatePicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display="default"
          onChange={handleToDateChange}
        />
      )}

      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          keyboardType="email-address"
          value={search}
          onChangeText={setSearch}

        />
        <Text style={styles.button}>Search</Text>
      </View>
      <View>
        <Text style={styles.balance}>Balance: {separator(dataBalace)}</Text>
      </View>
      <View style={{ margin: 10 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderTableHeader}
          renderItem={renderTableRow}
        />
        {filterData.length === 0 && (
          <View>
            <Text style={styles.noDataText}>
              No data available for the selected date range.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerDashboard: {
    backgroundColor: "#f5c005",
    height: 120,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 40,
  },
  head: {
    fontWeight: "bold",
  },
  border: {
    borderWidth: 1,
    borderLeftColor: "#dedede",
    borderRightColor: "#dedede",
    borderBottomColor: "white",
    borderTopColor: "white",
  },
  headerText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f5c005",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeaderText: {
    fontWeight: "bold",
    flex: 1,
  },
  tableHeaderText1: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "end",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    padding: 10,
  },
  noDataText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
  input: {
    height: 40,
    borderColor: "#f5c005",
    borderWidth: 1,
    width: "75%",
    paddingHorizontal: 10,
    marginTop: 7,
    marginLeft: 10,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    // borderRadius: 5
  },
  button: {
    backgroundColor: "#f5c005",
    padding: 8,
    width: "20%",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginTop: 7,
    height: 40,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    width: "100%",
  },
  datePickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f5c005",
  },
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f5c005",
    textAlign: "right",
    marginTop: 10,
    marginRight: 14,
  },
});
