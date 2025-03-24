import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import {IPtItem} from "@/utils/types";
import {unixTimeToMonthYear} from "@/utils/utils";

interface IProps {
    ptData: IPtItem[];
}

const BullPenCoinChart = ({ptData}:IProps) => {
    const paddingForRemoval= 80
    const screenWidth = Dimensions.get('window').width-paddingForRemoval;
    const chartDataWidth = 116 // for 3 months
    const spacing = (screenWidth+paddingForRemoval) / chartDataWidth;

    const maxValue = Math.round(Math.max(...ptData.map(o => o.value))) * 1.5;

    return (
        <View style={{ width: screenWidth, backgroundColor: 'transparent', overflow:'hidden' }}>
            <LineChart
                areaChart
                data={ptData}
                rotateLabel
                width={screenWidth}
                hideDataPoints
                color="#00ff83"
                thickness={3}
                startFillColor="rgba(20,105,81,0.3)"
                endFillColor="rgba(20,85,81,0.01)"
                startOpacity={0.9}
                endOpacity={0.2}
                spacing={spacing}
                initialSpacing={0}
                endSpacing={0}
                noOfSections={6}
                maxValue={maxValue}
                yAxisColor="gray"
                yAxisThickness={1}
                yAxisTextStyle={{ color: 'white' }}
                xAxisColor="gray"
                xAxisThickness={1}
                xAxisLabelTextStyle={{ color: 'white' }}
                rulesType="solid"
                rulesColor="gray"
                pointerConfig={{
                    pointerStripHeight: 200,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 0.5,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 120,
                    pointerLabelHeight: 80,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: true,
                    pointerLabelComponent: items => {
                        const isLastItem = items[0].unixTime === ptData[ptData.length - 1].unixTime;
                        return (
                            <View
                                style={{
                                    height: 80,
                                    width: 120,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#05121a',
                                    opacity: 0.9,
                                    borderRadius: 10,
                                    padding: 5,
                                    marginLeft: isLastItem ? -80 : 0,
                                }}>
                                {/* Date */}
                                <Text style={{ color: 'white', fontSize: 12, marginBottom: 6, textAlign: 'center' }}>
                                    {unixTimeToMonthYear(items[0].unixTime)}
                                </Text>

                                {/* Value */}
                                <View
                                    style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 6,
                                        borderRadius: 8,
                                        backgroundColor: '#00ff83',
                                    }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
                                        {'$' + items[0].value.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        );
                    },
                }}
            />
        </View>
    );
};

export default BullPenCoinChart;