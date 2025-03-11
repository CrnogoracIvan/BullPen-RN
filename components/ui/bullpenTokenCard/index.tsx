import {ScrollView, Text, View} from "react-native";
import {Avatar, AvatarFallbackText, AvatarImage} from "@/components/ui/avatar";
import {formatNumber} from "@/utils/utils";
import {ITokenListItem} from "@/utils/types";

interface IProps {
    token: ITokenListItem
}

export function BullPenTokenCard ({token}: IProps): JSX.Element {

    const renderCardLeftSide = () => (
        <Avatar size="md">
            <AvatarFallbackText>{token.symbol}</AvatarFallbackText>
            <AvatarImage
                source={{
                    uri: token.logoURI,
                }}
            />
        </Avatar>
    )

    const renderCardMiddleSide = () => (
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
    )

    const renderCardRightSide = () => (
        <>
            <Text className={'text-lg text-white font-bold'}>${formatNumber(token.v24hUSD)}</Text>

            {token?.v24hChangePercent &&
                <Text className={`flex flex-row text-xs text-gray-400`}>
                    24h <Text className={`ml-2 ${token.v24hChangePercent > 0 ? 'text-primaryGreen' : 'text-red-600'}`}>{token?.v24hChangePercent?.toFixed(1)}%</Text>
                </Text>}
        </>
    )

    return (
        <View className={'flex flex-row w-full rounded-xl h-20 bg-primaryCardBackground mt-4 items-center p-4'}>
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
    )
}