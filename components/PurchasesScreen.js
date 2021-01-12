import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TabBar from "./TabBar";
import {withContext} from "./Context";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
import Purchase from "./Purchase";


const PurchaseList = purchaseList => purchaseList.map(pur => <Purchase key={pur.inn_zakazchik + pur.data_start_contract} purchase={pur} />)

const PurchasesScreen = ({navigation, context}) => {
    const {purchaseList223, purchaseList44_94} = context;

    return (
        <View style={styles.container}>
            <TabBar navigation={navigation} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.card}>
                    <Text style={styles.h1}>Закон №223</Text>
                    {purchaseList223 ? PurchaseList(purchaseList223) : <Text style={{textAlign: 'center'}}>Нет данных</Text>}
                </View>
                <View style={styles.card}>
                    <Text style={styles.h1}>Закон №44_94</Text>
                    {purchaseList44_94 ? PurchaseList(purchaseList44_94) : <Text style={{textAlign: 'center'}}>Нет данных</Text>}
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: Colors.light,
    },
    card: {
        backgroundColor: Colors.lighter,
        padding: 20,
        margin: 10,
        marginBottom: 0,
        borderWidth: 1,
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    scrollView: {
        marginBottom: 60,
        minHeight: 660,
    },
})


export default withContext(PurchasesScreen);
