import { AsyncStorage } from "@react-native-async-storage/async-storage"; // Use AsyncStorage in React Native
import { Alert } from "react-native"; // For displaying errors or success messages

// Use your current middleware server URL here
export const server_url = "http://192.168.43.123:44405"; // Make sure this IP matches your local server address

// Helper function for handling errors globally
const handleError = (err) => {
  Alert.alert("Error", "An error occurred, please try again.");
  console.error(err); // You can log the error for debugging purposes
};

// POST request function for React Native
export const _post = async (url, data, success = (f) => f, error = (f) => f) => {
  try {
    const token = await AsyncStorage.getItem("@@token"); // Use AsyncStorage in React Native
    const response = await fetch(`${server_url}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Add token to the request if available
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    success(result);
  } catch (err) {
    handleError(err);
    error(err);
  }
};

// GET request function for React Native
export const _get = async (url, success = (f) => f, error = (f) => f) => {
  try {
    const response = await fetch(`${server_url}/${url}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    success(result);
  } catch (err) {
    handleError(err);
    error(err);
  }
};

// PUT request function for React Native
export const _put = async (url, data, success = (f) => f, error = (f) => f) => {
  try {
    const response = await fetch(`${server_url}/${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    success(result);
  } catch (err) {
    handleError(err);
    error(err);
  }
};

// Utility function to format a number with commas (React Native friendly)
export function formatNumber(n = 0) {
  if (typeof n !== "number" && typeof n !== "string") {
    return "0";
  }

  n = parseFloat(n);

  if (isNaN(n)) {
    return "0";
  }

  const formattedNumber = n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedNumber;
}

// Utility function to convert text into formatted paragraphs
export function toParagraph(text) {
  if (text) {
    let paragraphs = text.split("\n");

    for (let i = 0; i < paragraphs.length; i++) {
      paragraphs[i] = paragraphs[i].trim();

      if (paragraphs[i].length > 0) {
        paragraphs[i] = paragraphs[i][0].toUpperCase() + paragraphs[i].slice(1);
      }
    }

    return paragraphs.join("\n");
  }
}

// AsyncStorage helper function to set and get data (token management)
export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem("@@token", token);
  } catch (err) {
    console.error("Failed to store token", err);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("@@token");
    return token;
  } catch (err) {
    console.error("Failed to get token", err);
  }
};

// Separator function to add commas in numbers (React Native)
export const separator = (num) => {
  const x = Number(num);
  return x.toLocaleString("en-US");
};