import { Text, View } from "react-native";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {SearchIcon} from "@/components/ui/icon";
import {useEffect} from "react";
import {getTokenListService} from "@/services/services";


export default function Index() {

    useEffect(() => {
        const fetchData = async () => {
        const data = await getTokenListService()
        console.log(data)
        }
        fetchData()
    }, []);

  return (
    <View
        className={'flex flex-1 flex-col items-center justify-center'}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Input variant="outline" size="md">
            <InputSlot>
                <InputIcon as={SearchIcon} color="black" size="md" />
            </InputSlot>
            <InputField placeholder="Search here..." />
        </Input>
    </View>
  );
}
