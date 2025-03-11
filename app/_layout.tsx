import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return <GluestackUIProvider mode="light">
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000" }, // Black header
        headerTintColor: "#fff", // White text/icons
        headerTitle: 'My application',
      }}
  /></GluestackUIProvider>;
}
