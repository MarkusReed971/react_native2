import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TabBar from "./TabBar";
import {withContext} from "./Context";
import Info from "./Info";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";


const LicensesScreen = ({navigation, context}) => {
    const licenseList = context.company.licenses_list;
    const LicenseList = licenseList => licenseList.map(license =>
        <View key={license.number} style={styles.card}>
            <Info attribute={'Деятельность'} value={license.activities[0]}/>
            <Info attribute={'Выпускающий орган'} value={license.issue_authority}/>
            <Info attribute={'Дата'} value={license.issue_date}/>
            <Info attribute={'Номер'} value={license.number}/>
        </View>)

    return (
        <View>
            <TabBar navigation={navigation} />
            <ScrollView style={styles.scrollView}>
                { licenseList[0] ? LicenseList(licenseList) : <Text style={{textAlign: 'center'}}>Информация отсутствует</Text>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: Colors.white,
        padding: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    scrollView: {
        marginBottom: 50,
    },
})

export default withContext(LicensesScreen);
