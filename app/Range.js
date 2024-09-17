import React from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';

export default function Range() {
    // Sample data (replace with your actual data)
    const data = [
        { id: '1', date: '2023-09-01', vehicleNo: 'ABC123', Amount: 5000 },
        { id: '2', date: '2023-09-02', vehicleNo: 'XYZ987', Amount: 6000 },
    ];

    const tableItems = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableCellWithBorder]}>{item.date}</Text>
            <Text style={[styles.tableCell, styles.tableCellVehicle]}>{item.vehicleNo}</Text>
            <Text style={styles.tableCellAmount}>{item.Amount}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Select Date Range</Text>
                <TextInput style={styles.input} placeholder="Enter date range" />
            </View>

            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Date</Text>
                    <Text style={[styles.tableHeaderText, styles.tableHeaderBorder]}>Vehicle No</Text>
                    <Text style={[styles.tableHeaderText, styles.tableHeaderAmount]}>Amount</Text>
                </View>

                {data && data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={tableItems}
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    <Text style={styles.noDataText}>There is no data to display</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tableHeader: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#f5c005',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: '#ccc',
    },
    tableHeaderAmount: {
        borderColor: '#ccc',
        paddingVertical: 5,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'semibold',
        fontSize: 12,
        paddingLeft: 17,
        paddingTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'stretch',
    },
    tableCell: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    tableCellWithBorder: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    tableHeaderBorder: {
        // borderLeftWidth: 1,
        borderColor: '#ccc',
        // borderRightWidth: 1,
        paddingLeft: 5,
    },
    tableCellVehicle: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
    },
    tableCellAmount: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
        textAlign: 'left',
        borderLeftWidth: 1,
        borderHeight: 20,
        borderLeftColor: '#ccc',
        paddingLeft: 10,
    },
    noDataText: {
        padding: 10,
        textAlign: 'center',
        color: '#666',
    },
});
