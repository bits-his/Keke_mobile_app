import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    Button,
    StyleSheet,
} from "react-native";

export default function collectionTable() {
    const [search, setSearch] = useState("");

    const sampleData = [
        { id: 1, date: "2023-09-14", batchNo: "B-001", chassisNo: "CH-12345" },
        { id: 2, date: "2023-09-15", batchNo: "B-002", chassisNo: "CH-12346" },
        { id: 3, date: "2023-09-16", batchNo: "B-003", chassisNo: "CH-12347" },
        { id: 4, date: "2023-09-17", batchNo: "B-004", chassisNo: "CH-12348" },
    ];


    return (
        <View style={styles.container}>
            <View style={styles.headerDashboard}>
                <Text style={styles.headerText}>My Vehicles</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
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
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Date</Text>
                    <Text style={styles.tableHeaderText}>Vehicle No.</Text>
                    <Text style={styles.tableHeaderText}>Chassis No.</Text>
                </View>

                <View>
                    <Text style={styles.noDataText}>No data available for the selected date range.</Text>
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
        marginBottom: 40
    },
    headerText: {
        textAlign: 'center',
        marginTop: 40,
        fontSize: 20,
        color: "white",
        fontWeight: 'bold',
        fontFamily: 'Arial',
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
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 7,
        height: 40,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    },
});