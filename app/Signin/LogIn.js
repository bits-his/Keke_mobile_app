import { useNavigation } from "expo-router";
import React, { useState, useContext } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/images/keke_napep.png";
import { AuthContext } from "../../context/Context";

export default function SignIn() {
  const navigation = useNavigation();
  const { setUser, setToken } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError(null); 

    fetch(`http://localhost:44405/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data.success) {
          setUser(data.user);
          setToken(data.token);

          if (data.user.account_type === "vehicle_owner") {
            navigation.navigate("main-body/DashBoard");
          } else {
            navigation.navigate("dashboard");
          }
        } else {
          setError(data.message || "Login failed. Please try again.");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("An error occurred. Please try again later.");
        console.error(err);
      });
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <View style={styles.container}>
      <View style={styles.signInCard}>
        <View style={styles.headerContainer}>
          <Image source={logo} style={styles.profile} />
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
            value={form.username}
            onChangeText={(text) => handleChange("username", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Password</Text>
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

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Logging in..." : "Submit"}</Text>
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
    backgroundColor: "#f5c005",
  },
  signInCard: {
    borderColor: "#f5c005",
    borderWidth: 1,
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
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
    borderColor: "#f5c005",
    borderWidth: 1,
    borderRadius: 5,
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
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  inputData: {
    borderWidth: 1,
    borderColor: "#f5c005",
    borderRadius: 5,
    marginTop: 7,
  },
  profile: {
    // width:
  },
  error: {
    color: "red",
    marginRight: "auto",
    width: "100%",
    textAlign: "center",
  },
});
