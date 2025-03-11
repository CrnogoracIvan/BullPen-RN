import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const CoinChart = () => {
    const ptData = [
        { value: 168.43, date: '2023-07-01' },
        { value: 237.67, date: '2023-07-15' },
        { value: 188.87, date: '2023-08-01' },
        { value: 231.64, date: '2023-08-15' },
        { value: 148.12, date: '2023-09-01' },
    ];

    return (
        <View
            style={{
                width: '100%',
                backgroundColor: 'transparent',
            }}>
            <LineChart
                areaChart
                data={ptData}
                rotateLabel
                width={300}
                hideDataPoints
                color="#00ff83"
                thickness={3}
                startFillColor="rgba(20,105,81,0.3)"
                endFillColor="rgba(20,85,81,0.01)"
                startOpacity={0.9}
                endOpacity={0.2}
                spacing={70}
                noOfSections={6}
                maxValue={300}
                yAxisColor="white"
                yAxisThickness={0}
                rulesType="solid"
                rulesColor="gray"
                yAxisTextStyle={{ color: 'gray' }}
                yAxisSide="right"
                xAxisColor="lightgray"
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: items => {
                        return (
                            <View
                                style={{
                                    height: 90,
                                    width: 100,
                                    justifyContent: 'center',
                                    // marginTop: -10,
                                    // marginLeft: -50,
                                }}>
                                <Text style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}>
                                    {items[0].date}
                                </Text>

                                <View style={{ paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: 'white' }}>
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                        {'$' + items[0].value + '.0'}
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

export default CoinChart;
