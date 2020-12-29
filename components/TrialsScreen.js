import React from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import TabBar from "./TabBar";
import {withContext} from "./Context";
import Trial from "./Trial";

const TrialList = trialList => trialList.map(trial => <Trial key={trial.name_delo} trial={trial} />)

const TrialsScreen = ({navigation, context}) => {
    const {trialList} = context

    return (
        <View>
            <TabBar navigation={navigation} />
            <ScrollView style={styles.scrollView}>
                {trialList ? TrialList(trialList) : <Text style={{textAlign: 'center'}}>Нет данных</Text>}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 50,
    },
})

export default withContext(TrialsScreen);
