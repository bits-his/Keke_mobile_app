import { Stack } from "expo-router";
import { Provider } from "./context/Context";

export default function RootLayout() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen
          name="dashBoard"
          options={{ title: "Dashboard", headerShown: true }}
        />
      </Stack>
    </Provider>
  );
}