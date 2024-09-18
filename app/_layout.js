import { Stack } from "expo-router";
import { Provider } from "./context/Context";

export default function RootLayout() {
  return (
    <Provider>
      <Stack>
        {/* <Stack.Screen
          name="index"
          options={{ title: "Welcome", headerShown: false }}
        /> */}
        <Stack.Screen
          name="dashBoard"
          options={{ title: "Dashboard", headerShown: true }}
        />
        {/* </Stack>

    <Stack> */}
        <Stack.Screen
          name="index"
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen
          name="collectionTable"
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="Topup"
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="QrScan"
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="dashboard"
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="TopupWallet"
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="searchVehicles"
          options={{ title: "", headerTransparent: true }}
        />
        <Stack.Screen
          name="main-body/DashBoard"
          options={{ title: "", headerShown: false }}
        />
      <Stack.Screen
        name="TransactionTable"
        options={{ title: "", headerTransparent: true }}
      />
      </Stack>
    </Provider>
  );
}