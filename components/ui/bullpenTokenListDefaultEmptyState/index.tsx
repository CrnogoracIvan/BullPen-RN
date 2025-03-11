import {Text, View} from "react-native";
import {Icon, SearchIcon} from "@/components/ui/icon";

interface IProps {
    searchInProgress?: boolean;
}

export function BullpenTokenListDefaultEmptyState({searchInProgress}: IProps) {
    return (
        <View className={'flex flex-col flex-1 justify-center items-center'}>
            <View className={'flex flex-col items-center h-1/2'}>
                <View className={'flex flex-col justify-center items-center bg-primaryGreen/10 w-20 h-20 rounded-3xl'}>
                    <Icon as={SearchIcon} className={'text-primaryGreen'} size="xl"  />
                </View>
                <Text className={'mt-8 text-xl text-white'}>Search <Text className={'font-extrabold text-primaryGreen'}>Solana</Text> based address...</Text>
                {searchInProgress && <Text className={'mt-2 text-sm text-gray-400'}>No results found. Try searching something else...</Text>}
            </View>
        </View>
    )
}