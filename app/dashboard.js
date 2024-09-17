import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, {useContext} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "./context/Context";


export default function DashBoard() {
  const { user, setUser, token, setToken } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.headerDashboard}>
                <Text>
                    {user.id}
                </Text>
                <Text style={styles.headerText}>Welcome To Agent DashBoard</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={styles.cards}>
                    <Link as={TouchableOpacity} href={"/collectionTable"}>
                        <Ionicons
                            style={styles.icon}
                            name="albums"
                            size={80}
                            color="#f5c005"
                        />
                    </Link>
                    <Link as={TouchableOpacity} href={"/collectionTable"}>
                        <Text style={styles.CardText}>My Collection</Text></Link>
                </View>
                <View style={styles.cards}>
                    <Link as={TouchableOpacity} href={"/searchVehicles"}>
                        <FontAwesome
                            style={styles.icon}
                            name="car"
                            size={80}
                            color="#f5c005"
                        />
                    </Link>
                    <Link as={TouchableOpacity} href={"/searchVehicles"}>
                        <Text style={styles.CardText}>Search Vehicle</Text>
                    </Link>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                {/* <View style={styles.cards}>
                    <Link as={TouchableOpacity} href={"/QrScan"}>
                        <MaterialIcons
                            style={styles.icon}
                            name="qr-code-scanner"
                            size={80}
                            color="#f5c005"
                        />
                    </Link>
                    <Link as={TouchableOpacity} href={"/QrScan"}>
                        <Text style={styles.CardText}>Scan QR Code</Text>
                    </Link>
                </View> */}
                <View style={styles.cards}>
                    <Link as={TouchableOpacity} href={"/TopupWallet"}>
                        <MaterialIcons
                            style={styles.icon}
                            name="add-circle-outline"
                            size={80}
                            color="#f5c005"
                        />
                    </Link>
                    <Link as={TouchableOpacity} href={"/TopupWallet"}>
                        <Text style={styles.CardText}>Top Up</Text>
                    </Link>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerDashboard: {
        backgroundColor: "#f5c005",
        height: 220,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom: 40
    },
    headerText: {
        textAlign: 'center',
        fontSize: 25,
        marginTop: 40,
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
        justifyContent: 'center',
        padding: 10,
        borderRadius: 15,
        borderColor: 'gray',
        shadowColor: "#000",
        elevation: 20,
        height: 180
    },
    icon: {

    },
    CardText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'gray'
    }
})
