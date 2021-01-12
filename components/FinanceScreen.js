import React, {useState} from 'react';
import {Dimensions, Picker, ScrollView, StyleSheet, Text, View} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import TabBar from "./TabBar";
import {Grid, XAxis, YAxis, BarChart} from "react-native-svg-charts";
import {withContext} from "./Context";
import Info from "./Info";


const FinanceScreen = ({navigation, context}) => {
    const finance = context.company.basic_information.finance
    const years = finance.map(({year}) => parseInt(year))
    const dohod = finance.map(({dohod}) => dohod)
    const rashod = finance.map(({rashod}) => rashod)

    const [dataIndex, setDataIndex] = useState(years.length-1);

    const barData = [
        {
            data: dohod,
            svg: {
                fill: 'rgb(34, 65, 244)',
            },
        },
        {
            data: rashod,
        }
    ]

    const dohodFormat = dohod => dohod/1000000000 >= 1 ? dohod/1000000000 + ' млрд' : dohod/1000000 + ' млн'

    const formatSelect = years => years.map((item, index) => <Picker.Item key={index} label={item + ' г.'} value={index} />).reverse()

    return (
        <View style={styles.container}>
            <TabBar navigation={navigation} />
            <ScrollView style={{minHeight: 1000}}>
                {finance[0] ? (
                    <View>

                        <View style={{ height: 300, padding: 20, backgroundColor: Colors.white, borderWidth: 1, margin: 10 }}>
                            <View style={styles.labelBox}>
                                <View style={styles.colorOuter}>
                                    <View style={styles.color1}></View>
                                    <Text>{'  -  доходы'}</Text>
                                </View>
                                <View style={styles.colorOuter}>
                                    <View style={styles.color2}></View>
                                    <Text>{'  -  расходы'}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <YAxis
                                    style={{width: 40}}
                                    data={ dohod.concat(rashod) }
                                    contentInset={{ top: 10, bottom: 10 }}
                                    svg={{
                                        fill: 'grey',
                                        fontSize: 10,
                                    }}
                                    numberOfTicks={5}
                                    formatLabel={(value) => dohodFormat(value)}
                                />
                                <View style={{width: Dimensions.get('window').width - 90}}>
                                    <BarChart
                                        style={{ height: 200 }}
                                        data={ barData }
                                        svg={{ fill: 'rgb(255, 135, 94)' }}
                                        contentInset={{ top: 10, bottom: 10 }}
                                    >
                                        <Grid />
                                    </BarChart>
                                </View>
                            </View>
                            <XAxis
                                style={{ height: 10, marginTop: 10}}
                                data={years}
                                xAccessor={ ({ item }) => item }
                                formatLabel={(value) => value + 'г.'}
                                contentInset={{ left: 60, right: 15 }}
                                svg={{ fontSize: 10, fill: 'grey' }}
                            />
                        </View>

                        <View style={styles.card}>
                            <View style={styles.pickerBox}>
                                <Picker
                                    selectedValue={dataIndex}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setDataIndex(itemValue)}
                                >
                                    {formatSelect(years)}
                                </Picker>
                            </View>
                            <Info attribute={'Доход'} value={ dohod[dataIndex] + ' руб.'} />
                            <Info attribute={'Расход'} value={ rashod[dataIndex] + ' руб.'} />
                        </View>

                    </View>
                ) : <Text style={{textAlign: 'center'}}>Нет данных</Text>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: Colors.light,
        paddingBottom: 200,
    },
    card: {
        backgroundColor: Colors.white,
        padding: 20,
        margin: 10,
        marginBottom: 0,
        borderWidth: 1,
    },
    picker: {
        width: Dimensions.get('window').width -60,
        height: 40,
    },
    pickerBox: {
        backgroundColor: Colors.light,
        borderRadius: 5,
        marginBottom: 10,
    },
    // card: {
    //     marginHorizontal: 10,
    //     backgroundColor: Colors.white,
    //     borderRadius: 5,
    //     padding: 10,
    // },
    color1: {
        width: 20,
        height: 15,
        borderRadius: 2,
        backgroundColor: 'rgb(34, 65, 244)',
        marginTop: 3,
    },
    color2: {
        width: 20,
        height: 15,
        borderRadius: 2,
        backgroundColor: 'rgb(255, 135, 94)',
        marginTop: 3,
    },
    colorOuter: {
        flexDirection: 'row',
    },
    labelBox: {
        marginBottom: -5,
    }
})

export default withContext(FinanceScreen);
