import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import SignIn from "./Signin/LogIn";
// import SignIn from "./Signin/LogIn";

export default function index() {
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
      <SignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  }
});
