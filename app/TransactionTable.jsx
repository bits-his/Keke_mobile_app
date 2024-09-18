import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { _get, _post } from "./Helper";
import DateTimePicker from "@react-native-community/datetimepicker"; // For selecting date range
import { AuthContext } from "./context/Context";

export default function collectionTable() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  //   const getReg = useCallback(() => {
  //     _post(
  //       `top-up/history`,
  //       {
  //         source_id: user.account_id,
  //         type_of_top_up: "agent_top_up",
  //         query_type: "select_agent",
  //       },
  //       (resp) => {
  //         if (resp.success && resp.results) {
  //           setData(resp.results);
  //           console.log(resp.results)
  //         }
  //       }
  //     );
  //   }, []);

  useEffect(() => {
    console.log("i must");
    _post(
      `top-up/history`,
      {
        source_id: user.account_id,
        query_type: `select_${user.account_type}`,
      },
      (resp) => {
        if (resp.success && resp.results) {
          setData(resp.results);
          console.log(resp.results);
        }
      }
    );
  }, []);

  const sampleData = [
    {
      id: 1,
      source_id: "SPA00012",
      type_of_top_up: "super_agent_top_up",
      t_date: "2024-09-17",
      description: "Deposit to SPA00012",
      status: "success",
      credit: 1000,
      debit: 0,
      balance: "1000",
    },
    {
      id: 2,
      source_id: "SPA00012",
      type_of_top_up: "agent_top_up",
      t_date: "2024-09-17",
      description: "Withdrawal from SPA00012",
      status: "success",
      credit: 0,
      debit: 500,
      balance: "-500",
    },
  ];

  // Filters the data within the date range
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      {/* <Text style={styles.tableHeaderText}>Vehicle Id</Text>
      <Text style={styles.tableHeaderText}>Plate No</Text>
      <Text style={styles.tableHeaderText}>balance</Text> */}
    </View>
  );

  const renderTableRow = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style>{item.description}</Text>
        <Text style>{item.t_date}</Text>
        <View>
          <Text style>{item.credit}</Text>
          <Text style>{item.success}</Text>
        </View>
      </View>
      {/* <Text style={styles.tableCell}>{item.plate_no}</Text>
      <Text style={styles.tableCell}>{item.balance}</Text> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerDashboard}>
        <Text style={styles.headerText}>Transactions</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          keyboardType="email-address"
          value={search}
          onChangeText={(text) => setSearch("search", text)}
        />
        <Text style={styles.button}>Search</Text>
      </View>
      <View style={{ margin: 10 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderTableHeader}
          renderItem={renderTableRow}
        />

        <View>
          <Text style={styles.noDataText}>
            No data available for the selected date range.
          </Text>
        </View>
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
    textAlign: "center",
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
    textAlign: "center",
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
});
