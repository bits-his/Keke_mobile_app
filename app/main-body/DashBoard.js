import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { AuthContext } from "../../context/Context";
import { _get, separator } from "../Helper";

export default function DashBoard({ navigation }) {
  const { user, setUser, token, setToken } = useContext(AuthContext);
  const [balance, setBalance] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigation();

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerDashboard}>
        <Text style={styles.headerText}>Welcome {user.name}</Text>
        <View style={styles.accountBalance}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <View style={styles.accountBalanceText}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  // alignItems: 'center',
                  justifyContent: "center",
                }}
              >
                <Text style={styles.balance}>Wallet Balance</Text>
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
              {showPassword ? (
                <Text style={styles.amount}>N{separator(balance)}.00</Text>
              ) : (
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: "center",
                    color: "#FFF",
                  }}
                >
                  ****
                </Text>
              )}
            </View>
          </View>
          <View style={styles.button}>
            <Link
              as={TouchableOpacity}
              href={""}
              style={{
                textAlign: "center",
                color: "#f5c005",
                fontWeight: "bold",
                textTransform: "capitalize",
                width: "65%",
              }}
            >
              add fund
            </Link>
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "100%", marginTop: 30 }}>
          <View style={styles.cards}>
            <Link as={TouchableOpacity} href={"/TransactionTable"}>
              <AntDesign
                name="book"
                style={styles.icon}
                size={80}
                color="#f5c005"
              />
            </Link>
            <Link as={TouchableOpacity} href={"/TransactionTable"}>
              <Text style={styles.CardText}>My Transaction</Text>
            </Link>
          </View>
          {/* <View style={styles.cards}>
            <Link as={TouchableOpacity} href={"/TopupWallet"}>
              <AntDesign
                name="creditcard"
                style={styles.icon}
                size={80}
                color="#f5c005"
              />
            </Link>
            <Link as={TouchableOpacity} href={"/TopupWallet"}>
              <Text style={styles.CardText}>Top Up</Text>
            </Link>
          </View> */}
          <View style={styles.cards}>
            {/* <Link as={TouchableOpacity} href={"/collectionTable"}> */}
            <AntDesign
              name="bank"
              style={styles.icon}
              size={80}
              color="#f5c005"
            />
            {/* </Link> */}
            {/* <Link as={TouchableOpacity} href={"/searchVehicles"}> */}
            <Text style={styles.CardText}>Fund Vehicle</Text>
            {/* </Link> */}
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}></View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={styles.cards}>
            <Link as={TouchableOpacity} href={"/collectionTable"}>
              <FontAwesome
                style={styles.icon}
                name="truck"
                size={80}
                color="#f5c005"
              />
            </Link>
            <Link as={TouchableOpacity} href={"/collectionTable"}>
              <Text style={styles.CardText}>My Vehicle</Text>
            </Link>
          </View>

          {/* <View style={styles.cards}>
            <Link as={TouchableOpacity} href={"/collectionTable"}>
              <FontAwesome
                style={styles.icon}
                name="car"
                size={80}
                color="#f5c005"
              />
            </Link>
            <Link as={TouchableOpacity} href={"/collectionTable"}>
              <Text style={styles.CardText}>Search Vehicle</Text>
            </Link>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
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
    marginBottom: 60,
    flexDirection: "column",
    width: "100%",
  },
  headerText: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 70,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  cards: {
    margin: 10,
    borderWidth: 1,
    backgroundColor: "#fff",
    width: "45%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    borderColor: "gray",
    shadowColor: "#000",
    elevation: 20,
    height: 170,
  },
  icon: {
    marginLeft: 10,
  },
  CardText: {
    fontSize: 20,
    fontWeight: "500",
    color: "gray",
  },
  accountBalance: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
  },
  accountBalanceText: {
    flexDirection: "column",
    width: "100%",
  },
  balance: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
    textAlign: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFF",
    // fontStyle: 'italic',
    textAlign: "center",
    fontWeight: "900",
  },
  plusIcon: {
    marginTop: 15,
    marginLeft: -20,
  },
  button: {
    backgroundColor: "#fff",
    padding: 6,
    paddingTop: 7,
    width: "35%",
    color: "#f5c005",
    borderRadius: 50,
    marginLeft: 25,
    marginTop: 14,
    height: 35,
    flexDirection: "row",
  },
});
