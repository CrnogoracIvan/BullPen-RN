import {Pressable, ScrollView, Text, View} from "react-native";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {CloseIcon, Icon, SearchIcon} from "@/components/ui/icon";
import {useEffect, useState} from "react";
import {getTokenListService} from "@/services/services";
import {Avatar, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar";
import {formatNumber} from "@/utils/utils";
import {ITokenListItem} from "@/utils/types";


export default function Index() {
    const [tokenList, setTokenList] = useState([]);
    const [filteredTokeList, setFilteredTokenList] = useState([]);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        const fetchData = async () => {
        const {data} = await getTokenListService()
            if (!data) {
                return
            }
            setTokenList(data.tokens);
        }
        fetchData()
    }, []);


    useEffect(() => {
        const filteredList = tokenList.filter((token:ITokenListItem)=>(token.address === searchText));
        console.log('filteredList: ', filteredList);
        if (filteredList.length) {
            setFilteredTokenList(filteredList);
        } else {
            setFilteredTokenList(tokenList);
        }
    }, [searchText, tokenList]);

    const renderSearchFiled = () => (
        <Input variant="outline" size="md">
            <InputSlot>
                <InputIcon as={SearchIcon} color="black" size="md" />
            </InputSlot>
            <InputField value={searchText} placeholder="Search here..." onChangeText={(newText)=>setSearchText(newText)} />
            <InputSlot>
                <Pressable onPress={() => setSearchText("")}>
                    <InputIcon as={CloseIcon} color="gray" size="md" />
                </Pressable>
            </InputSlot>
        </Input>
    )


    const renderEmptyState = () => (
        <View>
            <Icon as={SearchIcon} size="lg" color="blue" />
            <Text>Search Solana based address</Text>
        </View>
    )

    const renderList = () => (
        <ScrollView>
            {filteredTokeList.length && filteredTokeList.map((token: ITokenListItem) => (
                <View key={token.address} className={'flex flex-row w-full rounded-xl h-20 bg-primaryCardBackground mt-4 items-center p-4'}>
                    <View className={'flex w-1/6'}>
                        <Avatar size="md">
                            <AvatarFallbackText>{token.symbol}</AvatarFallbackText>
                            <AvatarImage
                                source={{
                                    uri: token.logoURI,
                                }}
                            />
                        </Avatar>
                    </View>
                    <View className={'flex w-5/6'}>
                        <View className={'flex flex-col'}>
                            <View className={'flex flex-row items-center'}>
                                <Text className={'text-xl text-white font-bold'}>{token.symbol}</Text>
                                <Text className={'pl-2 text-xs text-gray-50'}>{token.name}</Text>
                            </View>
                            <View className={'flex flex-row'}>
                                <Text className={'text-sm text-white border border-secondaryBorder rounded p-2'}>P:{Number(token.price).toFixed(2)}$</Text>
                                <Text className={'text-md text-white'}>L:{formatNumber(token.liquidity)}</Text>
                                <Text className={'text-md text-white'}>V:{formatNumber(token.v24hUSD)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    )

  return (
    <View className={'flex flex-1 flex-col items-center justify-center'}>
        {renderSearchFiled()}
        {filteredTokeList.length ? renderList() : renderEmptyState()}
    </View>
  );
}
