import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
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
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="TopupWallet"
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="searchVehicles"
        options={{ title: "", headerTransparent: true }}
      />
    </Stack>
  );
}