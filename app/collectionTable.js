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
import { _get } from "./Helper";
import DateTimePicker from "@react-native-community/datetimepicker"; // For selecting date range
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/Context";

export default function collectionTable() {
    const navigation = useNavigation()
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext)


    useEffect(() => {
        _get(`vehicles?query_type=select&owner_id=${user.account_id}`, (resp) => {
            if (resp.success && resp.data) {
                setData(resp.data);
                console.log(resp.data)
                //    setVehicleCount(resp.data[0].vehicle_count);
            }
        });
    }, []);
    const filterData = data.filter(item => item.vehicle_id.toLowerCase().includes(search.toLowerCase()) || item.plate_no.toLowerCase().includes(search.toLowerCase()))

    const renderTableHeader = () => (
        <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Vehicle Id</Text>
            <Text style={styles.tableHeaderText}>Plate No</Text>
            <Text style={styles.tableHeaderText}>balance</Text>
            <Text style={styles.tableHeaderText}>Action</Text>
        </View>
    );

    const renderTableRow = ({ item, i }) => (
        <View style={styles.tableRow} key={i}>
            <Text style={styles.tableCell}>{item.vehicle_id}</Text>
            <Text style={styles.tableCell}>{item.plate_no}</Text>
            <Text style={styles.tableCell}>{item.balance}</Text>
            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate("TopupWallet" ,{vehicle_id:item.vehicle_id,plate_no:item.plate_no})}>
                <Text style={styles.buttonText}>Top Up</Text>
            </TouchableOpacity>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.headerDashboard}>
                <Text style={styles.headerText}>My Vehicles</Text>
            </View>
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
            <View style={{ margin: 10 }}>
                <FlatList
                    data={filterData}
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
        marginBottom: 40
    },
    headerText: {
        textAlign: 'center',
        marginTop: 65,
        fontSize: 20,
        color: "white",
        fontWeight: 'bold',
        // fontFamily: 'Arial',
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
        backgroundColor: "#d9d9d9",
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
    button1: {
        backgroundColor: "#f5c005",
        padding: 8,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 11
    }
});
