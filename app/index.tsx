import {Pressable, ScrollView, Text, View} from "react-native";
import {Input, InputField, InputIcon, InputSlot} from "@/components/ui/input"
import {CloseIcon, Icon, SearchIcon} from "@/components/ui/icon";
import {useEffect, useState} from "react";
import {getTokenListService} from "@/services/services";
import {ITokenListItem} from "@/utils/types";
import {BullPenTokenCard} from "@/components/ui/bullpenTokenCard";
import {BullpenTokenListDefaultEmptyState} from "@/components/ui/bullpenTokenListDefaultEmptyState";


export default function Index() {
    const [tokenList, setTokenList] = useState([]);
    const [filteredTokenList, setFilteredTokenList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchInProgress, setSearchInProgress] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
        const {data} = await getTokenListService()
            console.log("Fetching data", data)
            if (!data) {
                return
            }
            setTokenList(data.tokens);
            setFilteredTokenList([])
        }
        fetchData()
    }, []);


    useEffect(() => {
        const filteredList = tokenList.filter((token:ITokenListItem)=>(token.address.includes(searchText)));
        const isSearchInProgress = searchText.length > 0;

        if (!isSearchInProgress) {
            setFilteredTokenList([]);
            setSearchInProgress(false);
            return
        }
        if (filteredList.length === 0 && searchText.length !== 0) {
            setSearchInProgress(true);
        }
        setFilteredTokenList(filteredList);
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

    const renderList = () => (
        <ScrollView className={'overflow-hidden'}>
            {filteredTokenList.length === 0
                ? <BullpenTokenListDefaultEmptyState searchInProgress={false}/>
                : filteredTokenList.map((token: ITokenListItem) => (<BullPenTokenCard key={token.address} token={token}/>))
            }
        </ScrollView>
    )

    const renderListWrapper = () => (
        <View className={'flex flex-col flex-1 justify-center items-center'}>
            {searchInProgress
                ? <BullpenTokenListDefaultEmptyState searchInProgress={searchInProgress}/>
                : renderList()
            }
        </View>
    )


  return (
    <View className={'flex flex-1 flex-col items-center justify-center'}>
        {renderSearchField()}
        {renderListWrapper()}
    </View>
  );
}
