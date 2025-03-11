import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return <GluestackUIProvider mode="light">
    <Stack
      screenOptions={{
          contentStyle: { backgroundColor: "#05121a",padding:16 },
        headerStyle: { backgroundColor: "#05121a" },
        headerTintColor: "#fff",
        headerTitle: 'BullPen app',
      }}
  /></GluestackUIProvider>;
}
