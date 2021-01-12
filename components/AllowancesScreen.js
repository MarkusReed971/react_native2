import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TabBar from "./TabBar";
import {withContext} from "./Context";
import Allowance from "./Allowance";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

const AllowanceList = allowanceList => allowanceList.map(allow => <Allowance key={allow.sro} allowance={allow} />)

const AllowancesScreen = ({navigation, context}) => {
    const {allowanceList} = context

    return (
        <View style={styles.container}>
            <TabBar navigation={navigation} />
            <ScrollView style={styles.scrollView}>
                {allowanceList ? AllowanceList(allowanceList) : <Text style={{textAlign: 'center'}}>Нет данных</Text>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: Colors.light,
    },
    scrollView: {
        marginBottom: 60,
        minHeight: 660,
    },
})

export default withContext(AllowancesScreen);
