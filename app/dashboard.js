import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, {useCallback, useContext, useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "./context/Context";
import { _get, separator } from "./Helper";


export default function DashBoard() {
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const [balance, setBalance] = useState("")
    const [showPassword, setShowPassword] = useState(false);

      const getBalance = useCallback(() => {
        _get(
          `balance?query_type=balance&source_id=${user.account_id}`,
          (resp) => {
            console.log(resp.results[0]);
            setBalance(resp.results[0].balance);
          },
          (err) => {
            console.log(err);
          }
        );
      }, [user]);
      useEffect(() => {
        getBalance();
      }, [showPassword]);
      console.log(user.account_id);
    return (
        <View style={styles.container}>
            <View style={styles.headerDashboard}>
                <Text style={styles.headerText}>Welcome {user.name}</Text>
                <View style={styles.accountBalance}>
                    <View style={{ flexDirection: 'row', width: '50%' }}>
                        <View style={styles.accountBalanceText}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    // alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                <Text style={styles.balance}>Available Balance </Text>
                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye" : "eye-off"}
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                            {showPassword ? <Text style={styles.amount}>N{separator(balance)}</Text> : <Text style={{
                                fontSize: 25,
                                textAlign: 'center',
                                color: '#FFF'
                            }}>****</Text>}
                        </View>
                    </View>
                    <View
                        style={styles.button}
                    >
                        <Ionicons
                            name="add"
                            size={20}
                            color="#000"
                            style={{
                                marginTop: 20,
                            }}
                        />
                        <Link
                            as={TouchableOpacity}
                            href={""}
                            style={{
                                textAlign: 'center',
                                color: '#f5c005',
                                fontWeight: 'bold',
                                textTransform: "capitalize",
                                width: '65%'
                            }}
                        >
                            add fund
                        </Link>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={styles.cards}>
                    <Link as={TouchableOpacity} href={"/TransactionTable"}>
                        <Ionicons
                            style={styles.icon}
                            name="albums"
                            size={80}
                            color="#f5c005"
                        />
                    </Link>
                    <Link as={TouchableOpacity} href={"/TransactionTable"}>
                        <Text style={styles.CardText}>My Transactions</Text></Link>
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
                <View style={styles.cards}>
                    <Link as={TouchableOpacity} href={"/Topup"}>
                        <MaterialIcons
                            style={styles.icon}
                            name="add-circle-outline"
                            size={80}
                            color="#f5c005"
                        />
                    </Link>
                    <Link as={TouchableOpacity} href={"/Topup"}>
                        <Text style={styles.CardText}>Top Up</Text>
                    </Link>
                </View>
                {/* <View style={styles.cards}>
                    <Link as={TouchableOpacity} href={"/QrScan"}>
                        <MaterialIcons
                            style={styles.icon}
                            name="add-circle-outline"
                            size={80}
                            color="#f5c005"
                        />
                    </Link>
                    <Link as={TouchableOpacity} href={"/QrScan"}>
                        <Text style={styles.CardText}>Scan  QRCode</Text>
                    </Link>
                </View> */}
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
        marginBottom: 40,
        flexDirection: 'column',
        width: "100%"
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 70,
        marginBottom: 20,
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
        marginLeft: 10
    },
    CardText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'gray'
    },
    accountBalance: {
        flexDirection: "row",
        width: "100%",
        padding: 15
    },
    accountBalanceText: {
        flexDirection: "column",
        width: "100%",
        // borderWidth: 1,
        // borderColor: '#000',
    },
    balance: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFF',
        textAlign: 'center',
    },
    amount: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FFF',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    plusIcon: {
        marginTop: 15,
        marginLeft: -20
    },
    button: {
        backgroundColor: "#fff",
        padding: 6,
        paddingTop: 7,
        width: '35%',
        color: "#f5c005",
        borderRadius: 50,
        marginLeft: 25,
        marginTop: 14,
        height: 35,
        flexDirection: 'row'
    }
})
