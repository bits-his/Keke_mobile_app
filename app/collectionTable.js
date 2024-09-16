import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    Button,
    StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // For selecting date range

export default function collectionTable() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    // Example dummy data for the table
    const sampleData = [
        { id: 1, date: "2023-09-14", batchNo: "B-001", chassisNo: "CH-12345" },
        { id: 2, date: "2023-09-15", batchNo: "B-002", chassisNo: "CH-12346" },
        { id: 3, date: "2023-09-16", batchNo: "B-003", chassisNo: "CH-12347" },
        { id: 4, date: "2023-09-17", batchNo: "B-004", chassisNo: "CH-12348" },
    ];

    // Filters the data within the date range
    const filterDataByDate = () => {
        const filteredData = sampleData.filter(
            (item) =>
                new Date(item.date) >= startDate && new Date(item.date) <= endDate
        );
        setData(filteredData);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerDashboard}>
                <Text style={styles.headerText}>My Total Collection</Text>
            </View>
            <View style={{ margin: 10 }}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Date</Text>
                    <Text style={styles.tableHeaderText}>vehicle No.</Text>
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
        height: 220,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginBottom: 50
    },
    headerText: {
        textAlign: 'center',
        fontSize: 25,
        marginTop: 120,
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
});