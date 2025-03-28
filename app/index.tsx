import {RefreshControl, ScrollView, View} from "react-native";
import {useEffect, useState} from "react";
import {getTokenListService} from "@/services/services";
import {ITokenListItemDTO} from "@/utils/types";
import {BullPenTokenCard} from "@/components/ui/bullpenTokenCard";
import {BullPenTokenListEmptyState} from "@/components/ui/bullpenTokenListEmptyState";
import {BullPenSearchField} from "@/components/ui/bullpenSearchField";
import {BullPenSkeleton} from "@/components/ui/bullpenSkeleton";
import {BullPenErrorToast} from "@/components/ui/bullpenErrorToast";


export default function Index() {
    const [isLoading, setIsLoading] = useState(false);
    const [tokenList, setTokenList] = useState([]);
    const [filteredTokenList, setFilteredTokenList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchInProgress, setSearchInProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);

    const { showToast } = BullPenErrorToast({title: "Error", message: errorMessage});

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const {data} = await getTokenListService()
            if (!data) {
                setIsLoading(false);
                return
            }
            setTokenList(data.tokens);
            setFilteredTokenList([])
            setIsLoading(false);

        } catch (e) {
            // @ts-ignore
            setErrorMessage(e.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    useEffect(() => {
        if (errorMessage){
            showToast()
        }
    }, [errorMessage]);

    useEffect(() => {
        const filteredList = tokenList.filter((token:ITokenListItemDTO)=>(token.address.includes(searchText)));
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

    const renderRefreshControl = () => (
        <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchData}
            tintColor="#5efeb3"
            title="Refreshing..."
            titleColor="#5efeb3"
        />
    )

    const renderList = () => {
        if ( filteredTokenList.length === 0) {
            return (
                <View
                className={'flex flex-col flex-1 justify-center items-center'}>
                    <BullPenTokenListEmptyState searchInProgress={false}/>
                </View>
                )
        }

        return (
            <ScrollView
                className={'overflow-hidden'}
                refreshControl={renderRefreshControl()}
            >
                {
                     filteredTokenList.map((token: ITokenListItemDTO) => (
                        <BullPenTokenCard key={token.address} token={token}/>))
                }
            </ScrollView>
        )
    }

    const renderListWrapper = () => (
        <View className={'flex flex-col flex-1 justify-center items-center'}>
            {searchInProgress
                ? <BullPenTokenListEmptyState searchInProgress={searchInProgress}/>
                : renderList()
            }
        </View>
    )

  return (
    <View className={'flex flex-1 flex-col items-center justify-start'}>
        <BullPenSearchField searchText={searchText} onChangeText={setSearchText} />
        {isLoading ? <BullPenSkeleton/> : renderListWrapper()}
    </View>
  );
}
