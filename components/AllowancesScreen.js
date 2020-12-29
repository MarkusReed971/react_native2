import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TabBar from "./TabBar";
import {withContext} from "./Context";
import Allowance from "./Allowance";

const AllowanceList = allowanceList => allowanceList.map(allow => <Allowance key={allow.sro} allowance={allow} />)

const AllowancesScreen = ({navigation, context}) => {
    const {allowanceList} = context

    return (
        <View>
            <TabBar navigation={navigation} />
            <ScrollView style={styles.scrollView}>
                {allowanceList ? AllowanceList(allowanceList) : <Text style={{textAlign: 'center'}}>Нет данных</Text>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 50,
    },
})

export default withContext(AllowancesScreen);
