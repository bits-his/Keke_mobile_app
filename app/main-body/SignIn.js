import { Link, useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import logo from "../../assets/images/keke_napep.png"
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.signInCard}>
        <View style={styles.headerContainer}>
          <Image
            source={logo}
            style={styles.profile}
          />
          <Text style={styles.headerText}>
            Welcome to <Text style={styles.boldText}>Keke Mobile App</Text>{" "}
            Please Log in
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text>UserName</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <View style={styles.inputData}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input1, styles.passwordInput]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={form.password}
                onChangeText={(text) => handleChange("password", text)}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Link as={TouchableOpacity} style={styles.button} href={"/Topup"}>Submit</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5c005",
  },
  signInCard: {
    borderColor: "#f5c005",
    borderWidth: 1,
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5, // Adds shadow effect on Android
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#f5c005",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 7,
  },
  input1: {
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    marginRight: 10,
  },
  icon: {
    padding: 10,
  },
  button: {
    backgroundColor: "#f5c005",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20
  },
  inputData: {
    borderWidth: 1,
    borderColor: '#f5c005',
    borderRadius: 5,
    marginTop: 7,
  },
  profile: {
    // width: 
  }
});
