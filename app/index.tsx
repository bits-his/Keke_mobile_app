import { useNavigation } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import styles from "./GeneralStyles/Stylesheet";

export default function signIn() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.signIn_card}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Welcome to{" "}
            <Text style={{ fontWeight: "bold" }}>Keke Mobile App</Text> Please
            Log in
          </Text>
        </View>
        <View>
          <Text>UserName</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            keyboardType="email-address"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white", fontSize: 18 }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signIn_card: {
    borderWidth: 1,
    width: "90%",
    height: "auto",
    padding: 20,
    backgroundColor: "#f5c005",
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20
  }
});
