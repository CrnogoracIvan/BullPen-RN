import { Text, View } from "react-native";
import {Input, InputField, InputIcon} from "@/components/ui/input"


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
        >
            <InputIcon>{/* Some Icon Component */}</InputIcon>
            <InputField placeholder="Enter Text here..." />
        </Input>
    </View>
  );
}
