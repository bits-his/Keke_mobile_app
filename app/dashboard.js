import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DashBoard() {
    return (
        <View style={styles.container}>
            <View style={styles.headerDashboard}>
                <Text style={styles.headerText}>Welcome To Agent DashBoard</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={styles.cards}>
                    <Link as={TouchableOpacity} href={"/collectionTable"}>
                        <Ionicons
                            style={styles.icon}
                            name="albums"
                            size={70}
                            color="#f5c005"
                        />
                    </Link>
                    <Link as={TouchableOpacity} href={"/collectionTable"}>
                        <Text style={styles.CardText}>My Collection</Text></Link>
                </View>
                {/* <Link as={TouchableOpacity} style={{ width: '50%' }} href={"/dashBoard"}> */}
                <View style={styles.cards}>
                    <FontAwesome
                        style={styles.icon}
                        name="car"
                        size={70}
                        color="#f5c005"
                    />
                    <Text style={styles.CardText}>Search Vehicle</Text>
                </View>
                {/* </Link> */}
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                {/* <Link as={TouchableOpacity} style={{ width: '50%' }} href={"/dashBoard"}> */}
                <View style={styles.cards}>
                    <MaterialIcons
                        style={styles.icon}
                        name="qr-code-scanner"
                        size={70}
                        color="#f5c005"
                    />
                    <Text style={styles.CardText}>Scan QR Code</Text>
                </View>
                {/* </Link> */}
                <View style={styles.cards}>
                    {/* <Link as={TouchableOpacity} style={{ width: '50%' }} href={"/dashBoard"}> */}
                    <MaterialIcons
                        style={styles.icon}
                        name="add-circle-outline"
                        size={70}
                        color="#f5c005"
                    />
                    <Text style={styles.CardText}>Top Up</Text>
                </View>
                {/* // </Link> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    cards: {
        margin: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
        width: "45%",
        textAlign: "center",
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        borderColor: 'gray',
        shadowColor: "#000",
        elevation: 20
    },
    icon: {

    },
    CardText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'gray'
    }
})
