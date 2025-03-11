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
            console.log("Fetching data", data)
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
        <ScrollView className={'overflow-hidden'}>
            {filteredTokeList.length && filteredTokeList.map((token: ITokenListItem) => (
                <View key={token.address} className={'flex flex-row w-full rounded-xl h-20 bg-primaryCardBackground mt-4 items-center p-4'}>
                    <View className={'flex w-[15%]'}>
                        <Avatar size="md">
                            <AvatarFallbackText>{token.symbol}</AvatarFallbackText>
                            <AvatarImage
                                source={{
                                    uri: token.logoURI,
                                }}
                            />
                        </Avatar>
                    </View>
                    <View className={'flex w-[63%]'}>
                        <View className={'flex flex-col overflow-hidden'}>
                            <View className={'flex flex-row items-center overflow-hidden'}>
                                <Text className={'text-xl text-white font-bold'}>{token.symbol}</Text>
                                <Text className={'pl-2 text-sm text-gray-50 truncate'}>{token.name}</Text>
                            </View>
                            <ScrollView horizontal={true} className={'flex flex-row'}>
                                <Text className={'text-xs text-white border border-secondaryBorder rounded-md p-2 m-1'}>P:{Number(token.price).toFixed(2)}$</Text>
                                <Text className={'text-xs text-white border border-secondaryBorder rounded-md p-2 m-1'}>L:{formatNumber(token.liquidity)}</Text>
                                <Text className={'text-xs text-white border border-secondaryBorder rounded-md p-2 m-1'}>V:{formatNumber(token.v24hUSD)}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    <View className={'flex w-[22%] pl-2 items-end'}>
                        <Text className={'text-lg text-white font-bold'}>${formatNumber(token.v24hUSD)}</Text>

                        {token?.v24hChangePercent &&
                            <Text className={`flex flex-row text-xs text-gray-50`}>
                            24h <Text className={`ml-2 ${token.v24hChangePercent > 0 ? 'text-primaryGreen' : 'text-red-600'}`}>{token?.v24hChangePercent?.toFixed(1)}%</Text>
                        </Text>}
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
