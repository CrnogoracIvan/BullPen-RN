import {View} from "react-native";
import {Skeleton, SkeletonText} from "@/components/ui/skeleton";

export function BullPenSkeleton() {
    return (
        <View className={'flex flex-row w-full rounded-xl h-20 bg-primaryCardBackground mt-4 items-center p-4'}>
            <View className={'flex w-[15%]'}>
                <Skeleton variant="circular" speed={4} className="h-[24px] w-[24px] mr-2 bg-gray-600" />
            </View>
            <View className={'flex w-[63%] gap-2'}>
                <SkeletonText speed={4}  className="h-3 bg-gray-600" />
                <SkeletonText speed={4} className="h-3 w-1/2  bg-gray-600" />
            </View>
            <View className={'flex w-[22%] pl-2 items-end'}>
                <Skeleton variant="sharp" speed={4} className="h-[24px] w-[24px]  bg-gray-600" />
            </View>
        </View>
    )
}