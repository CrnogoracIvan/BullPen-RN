import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const CoinChart = () => {
    const ptData = [
        { value: 168.43, date: '2023-07-01' },
        { value: 237.67, date: '2023-07-15' },
        { value: 188.87, date: '2023-08-01' },
        { value: 231.64, date: '2023-08-15' },
        { value: 148.12, date: '2023-09-01' },
    ];

    const paddingForRemoval= 85
    const screenWidth = Dimensions.get('window').width-paddingForRemoval;
    const spacing = (screenWidth+paddingForRemoval) / (ptData.length);

    return (
        <View style={{ width: '100%', backgroundColor: 'transparent' }}>
            <LineChart
                areaChart
                data={ptData}
                rotateLabel
                width={screenWidth} // Use screen width
                hideDataPoints
                color="#00ff83"
                thickness={3}
                startFillColor="rgba(20,105,81,0.3)"
                endFillColor="rgba(20,85,81,0.01)"
                startOpacity={0.9}
                endOpacity={0.2}
                spacing={spacing} // Use calculated spacing
                initialSpacing={0} // No extra space at the start
                endSpacing={0} // No extra space at the end
                noOfSections={6}
                maxValue={300}
                yAxisColor="black" // Show y-axis
                yAxisThickness={1} // Show y-axis
                yAxisTextStyle={{ color: 'white' }} // Show y-axis labels
                xAxisColor="black" // Show x-axis
                xAxisThickness={1} // Show x-axis
                xAxisLabelTextStyle={{ color: 'white' }} // Show x-axis labels
                rulesType="solid"
                rulesColor="gray"
                pointerConfig={{
                    pointerStripHeight: 160,
                    pointerStripColor: 'lightgray',
                    pointerStripWidth: 2,
                    pointerColor: 'lightgray',
                    radius: 6,
                    pointerLabelWidth: 120,
                    pointerLabelHeight: 100,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: true,
                    pointerLabelComponent: items => {
                        // Check if this is the last data point
                        const isLastItem = items[0].date === ptData[ptData.length - 1].date;

                        return (
                            <View
                                style={{
                                    height: 100,
                                    width: 120,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                    borderRadius: 10,
                                    padding: 10,
                                    marginLeft: isLastItem ? -80 : 0, // Shift tooltip left for the last item
                                }}>
                                {/* Date */}
                                <Text style={{ color: 'white', fontSize: 12, marginBottom: 6, textAlign: 'center' }}>
                                    {items[0].date}
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

export default CoinChart;