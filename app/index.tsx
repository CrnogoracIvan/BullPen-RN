import {Pressable, ScrollView, Text, View} from "react-native";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {CloseIcon, Icon, SearchIcon} from "@/components/ui/icon";
import {useEffect, useState} from "react";
import {getTokenListService} from "@/services/services";
import {Avatar, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar";
import {formatNumber} from "@/utils/utils";
import {ITokenListItem} from "@/utils/types";
import {BullPenTokenCard} from "@/components/ui/bullpenTokenCard";


export default function Index() {
    const [tokenList, setTokenList] = useState([]);
    const [filteredTokeList, setFilteredTokenList] = useState([]);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const fetchData = async () => {
        const {data} = await getTokenListService()
            console.log("Fetching data", data)
            if (!data) {
                return
            }
            setTokenList(data.tokens);
        }
        fetchData()
    }, []);


    useEffect(() => {
        const filteredList = tokenList.filter((token:ITokenListItem)=>(token.address.includes(searchText)));
        console.log('search text: ', searchText);
        console.log('filteredList: ', filteredList);
        if (filteredList.length) {
            setFilteredTokenList(filteredList);
        } else {
            setFilteredTokenList(tokenList);
        }
    }, [searchText, tokenList]);


    const renderSearchField = () => {
        return (
            <Input
                size="md"
                className={`p-2 bg-primaryCardBackground border-primaryBorder mb-2 h-16 rounded-xl`}
            >
                <InputSlot>
                    <InputIcon as={SearchIcon} className={'text-gray-50 '} size="md" />
                </InputSlot>
                <InputField
                    value={searchText}
                    placeholder="Search Solana address here..."
                    onChangeText={(newText) => setSearchText(newText)}
                    className="text-white"
                />
                <InputSlot>
                    <Pressable onPress={() => setSearchText("")}>
                        <InputIcon as={CloseIcon} className={'text-gray-50'} size="md" />
                    </Pressable>
                </InputSlot>
            </Input>
        );
    };


    const renderEmptyState = () => (
        <View>
            <Icon as={SearchIcon} size="lg" color="blue" />
            <Text>Search Solana based address</Text>
        </View>
    )

    const renderList = () => (
        <ScrollView className={'overflow-hidden'}>
            {filteredTokeList.length && filteredTokeList.map((token: ITokenListItem) => (
                <BullPenTokenCard  key={token.address} token={token}/>
            ))}
        </ScrollView>
    )

  return (
    <View className={'flex flex-1 flex-col items-center justify-center'}>
        {renderSearchField()}
        {filteredTokeList.length ? renderList() : renderEmptyState()}
    </View>
  );
}
