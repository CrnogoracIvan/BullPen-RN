import React, {useEffect, useState} from 'react';
import { ScrollView, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { formatNumber } from "@/utils/utils";
import { ITokenListItemDTO } from "@/utils/types";
import BullPenCoinChart from "@/components/ui/bulletpenCoinChart";
import {getTokenHistoryPriceService} from "@/services/services";
import {BullPenErrorToast} from "@/components/ui/bullPenErrorToast";

interface IProps {
    token: ITokenListItemDTO;
}

export function BullPenTokenCard({ token }: IProps): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(false);
    const [tokenHistory, setTokenHistory] = useState([])
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);
    const { showToast } = BullPenErrorToast({title: "Error", message: errorMessage});

    const fromHeightValue = 96
    const toHeightValue = 380
    const animationDuration = 100

    const heightAnimation = useState(new Animated.Value(fromHeightValue))[0]; // Starting height is 80, you can adjust

    const fetchData = async () => {
        try {
            const {items} = await getTokenHistoryPriceService(token.address);
            setTokenHistory(items);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    useEffect(() => {
        if (errorMessage){
            showToast()
        }
    }, [errorMessage]);

    useEffect(() => {
        if (isExpanded) {
            fetchData()
        }
    }, [isExpanded]);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
        Animated.timing(heightAnimation, {
            toValue: isExpanded ? fromHeightValue : toHeightValue,
            duration: animationDuration,
            useNativeDriver: false,
        }).start();
    };

    const renderCardLeftSide = () => (
        <Avatar size="md">
            <AvatarFallbackText>{token.symbol}</AvatarFallbackText>
            <AvatarImage
                source={{
                    uri: token.logoURI,
                }}
            />
        </Avatar>
    );

    const renderCardMiddleSide = () => (
        <View className={'flex flex-col overflow-hidden'}>
            <View className={'flex flex-row items-center overflow-hidden'}>
                <Text className={'text-xl text-white font-bold'}>{token.symbol}</Text>
                <Text className={'pl-2 text-sm text-gray-50 truncate'}>{token.name}</Text>
            </View>
            <ScrollView horizontal={true} className={'flex flex-row'}>
                <Text className={'text-xs text-white border border-secondaryBorder rounded-md p-2 m-1'}>
                    P:{Number(token.price).toFixed(2)}$
                </Text>
                <Text className={'text-xs text-white border border-secondaryBorder rounded-md p-2 m-1'}>
                    L:{formatNumber(token.liquidity)}
                </Text>
                <Text className={'text-xs text-white border border-secondaryBorder rounded-md p-2 m-1'}>
                    V:{formatNumber(token.v24hUSD)}
                </Text>
            </ScrollView>
        </View>
    );

    const renderCardRightSide = () => (
        <>
            <Text className={'text-lg text-white font-bold'}>${formatNumber(token.v24hUSD)}</Text>
            {token?.v24hChangePercent && (
                <Text className={`flex flex-row text-xs text-gray-400`}>
                    24h
                    <Text className={`ml-2 ${token.v24hChangePercent > 0 ? 'text-primaryGreen' : 'text-red-600'}`}>
                        {token?.v24hChangePercent?.toFixed(1)}%
                    </Text>
                </Text>
            )}
        </>
    );

    const renderChartWrapper = () => (
        <View className={'flex flex-1 flex-col overflow-hidden justify-center'}>
            <Text className={'text-lg text-white font-bold mt-4 mb-2'}>Price History:</Text>
            <BullPenCoinChart ptData={tokenHistory}/>
        </View>
    )

    return (
        <TouchableOpacity onPress={toggleExpansion}>
            <Animated.View
                style={[
                    { flexDirection: 'column', width: '100%', borderRadius: 16, backgroundColor: '#0b1e2c', marginTop: 16, padding: 16 },
                    { height: heightAnimation },
                ]}
            >
                <View className={'flex flex-row items-center overflow-hidden'}>
                    <View className={'flex w-[15%]'}>
                        {renderCardLeftSide()}
                    </View>
                    <View className={'flex w-[63%]'}>
                        {renderCardMiddleSide()}
                    </View>
                    <View className={'flex w-[22%] pl-2 items-end'}>
                        {renderCardRightSide()}
                    </View>
                </View>
                {isExpanded && tokenHistory &&  renderChartWrapper()}
            </Animated.View>
        </TouchableOpacity>
    );
}
